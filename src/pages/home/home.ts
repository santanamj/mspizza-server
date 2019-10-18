import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,  AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AuthProvider } from '../../providers/auth/auth';
import { DashboardPage } from '../dashboard/dashboard';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  username;

  tab2Root = AboutPage;
  tab3Root = ContactPage;
  myIndex;
  tokenFcm;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public view: ViewController,
    public alertCtrl: AlertController,
    private authProvider: AuthProvider
  ) {
    this.myIndex = navParams.data.tabIndex || 0;
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
