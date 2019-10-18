import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { SubproductProvider } from '../../providers/subproduct/subproduct';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ProductProvider } from '../../providers/product/product';
import { Observable } from "rxjs/Observable";
import { Product } from '../../model/product';
import { tap } from 'rxjs/operators'; 
import { Subproduct } from '../../model/subproduct';

@IonicPage()
@Component({
  selector: 'page-subproduct',
  templateUrl: 'subproduct.html',
})
export class SubproductPage implements OnInit {
  subProducts;
  form;
  products: Product [] = [];
  message;
  mee:Subproduct[]=[];
  mydata=[];
  productsForm ;
  formControls=[];
  selectTitle;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public SubProduct: SubproductProvider,
    private productProvider: ProductProvider,
    public formbuilder: FormBuilder,
    private toast: ToastController,
    ) {
      this.SubproductCreate()
      this.SubProduct.getSubproducts().subscribe(data => {
        this.subProducts = data;       
           this.formControls.push(this.subProducts);
        });   
        this.formControls.map(control => new FormControl());
        this.productsForm = this.formbuilder.group({
          products: new FormArray(this.formControls)
        });   
  }
  SubproductCreate(){
    this.form = this.formbuilder.group({
      title: ['', Validators.required]
    })
  }
  select(){
    const selectedPreferences = this.productsForm.value.products
      .map((checked, index) => checked ? this.products[index].title : null)
      .filter(value => value !== null);      
    // Do something with the result
    console.log(selectedPreferences);
    this.selectTitle =
    this.productsForm.value.products
      .map((checked, index) => checked ? this.products[index].title : null)
      .filter(value => value !== null);
     console.log(this.selectTitle)
  }
  AddSubproduct(){
    const Subproduct = {
      title: this.form.get('title').value
    }
    this.SubProduct.addSubProduct(Subproduct).subscribe((data)=>{
      if(!data){
        console.error();
      }else{
        this.toast.create({ message: 'pedido criado com sucesso', duration: 3000 }).present();
        setTimeout(() => {
          this.message = false;
         }, 2000)
        this.form.reset();
      }
    })
  }

  ionViewDidLoad() {
     this.productProvider.getProducts().subscribe((data)=>{
       this.products = data;
     })
     
  }
  ngOnInit() {
     
}
  
}
