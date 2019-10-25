import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Nav } from 'ionic-angular';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoryProvider } from '../../providers/category/category';
import { Category } from '../../model/category';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import { TabsPage } from '../tabs/tabs';



@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {
  @ViewChild(Nav) nav:Nav;
  rootPage:any = TabsPage;
  categories: Category[];
  category;
  form;
  cat;
  username;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public view: ViewController,
    private categoryProvider: CategoryProvider,
    private formBuilder: FormBuilder,
    private authProvider: AuthProvider
    )
    {

      this.CargetoryFormCreate();
    }
    CargetoryFormCreate(){
   this.form = this.formBuilder.group ({
    files: [null, Validators.required],
      title:['', Validators.required],
      description:['', Validators.required],
      tipoPizza: ['']
    })
  }
  fileChangeEvent(event: any) {

    if(event.target.files.length > 0) {
        let files = event.target.files[0];
        this.form.get('files').setValue(files);
        console.log(files);
      }
    }
  categorySubmit(){
    const formData = new FormData();
    formData.append('files[]', this.form.get('files').value);
    formData.append('title', this.form.get('title').value);
    formData.append('description', this.form.get('description').value);
    formData.append('tipoPizza', this.form.get('tipoPizza').value)

    this.categoryProvider.addCategory(formData).subscribe((data)=>{
      this.getCategories();
       this.form.reset();
    })
  }
  getCategories(){
  this.categoryProvider.getCategories().subscribe(data=>{
    this.categories = data.categories;
    console.log(this.categories);
  });
  }
  ionViewDidLoad() {

    this.getCategories();
    if (this.authProvider.loggedIn()) {

      return true; // Return true: User is allowed to view route

    } else {

      this.navCtrl.setRoot(LoginPage);    // LoginPage is my rootPage/default
      return false; // Return false: user not authorized to view page
    }
  }

}
