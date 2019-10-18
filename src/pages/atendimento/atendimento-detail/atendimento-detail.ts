import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { OrderProvider } from '../../../providers/order/order';
import { Order } from '../../../model/order';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AbstractEmitterVisitor } from '@angular/compiler/src/output/abstract_emitter';
import { AtendimentoPage } from '../atendimento';


@IonicPage()
@Component({
  selector: 'page-atendimento-detail',
  templateUrl: 'atendimento-detail.html',
})
export class AtendimentoDetailPage {
  order;
  orders: Order []= [];
  message;
  form;
  pagamento;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toast: ToastController,
    private orderProvider: OrderProvider,
    public formBuilder: FormBuilder
  ) {
    this.order = this.navParams.data.order;
    console.log(this.order)
    this.updateOrder();
  }

  public updateOrder(){
    this.form = this.formBuilder.group({
      pagamento:['']
    })
  }

  ionViewDidLoad() {
    this.order = this.order;
    console.log(this.order);
    this.pagamento = this.order.pagamento
    console.log(this.pagamento);
    this.getOrders();
    this.openOrder();

  }
  public finishOrder() {
    const orderUp = {
      pagamento: this.form.get('pagamento').value
    }

    this.orderProvider.pagamentoOrder(this.order, orderUp).subscribe(data => {
      if (!data) {

        this.toast.create({ message: 'Erro ao tentar finalizar o pedido', duration: 300 })
      } else {

        this.toast.create({ message: 'Pedido finalizado com sucesso', duration: 300 });

        setTimeout(() => {
          this.message = false;
          this.navCtrl.push(AtendimentoPage, {
           callback: this.getOrders()
          })
        }, 2000)
      }
    })
  }
 openOrder(){
    if(this.pagamento == "pagamentoAberto"){
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
    this.navCtrl.setRoot(AtendimentoPage);
  }

}
