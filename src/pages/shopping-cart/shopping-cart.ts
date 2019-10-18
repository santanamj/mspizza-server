import { Component, ChangeDetectionStrategy, OnDestroy, OnInit } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { ProductProvider } from '../../providers/product/product';
import { ShoppingCartProvider } from '../../providers/shopping-cart/shopping-cart';
import { Product } from '../../model/product';
import { ShoppingCart } from '../../model/shopping-cart';
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import { CheckoutPage } from '../checkout/checkout';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'page-shopping-cart',
  templateUrl: 'shopping-cart.html',
})
export class ShoppingCartPage implements OnInit, OnDestroy {
  public products: Observable<Product[]>;
  public cart: Observable<ShoppingCart>;
  public itemCount: number;
  private cartSubscription: Subscription;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private productProvider: ProductProvider,
    private shoppingCartProvider: ShoppingCartProvider,
    private authProvider: AuthProvider
    ) { }
    public emptyCart(): void {
      this.shoppingCartProvider.empty();
    }
    ionViewDidLoad() {
      if (this.authProvider.loggedIn()) {
        return true; // Return true: User is allowed to view route
      } else {

        this.navCtrl.setRoot(LoginPage);    // LoginPage is my rootPage/default
        return false; // Return false: user not authorized to view page
      }
    }
    public checkout(){
      this.navCtrl.push(CheckoutPage);
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

}
