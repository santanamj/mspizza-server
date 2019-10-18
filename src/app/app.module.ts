import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { IonicApp, IonicModule, IonicErrorHandler, DeepLinkConfig } from 'ionic-angular';
import {IonicStorageModule} from '@ionic/storage';
import {  HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { CommonModule } from '@angular/common';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CategoryProvider } from '../providers/category/category';
import { ProductProvider } from '../providers/product/product';
import { CategoryPage } from '../pages/category/category';
import { ProductPage } from '../pages/product/product';
import { UploadProductComponent } from '../components/upload-product/upload-product';

import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { ProductListPage } from '../pages/product/product-list';
import { ShoppingCartProvider } from '../providers/shopping-cart/shopping-cart';
import { StorageProvider } from '../providers/storage/storage';
import { CacheProvider } from '../providers/cache/cache';

import { CheckoutPage } from '../pages/checkout/checkout';
import { ProductCartPage } from '../pages/product-cart/product-cart';
import { OrderProvider } from '../providers/order/order';
import { OrderPage } from '../pages/order/order';
import { OrderDetailPage } from '../pages/order/order-detail/order-detail';
import { AuthProvider } from '../providers/auth/auth';
import { RegisterPage } from '../pages/register/register';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { LoginPage } from '../pages/login/login';
import { AuthenticationProvider } from './guards/auth.guard';
import { FCM } from '@ionic-native/fcm';
import { NotificationPage } from '../pages/notification/notification';
import { AtendimentoPage } from '../pages/atendimento/atendimento';
import { AtendimentoDetailPage } from '../pages/atendimento/atendimento-detail/atendimento-detail';
import { MesaProvider } from '../providers/mesa/mesa';
import { MesaPage } from '../pages/mesa/mesa';
import { ShoppingCartPage } from '../pages/shopping-cart/shopping-cart';
import { ProductDetailPage } from '../pages/product/product-detail/product-detail';
import { SubproductProvider } from '../providers/subproduct/subproduct';
import { SubproductPage } from '../pages/subproduct/subproduct';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    CategoryPage,
    ProductPage,
    UploadProductComponent,
    ProductListPage,
    CheckoutPage,
    ProductCartPage,
    OrderPage,
    OrderDetailPage,
    RegisterPage,
    DashboardPage,
    LoginPage,
    NotificationPage,
    AtendimentoPage,
    AtendimentoDetailPage,
    MesaPage,
    ShoppingCartPage,
    ProductDetailPage,
    SubproductPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,

    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    CategoryPage,
    ProductPage,
    UploadProductComponent,
    ProductListPage,
    CheckoutPage,
    ProductCartPage,
    OrderPage,
    OrderDetailPage,
    RegisterPage,
    DashboardPage,
    LoginPage,
    NotificationPage,
    AtendimentoPage,
    AtendimentoDetailPage,
    ProductDetailPage,
    SubproductPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CategoryProvider,
    ProductProvider,
    ShoppingCartProvider,
    StorageProvider,
    CacheProvider,
    OrderProvider,
    AuthProvider,
    AuthenticationProvider,
    FCM,
    MesaProvider,
    SubproductProvider
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
})
export class AppModule {}
