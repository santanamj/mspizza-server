import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductCartPage } from './product-cart';

@NgModule({
  declarations: [
    //ProductCartPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductCartPage),
  ],
})
export class ProductCartPageModule {}
