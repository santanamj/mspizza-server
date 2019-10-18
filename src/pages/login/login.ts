import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, MenuController, LoadingController, ToastController} from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { HomePage } from './../home/home';
import { AuthProvider } from './../../providers/auth/auth';
import { DashboardPage } from '../dashboard/dashboard';
import { MyApp } from '../../app/app.component';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  username: string;
	password: string;
  loading: any;
  message;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    public authProvider: AuthProvider,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    private toast: ToastController,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  login(){

    this.showLoader();
    let user = {
      username: this.username,
      password: this.password
  };

    this.authProvider.login(user).subscribe(data => {
      if (!data.success) {
        this.toast.create({ message: 'Erro no Login', duration: 3000 }).present();
        this.loading.dismiss();
      } else {
        this.message = data.message;
        this.authProvider.storeUserData(data.token, data.user);
        console.log(data);
        setTimeout(() => {
          this.navCtrl.setRoot(HomePage);
          this.loading.dismiss();
        }, 2000);
      }
  });

}

  showLoader(){

    this.loading = this.loadingCtrl.create({
      content: 'Entrando...'
    });

    this.loading.present();

  }
}
