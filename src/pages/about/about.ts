import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Nav } from 'ionic-angular';
import { CategoryPage } from '../category/category';
import { RegisterPage } from '../register/register';
import { ProductPage } from '../product/product';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import { SubproductPage } from '../subproduct/subproduct';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage implements OnInit {
  pages;
  role;
  username;
  constructor(
    public navCtrl: NavController,
    private authProvider: AuthProvider
    ) {
    this.pages = [

      {title: 'Adicionar categoria', component: CategoryPage},
      {title: 'Adicionar produtos', component:ProductPage },
      {title: 'Add SubProducts', component:SubproductPage},
      {title: 'Cadastrar usuário', component:RegisterPage}

      ];
  }
  openPage(page) {
    this.navCtrl.push(page.component);
  }
  showAdd(){
    if(this.role == "adm" || this.role == "gerente"){
      return true;
    }else{
      return false;
    }
  }
  ngOnInit() {
      this.authProvider.getProfile().subscribe(profile => {
        this.username = profile.user.username;
        this.role = profile.user.role;
      });
  }

}
