import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoryProvider } from '../../providers/category/category';
import { ProductProvider } from '../../providers/product/product';
import { Category } from '../../model/category';
import { Product } from '../../model/product';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import { Subproduct } from '../../model/subproduct';
import { SubproductProvider } from '../../providers/subproduct/subproduct';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';


@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  filesToUpload: Array<File> = [];
  imageUrl: string = "/assets/img/default-image.png";
  categories: Category[] = [];
  
  subproducts;
  form:FormGroup;
  category: string;
  formData;
  files;
  mysub;
  username;
  role;
  sabor: any=[];
  sabores: any[];
  saboresChecked;
  myForm: FormGroup;
  selectedArray :any = [];
  selectTitle: any[];
  myproduct = new BehaviorSubject<any>([]);
  products;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private categoryProvider: CategoryProvider,
    private productProvider: ProductProvider,
    private subproductProvider: SubproductProvider,
    private formBuilder: FormBuilder,
    private authProvider: AuthProvider
  ) {
    if (!authProvider.loggedIn()) {
      navCtrl.push(LoginPage);
    }
    this.form = this.formBuilder.group({
      files: [null, Validators.required],
      title: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(5)
      ])],
      description: ['', Validators.required],
      category: ['', Validators.required],
      sabores: new FormArray([]),
      price: ['', Validators.pattern('[[0-9]{1,4}\.[0-9]{2}$')]
    })
    this.subproductProvider.getSubproducts().subscribe(data=>{
      this.subproducts = data;
      this.subproducts.forEach(() => {
        const control = new FormControl(); // if first item set to true, else false
        (this.form.controls.sabores as FormArray).push(control);
      });
      console.log(this.form.controls.orders as FormArray)
    })
    
   
   
    this.CreateNewProduct();
   
    this.saboresChecked = [];
  
  }
  ngOnInit() {
    this.products
  }
  CreateNewProduct() { }
  // selectSabores(sabores, ev) {
  //   if (ev.value) {
  //     this.saboresChecked.push(sabores)
  //     this.form.get('sabores').setValue(this.saboresChecked)
  //     console.log(this.saboresChecked)
  //   }
  // }
  // selectMember(data){
  //   if (data.checked == true) {
  //      this.selectedArray.push(data);
  //    } else {
  //     let newArray = this.selectedArray.filter(function(el) {
  //       return el.title !== data.title;
  //    });
  //     this.selectedArray = newArray;
  //   }
  //   this.form.get('sabores').setValue(this.selectedArray)
  //   console.log(this.selectedArray);
  //  }
   select(){
    const selectedPreferences = this.form.value.sabores
      .map((checked, index) => checked ? this.subproducts[index].price : null)
      .filter(value => value !== null);      
    // Do something with the result
    console.log(selectedPreferences);
    this.selectTitle =
    this.form.value.sabores
      .map((checked, index) => checked ? this.subproducts[index].title : null)
      .filter(value => value !== null);
     console.log(this.selectTitle)
  }
  fileChangeEvent(event: any) {

    if (event.target.files.length > 0) {
      let files = event.target.files[0];
      this.form.get('files').setValue(files);
      console.log(files[0]);
    }
  }
  addProduct() {
    console.log('meu sabor', this.saboresChecked)
    const mysab = {
      sabores: JSON.stringify(this.form.get(['sabores']).value)
    }
    console.log(mysab)
    const formData = new FormData();
    formData.append('files[]', this.form.get('files').value);
    formData.append('title', this.form.get('title').value);
    formData.append('description', this.form.get('description').value);
    formData.append('category', this.form.get('category').value);
    formData.set('sabores', JSON.stringify(this.form.get(['sabores']).value));
    formData.append('price', this.form.get('price').value);

    this.productProvider.addProduct(formData).subscribe(data => {

      if (!data) {
        console.error();
      } else {
        this.form.reset();
        setTimeout(() => {
          console.log("criado com sucesso");
        }, 2000)
      }
    })
  }
  showAddProduct() {
    if (this.role == "adm" || this.role == "gerente") {
      return true;
    } else {
      return false;
    }
  }
  getCategories() {
    this.categoryProvider.getCategories().subscribe(data => {
      this.categories = data;
      console.log(this.categories);
    });
  }
  // getSubproduct() {
  //   this.subproductProvider.getSubproducts().subscribe(data => {
  //     this.subproducts = data;
  //   })
  // }
  ionViewDidLoad() {
    this.getCategories();
   //this.getSubproduct();
    if (this.authProvider.loggedIn()) {
      this.authProvider.getProfile().subscribe(profile => {
        this.username = profile.user.username;
        this.role = profile.user.role;
      });
      return true; // Return true: User is allowed to view route
    } else {
      this.navCtrl.setRoot(LoginPage);    // LoginPage is my rootPage/default
      return false; // Return false: user not authorized to view page
    }

  }

}
