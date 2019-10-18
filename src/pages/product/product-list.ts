import { Component, OnDestroy, OnInit, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { CategoryProvider } from '../../providers/category/category';
import { ProductProvider } from '../../providers/product/product';
import { Product } from '../../model/product';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UploadProductComponent } from '../../components/upload-product/upload-product';
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { ShoppingCart } from '../../model/shopping-cart';
import { ShoppingCartProvider } from '../../providers/shopping-cart/shopping-cart';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import { CheckoutPage } from "../checkout/checkout";
import { Subscription } from "rxjs/Subscription";
import { ProductDetailPage } from './product-detail/product-detail';


@Component({
  selector: 'page-product-list',
  templateUrl: 'product-list.html',
})
export class ProductListPage {
  public products: Observable<Product[]>;
  public cart: Observable<ShoppingCart>;
  public itemCount: number;
  private cartSubscription: Subscription;
  show:  1;
  username;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private productProvider: ProductProvider,
    private shoppingCartProvider: ShoppingCartProvider,
    private authProvider: AuthProvider,
    public viewCtrl: ViewController
    ){ }
    public emptyCart(): void {
    this.shoppingCartProvider.empty();
  }
  public checkout(){
    this.navCtrl.push(CheckoutPage);
  }
    public addProductToCart(product: Product): void {
      this.shoppingCartProvider.addItem(product, 1);
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
    cancel() {
      this.navCtrl.pop();
 }
  ionViewDidLoad() {

    this.products = this.productProvider.getProducts();
    if (this.authProvider.loggedIn()) {
      return true; // Return true: User is allowed to view route
    } else {

      this.navCtrl.setRoot(LoginPage);    // LoginPage is my rootPage/default
      return false; // Return false: user not authorized to view page
    }
  }
  public ngOnInit(): void {
  this.products = this.productProvider.getProducts();
  this.cart = this.shoppingCartProvider.get();
  this.cartSubscription = this.cart.subscribe((cart) => {
    this.itemCount = cart.items.map((x) => x.quantity).reduce((p, n) => p + n, 0);
  });
}
navigateProduct(id: string){
  this.productProvider.getProductId(id).subscribe((result:any)=>{
    this.navCtrl.push(ProductDetailPage, {product: result.product});
  })
}
public ngOnDestroy(): void {
  if (this.cartSubscription) {
    this.cartSubscription.unsubscribe();
  }
}

}
