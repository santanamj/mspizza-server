import { Component, EventEmitter, Output } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OrderProvider } from '../../providers/order/order';
import { Order } from '../../model/order';
import { Observable } from 'rxjs';
import * as _ from 'lodash';
import { OrderDetailPage } from './order-detail/order-detail';
import { LoginPage } from '../login/login';
import { AuthProvider } from '../../providers/auth/auth';
import { environment } from '../../environments/environments';
import * as io from 'socket.io-client';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { ShoppingCartProvider } from '../../providers/shopping-cart/shopping-cart';
import { Pedido } from '../../model/pedido';

@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {
  @Output() valueChange = new EventEmitter();
  pedidos : string[] = [];
  pedido: string;
  result= {} = [];
  items= {} = [];
  orders: Order[]= [];
  username;
  private socket;
  sub: Subscription;
  results: Object;
  searchTerm$ = new BehaviorSubject('aberto');
  counter = 0;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private orderProvider: OrderProvider,
    private authProvider: AuthProvider,
    private shopService: ShoppingCartProvider
    ) {
      this.orderProvider.searchCozinha(this.searchTerm$ )
      .subscribe(results => {
       this.orders = results;
       console.log(this.orders)
     });
  }
  contador(){
    this.counter = this.counter + 1;
    this.valueChange.emit(this.counter);
  }

  ionViewDidLoad() {
    this.socket = io('https://service-socket.herokuapp.com');
    this.sub = this.socket = this.shopService.onPedido()
    .subscribe((pedido: string) => {
      this.pedidos.unshift(pedido);
      this.contador();
      console.log(this.pedidos);
    })

    this.getAllOrder();
    if (this.authProvider.loggedIn()) {
      return true; // Return true: User is allowed to view route

    } else {

      this.navCtrl.setRoot(LoginPage);    // LoginPage is my rootPage/default
      return false; // Return false: user not authorized to view page
    }

  }
  getAllOrder(){
    this.orderProvider.getOrder().subscribe(data => {
      this.result = data;
     this.orders = this.result;
  });
   }
   clearOrder(){
    this.orderProvider.getOrder().subscribe(data => {
      this.result = data;
      this.orders = this.result = [];

  });
  }
  navigateToOrder(id: string){
    this.orderProvider.getOneOrder(id).subscribe((result:any)=>{
      this.navCtrl.push(OrderDetailPage, {order: result.order});
    })
  }
  update(){
    this.updateOrder();
  }
  updateOrder(){
    this.clearOrder();
    this.counter--;
    this.orderProvider.getOrder().subscribe(data => {
      this.result = data;
     this.orders = this.result;
  });
  }
}
