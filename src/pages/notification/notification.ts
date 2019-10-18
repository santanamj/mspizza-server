import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FCM } from '@ionic-native/fcm';
import { Platform } from 'ionic-angular';
import { User } from './../../providers/auth/model/user';
import { HomePage } from '../home/home';
@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {
  username;
  form;
  registerfcm;
  user;
  message;
  token;
  isToggled;
  removeForm;
  removeNotify = "0";
  newfcm;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public view: ViewController,
    public alertCtrl: AlertController,
    private authProvider: AuthProvider,
    private formBuilder: FormBuilder,
    private fcm: FCM,
    private toast: ToastController,
  ) {
    this.formNotification();
    this.removeNotification();
  }
  //formbuilder add notify
  formNotification() {
    this.form = this.formBuilder.group({
      registerfcm: ['']
    })
  }
  //formbuilder remove notify
  removeNotification() {
    this.removeForm = this.formBuilder.group({
      registerfcm: ['']
    })
  }
  //Function add notify
  onNotification() {
    const notitoken = {
      registerfcm: this.newfcm
    }
    this.authProvider.updateUser(this.user, notitoken).subscribe(data => {
      console.log(data)
      if (!data.success) {
        this.message = data.message; // Return error message
        this.toast.create({ message: 'erro', duration: 3000 }).present();
      } else {
        console.log(notitoken)
        this.authProvider.usernotifyAdd(notitoken).subscribe(data => {
          if (!data.sucess) {
            this.message = data.message;
            this.toast.create({ message: 'Não foi possível atualizar', duration: 3000 }).present();
          }
        })
        this.message = data.message; // Return success message
         this.verifyLog();
        this.toast.create({ message: 'A partir de agora você irá receber notificações', duration: 3000 }).present();
        setTimeout(() => {
          this.message = false;
          this.navCtrl.push(HomePage);
        }, 2000)
      }
    })
  }
  //function Remove notify
  removeNoti() {
    const notitoken = {
      registerfcm: this.removeNotify
    }
    const notitokenRM = {
      registerfcm: this.newfcm
    }
    this.authProvider.updateUser(this.user, notitoken).subscribe(data => {
      console.log(data)
      if (!data.success) {
        this.message = data.message; // Return error message
        this.toast.create({ message: 'erro', duration: 3000 }).present();
      } else {
        this.authProvider.removeNoti(notitokenRM).subscribe(data => {
          if (!data.sucess) {
            this.message = data.message;
            this.toast.create({ message: 'Não foi possível atualizar', duration: 3000 }).present();
          }
        })
        this.message = data.message; // Return success message
         this.verifyLog();
        this.toast.create({ message: 'A partir de agora você não irá receber notificações', duration: 3000 }).present();
        setTimeout(() => {
          this.message = false;
          this.navCtrl.push(HomePage);
        }, 2000)
      }
    })
  }
  //Function for add or remove notify
  public notify() {
    if (this.registerfcm != 0 || undefined || null) {
      this.removeNoti();
    } else {
      this.onNotification();
    }
  }
  //verify if have token notify in the BD
  noti() {
    if (this.registerfcm != 0 || undefined || null) {
      this.isToggled = true;
    } else {
      this.isToggled = false;
    }
  }
  pop() {
    this.navCtrl.pop();
  }
  verifyLog(){
    this.authProvider.getProfile().subscribe(profile => {
        this.username = profile.user.username;
        this.registerfcm = profile.user.registerfcm;
        console.log(this.registerfcm);
        this.user = profile.user;
      });
  }
  ionViewDidLoad() {
     this.verifyLog();
    this.noti();
    // get or update token FCM
    this.fcm.getToken().then(token => {
      console.log(token);
      this.newfcm = token;
      console.log(token);

    });
    this.fcm.onTokenRefresh().subscribe(token => {
      console.log(token);
    });
    //Verify if to be logged and get data user
    if (this.authProvider.loggedIn()) {

      return true; // Return true: User is allowed to view route
    } else {
      this.navCtrl.setRoot(LoginPage);    // LoginPage is my rootPage/default
      return false; // Return false: user not authorized to view page
    }

  }

}
