import { Component, EventEmitter, Output } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OrderProvider } from '../../providers/order/order';
import { Order } from '../../model/order';
import { Observable} from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import * as _ from 'lodash';
import { LoginPage } from '../login/login';
import { AuthProvider } from '../../providers/auth/auth';
import { environment } from '../../environments/environments';
import * as io from 'socket.io-client';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { ShoppingCartProvider } from '../../providers/shopping-cart/shopping-cart';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { AtendimentoDetailPage } from './atendimento-detail/atendimento-detail';

@IonicPage()
@Component({
  selector: 'page-atendimento',
  templateUrl: 'atendimento.html',
})
export class AtendimentoPage {
  @Output() valueChange = new EventEmitter();
  pedidos : string[] = [];
  pedido: string;
  result= {} = [];
  items= {} = [];
  orders: any;
  username;
  private socket;
  sub: Subscription;
  counter = 0;
  results: Object;
  searchTerm$ = new BehaviorSubject('pagamentoAberto');
  mesaTerm$ = new Subject<string>();
  mySearch$;
  types;
  statusOrder;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private orderProvider: OrderProvider,
    private authProvider: AuthProvider,
    private shopService: ShoppingCartProvider
  ) {
    const dateYear = moment().toDate();
    dateYear.setFullYear(dateYear.getFullYear());
    const datemonth = moment().toDate();
    datemonth.setMonth(datemonth.getMonth());
    const dateDay = moment().toDate();
    dateDay.setDate(dateDay.getDay() - 1);
    const dateHours = moment().toDate();
    dateHours.setHours(14);
     this.orderProvider.search(this.searchTerm$)
    .subscribe(results => {
     this.orders = results;
     console.log(this.orders)
   });
  }
  changeStatus(value){
    console.log(value);
    this.statusOrder.type=value;
  }
  contador(){
    this.counter = this.counter + 1;
    this.valueChange.emit(this.counter);
  }
  setFilteredItems() {
}
  ionViewDidLoad() {
    this.socket = io('https://service-socket.herokuapp.com');
    this.sub = this.socket = this.shopService.onPedido()
    .subscribe((pedido: string) => {
      this.pedidos.unshift(pedido);
      this.contador();
      console.log(this.pedidos);
    })
    this.setFilteredItems();
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
  navigateToAtendimento(id: string){
    this.orderProvider.getOneOrder(id).subscribe((result:any)=>{
      this.navCtrl.push(AtendimentoDetailPage, {order: result.order});
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
