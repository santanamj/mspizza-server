import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { CommonModule } from '@angular/common';
import { IonicPageModule } from 'ionic-angular';
import { ProductPage } from './product';
import { ProductListPage } from './product-list';
import { UploadProductComponent } from '../../components/upload-product/upload-product';

import {  FileUploadModule } from 'ng2-file-upload';
import { ShoppingCartPage } from '../shopping-cart/shopping-cart';


@NgModule({
  declarations: [
    //ProductPage,
    //ProductListPage,
    //UploadProductComponent,
    //ShoppingCartPage
  ],
  imports: [
    IonicPageModule,
    CommonModule,
    FileUploadModule,
   IonicPageModule.forChild(ShoppingCartPage),

  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
})
export class ProductPageModule {}
