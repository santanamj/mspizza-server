import { Component, ViewChild } from '@angular/core';
import { IonicPage, App, NavController, NavParams, ViewController,  AlertController, Nav } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AuthProvider } from '../../providers/auth/auth';
import { DashboardPage } from '../dashboard/dashboard';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { TabsPage } from '../tabs/tabs';
import { ProductListPage } from '../product/product-list';
import { OrderPage } from '../order/order';
import { AtendimentoPage } from '../atendimento/atendimento';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Nav) nav:Nav;
  contents: Array<{title: string, img: string, component: any}>;
  username;
  tab1Root = DashboardPage
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  myIndex;
  tokenFcm;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public view: ViewController,
    public alertCtrl: AlertController,
    private authProvider: AuthProvider,
    public appCtrl: App
  ) {
    this.contents = [
      {
        title: 'Fazer pedido',
        img: "http://localhost:8100/assets/imgs/pedido.png",
        component:ProductListPage
      },
      {
        title: 'Cozinha',
        img: "http://localhost:8100/assets/imgs/cozinha.png",
        component:OrderPage
      },
      {
        title: 'Atendimento',
        img: "http://localhost:8100/assets/imgs/atendimento.png",
        component: AtendimentoPage
      }
    ]
   
  }
  openPage(content) {

    this.appCtrl.getRootNav().push(content.component);
  }
  ionViewDidLoad() {

    if (this.authProvider.loggedIn()) {

      return true; // Return true: User is allowed to view route

    } else {

      this.navCtrl.setRoot(LoginPage);    // LoginPage is my rootPage/default
      return false; // Return false: user not authorized to view page
    }
  }
}
