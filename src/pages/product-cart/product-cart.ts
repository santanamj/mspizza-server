import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductListPage } from '../product/product-list';


@IonicPage()
@Component({
  selector: 'page-product-cart',
  templateUrl: 'product-cart.html',
})
export class ProductCartPage {
  @Input() products;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductCartPage');
    this.products;
  }

}
