import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { CartItem } from '../../model/cart-item';
import { Product } from '../../model/product';
import { ShoppingCart } from '../../model/shopping-cart';
import { ProductProvider } from '../../providers/product/product';
import { ShoppingCartProvider } from '../../providers/shopping-cart/shopping-cart';
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import { Observer } from "rxjs/Observer";
import { environment } from '../../environments/environments';
import * as io from 'socket.io-client';
import { LoginPage } from '../login/login';
import { AuthProvider } from '../../providers/auth/auth';
import { FCM } from '@ionic-native/fcm';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
interface ICartItemWithProduct extends CartItem {
  product: Product;
  totalCost: number;
}
@IonicPage()
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage implements OnInit, OnDestroy {

  public cart: Observable<ShoppingCart>;
  public cartItems: ICartItemWithProduct[];
  public itemCount: number;
  private products: Product[];
  private cartSubscription: Subscription;
  domain = 'https://service-socket.herokuapp.com';
  private socket;
  message;
  username;
  form;
  totalCart;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toast: ToastController,
    private productProvider: ProductProvider,
    private shoppingCartProvider: ShoppingCartProvider,
    private authProvider: AuthProvider,
    private fcm: FCM,
    private formBuilder: FormBuilder
  ) {
    this.createMoreOrder();
   
   }
   createMoreOrder(){
     this.form = this.formBuilder.group({
      mesa: [''],
      obs: [''],
      clientName: [''],
      totalCart: ['']
     })
   }
  public emptyCart(): void {
    this.shoppingCartProvider.empty();
  }
  public addProductToCart(product: Product): void {
    this.shoppingCartProvider.addItem(product, 1);
  }

  public removeProductFromCart(product: Product): void {
    this.shoppingCartProvider.addItem(product, -1);
  }
  public productInCart(product: Product): boolean {
    return Observable.create((obs: Observer<boolean>) => {
      const sub = this.shoppingCartProvider
                      .get()
                      .subscribe((cart) => {
                        obs.next(cart.items.some((i) => i.productId === product._id));
                        obs.complete();
                      });
      sub.unsubscribe();
    });
  }

  ngOnInit() {
    this.socket = io.connect(this.domain);
    this.cart = this.shoppingCartProvider.get();
    this.cartSubscription = this.cart.subscribe((cart) => {
      this.itemCount = cart.items.map((x) => x.quantity).reduce((p, n) => p + n, 0);
      this.productProvider.getProducts().subscribe((products) => {
        this.products = products;
        this.totalCart = cart.grossTotal;
        this.cartItems = cart.items
          .map((item) => {
            const product = this.products.find((p) => p._id === item.title);
            return {
              ...item,
              product,
              totalCost: item.price * item.quantity
            };
          });
          
      });
    });
  }
  public finishCart() {
    const formC ={
      mesa: this.form.get('mesa').value,
      obs: this.form.get('obs').value,
      clientName: this.form.get('clientName').value,
      totalCart: this.totalCart
    }
    const order = this.cartItems;
    console.log(order);
    const resultOrder = [];
    for(var i in order){
      var shared = false;
      for (var j in formC)
          if (formC[j].name == order[i]) {
              shared = true;
              break;
          }
      if(!shared) resultOrder.push(order[i])
   }
  const myorder = resultOrder.concat(formC);

    const pedido ={
      pedido: 'new order'
    }
    this.shoppingCartProvider.Order(pedido);
    this.shoppingCartProvider.orderPost(myorder).subscribe(data => {
      if (!data.success) {
        this.message = data.message; // Return error message
        this.toast.create({ message: 'Erro ao criar o pedido', duration: 3000 }).present();
      } else {
        this.message = data.message; // Return success message
        this.toast.create({ message: 'pedido criado com sucesso', duration: 3000 }).present();
        setTimeout(() => {
          this.message = false;
          this.pop();
          this.emptyCart();
        }, 2000)
        this.notifyPush();
      }
    })
  }
  notifyPush(){
    this.shoppingCartProvider.notifyPush().subscribe(data => {
      if(data.wasTapped){
        console.log("Received in background");
      } else {
        console.log("Received in foreground");
      };
    });
    // this.fcm.onNotification().subscribe(data=>{

    // });
   }
  pop() {
    this.navCtrl.pop();
  }
  ionViewDidLoad() {
    if (this.authProvider.loggedIn()) {
      this.authProvider.getProfile().subscribe(profile => {
        this.username = profile.user.username;  // Set username
      });
      return true; // Return true: User is allowed to view route

    } else {

      this.navCtrl.setRoot(LoginPage);    // LoginPage is my rootPage/default
      return false; // Return false: user not authorized to view page
    }

  }
  ngOnDestroy() {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }
}
