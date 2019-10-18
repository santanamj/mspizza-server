import { AuthProvider } from './../../providers/auth/auth';
import { HomePage } from './../../pages/home/home';
import { LoginPage } from './../../pages/login/login';
import {NavController, NavParams} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import { Injectable } from '@angular/core';



@Injectable()
export class AuthenticationProvider {

  private isLoggedIn = false;

    constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public authProvider: AuthProvider
    ) { }


     ionViewCanEnter(): boolean {
      // Check if user is logge din
      if (this.authProvider.loggedIn()) {
        return true; // Return true: User is allowed to view route
      } else {

        this.navCtrl.setRoot(LoginPage);    // LoginPage is my rootPage/default
        return false; // Return false: user not authorized to view page
      }
    }
}
