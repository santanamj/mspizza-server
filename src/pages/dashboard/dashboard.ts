import { Component } from '@angular/core';
import { IonicPage, NavController, Nav, NavParams } from 'ionic-angular';
import { AuthProvider } from './../../providers/auth/auth';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { CategoryPage } from '../category/category';
import { ProductListPage } from '../product/product-list';
import { OrderPage } from '../order/order';
import { RegisterPage } from '../register/register';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  username;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authProvider: AuthProvider,
    public nav: Nav
  ) {

  }
  openPage(page) {
    this.nav.setRoot(page.component);
  }
  ionViewDidLoad() {
    if (this.authProvider.loggedIn()) {
      this.authProvider.getProfile().subscribe(profile => {
        this.username = profile.user.username;

      });
      return true;

       // Return true: User is allowed to view route

    } else {

      this.navCtrl.setRoot(LoginPage);    // LoginPage is my rootPage/default
      return false; // Return false: user not authorized to view page
    }
  }

}
