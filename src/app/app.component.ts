import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MenuController } from 'ionic-angular';
import { TabsPage } from '../pages/tabs/tabs';
import { CategoryPage } from '../pages/category/category';
import { ProductPage } from '../pages/product/product';
import { ProductListPage } from '../pages/product/product-list';
import { OrderPage } from '../pages/order/order';
import { RegisterPage } from '../pages/register/register';
import { LoginPage } from '../pages/login/login';
import { AuthProvider } from '../providers/auth/auth';
import { HomePage } from '../pages/home/home';
import { ShoppingCartProvider } from '../providers/shopping-cart/shopping-cart';
import * as io from 'socket.io-client';
import { Subscription } from 'rxjs/Subscription';
import { environment } from '../environments/environments';
import { NotificationPage } from '../pages/notification/notification';
import { FCM } from '@ionic-native/fcm';
import { CheckoutPage } from "../pages/checkout/checkout";
import { AtendimentoPage } from '../pages/atendimento/atendimento';
@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  @ViewChild(Nav) nav:Nav;
  rootPage: any = TabsPage;
  pages: Array<{title: string, component: any}>;
  username;

  pedidos : string[] = [];
  pedido: string;
  private socket;
  sub: Subscription;
  Counter = 0;
  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public menuCtrl: MenuController,
    private fcm: FCM,
    private authProvider: AuthProvider,
    private shopService: ShoppingCartProvider
    ) {
    this.pages = [

      {title: 'HomePage', component:HomePage },
      {title: 'Fazer Pedido', component:ProductListPage},
      {title: 'Cozinha', component:OrderPage },
      // {title: 'Checkout', component: CheckoutPage},
      { title: 'Atendimento', component: AtendimentoPage }


      ];
    platform.ready().then(() => {
      // this.fcm.subscribeToTopic('all');
      // this.fcm.getToken().then(token=>{
      //     console.log(token);
      // })
      // this.fcm.onNotification().subscribe(data=>{
      //   if(data.wasTapped){
      //     console.log("Received in background");
      //   } else {
      //     console.log("Received in foreground");
      //   };
      // })
      // this.fcm.onTokenRefresh().subscribe(token=>{
      //   console.log(token);
      // });
      statusBar.styleDefault();
      splashScreen.hide();
    });

  }
  contador(){
    this.Counter++
  }
  countPush() {
    this.Counter = 0;
  }
  openPage(page) {
    this.nav.push(page.component);
  }
  openLogin() {
    this.nav.push(LoginPage);
  }
  onLogoutClick() {
    this.authProvider.logout(); // Logout user
    this.nav.setRoot(LoginPage);
  }
  ionViewDidLoad() {

    this.authProvider.getProfile().subscribe(profile => {
      this.username = profile.user.username; // Used when creating new book posts and comments

    });


  }

}
