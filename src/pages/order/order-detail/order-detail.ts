import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { OrderProvider } from '../../../providers/order/order';
import { Order } from '../../../model/order';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AbstractEmitterVisitor } from '@angular/compiler/src/output/abstract_emitter';
import { OrderPage } from '../order';

@IonicPage()
@Component({
  selector: 'page-order-detail',
  templateUrl: 'order-detail.html',
})
export class OrderDetailPage {
  order;
  orders: Order []= [];
  message;
  form;
  status;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toast: ToastController,
    private orderProvider: OrderProvider,
    public formBuilder: FormBuilder
    ) {
    this.order = this.navParams.data.order;
    this.updateOrder();

  }
  public updateOrder(){
    this.form = this.formBuilder.group({
      status:['']
    })
  }

  ionViewDidLoad() {
    this.order = this.order;
    console.log(this.order);
    this.status = this.order.status
    console.log(this.status);
    this.getOrders();
    this.openOrder();

  }
  public finishOrder() {
    const orderUp = {
      status: this.form.get('status').value
    }

    this.orderProvider.finishOrder(this.order, orderUp).subscribe(data => {
      if (!data) {

        this.toast.create({ message: 'Erro ao tentar finalizar o pedido', duration: 300 })
      } else {

        this.toast.create({ message: 'Pedido finalizado com sucesso', duration: 300 });

        setTimeout(() => {
          this.message = false;
          this.navCtrl.push(OrderPage, {
           callback: this.getOrders()
          })
        }, 2000)
      }
    })
  }
 openOrder(){
    if(this.status == "aberto"){
      return true;
    }else{
      return false;
    }
  }
  public getOrders(){
    this.orderProvider.getOrder().subscribe(data=>{
      this.orders = data.orders;
    })
  }
  public pop(){
    this.navCtrl.pop();
  }
}
