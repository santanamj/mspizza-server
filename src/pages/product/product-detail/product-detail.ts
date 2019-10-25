import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray, ValidatorFn } from '@angular/forms';
import { Product } from '../../../model/product';
import { ShoppingCartProvider } from '../../../providers/shopping-cart/shopping-cart';
import { ProductProvider } from '../../../providers/product/product';
import { AuthProvider } from '../../../providers/auth/auth';
import { CheckoutPage } from '../../checkout/checkout';
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { ShoppingCart } from '../../../model/shopping-cart';
import { Subscription } from "rxjs/Subscription";
import {requireCheckboxesToBeCheckedValidator} from './require-checkboxes-to-be-checked.validator';
@IonicPage()
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage {
  public products: Observable<Product[]>;
  public cart: Observable<ShoppingCart>;
  public itemCount: number;
  private cartSubscription: Subscription;
  product;
  saboresChecked;
  message;
  form;
  status;
  productscar;
  selectTitle: any[];
  prodprice;
  Titlesabores;
  myquantity = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private productProvider: ProductProvider,
    private shoppingCartProvider: ShoppingCartProvider,
    private authProvider: AuthProvider,
    private formBuilder: FormBuilder,
    public viewCtrl: ViewController
  ) {
    this.countProd();
    this.product = this.navParams.data.product;
    this.form = this.formBuilder.group({
      files: [null, Validators.required],
      title: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(5)
      ])],
      description: ['', Validators.required],
      category: ['', Validators.required],
      sabores: new FormArray([]),
      price: ['', Validators.pattern('[[0-9]{1,4}\.[0-9]{2}$')]
    })
    this.productProvider.getProducts().subscribe(data=>{
      this.productscar = data;
      this.productscar.forEach(() => {
        const control = new FormControl(); // if first item set to true, else false
        (this.form.controls.sabores as FormArray).push(control);
      });
     
    })
    this.saboresChecked = [];
    
    }
    select(){
      // Select price of product
      const selectedPreferences = this.form.value.sabores
        .map((checked, index) => checked ? this.productscar[index].price : null)
        .filter(value => value !== null); 
         this.prodprice = selectedPreferences.reduce(function(anterior, atual){
          return anterior + atual;
        }, 0)
      
      console.log(this.prodprice);
       // Select title of product
      this.selectTitle =
      this.form.value.sabores
        .map((checked, index) => checked ? this.productscar[index].title : null)
        .filter(value => value !== null);
       console.log(this.selectTitle)
       this.Titlesabores = this.selectTitle.map((item, index, array)=>{
        return {'title': item}
       })
       console.log('teste', (this.selectTitle).length)
       if((this.selectTitle).length == 2){
        this.myquantity = true
      }else{
        this.myquantity = false
      }
      console.log(this.myquantity)
      }
      countProd(){
        
       
      }
  public emptyCart(): void {
    this.shoppingCartProvider.empty();
  }
  public checkout(){
    this.navCtrl.push(CheckoutPage);
  }
  
    public addProductToCart(): void { 
      const product ={
        title: 'Pizza de dois sabores',
        sabores: this.Titlesabores, 
        price:  this.prodprice
      } 
        
      this.shoppingCartProvider.addItem(product, 1);
      this.form.reset();
      (this.selectTitle).length == 0;
    }

    public removeProductFromCart(product: Product): void {
      
      this.shoppingCartProvider.addItem(product, -1);
    }

    public productInCart(product: Product): boolean {
      return Observable.create((obs: Observer<boolean>) => {
        const sub = this.shoppingCartProvider
                        .get()
                        .subscribe((cart) => {
                          obs.next(cart.items.some((i) => i.productId === product._id));
                          obs.complete();
                        });
        sub.unsubscribe();
      });
    }
    public ngOnInit(): void {
      this.products = this.productProvider.getProducts();
      this.cart = this.shoppingCartProvider.get();
      this.cartSubscription = this.cart.subscribe((cart) => {
        this.itemCount = cart.items.map((x) => x.quantity).reduce((p, n) => p + n, 0);
      });
    }
    public ngOnDestroy(): void {
      if (this.cartSubscription) {
        this.cartSubscription.unsubscribe();
      }
    }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailPage');
  }

}
