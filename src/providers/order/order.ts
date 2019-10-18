import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { Observable} from 'rxjs';
import { Order } from '../../model/order';

@Injectable()
export class OrderProvider {
  domain: string = environment.domain;
  queryUrl: string = '?term=';
  constructor(public http: Http) {

  }
  public getOrder(){
    return this.http.get(this.domain + "api/getOrders")
    .map(res => res.json())
    .catch(err=>Observable.throw(err.message))
  }
  public getOneOrder(id: string){
    return this.http.get(this.domain + "api/getoneOrder/" + id)
    .map(res => res.json())
    .catch(err=>Observable.throw(err.message));
  }
  public finishOrder(order, orderUp){
    console.log(order);
    return this.http.put(this.domain + 'api/finishOrder/' + order._id, orderUp)
    .map(res => res.json())
    .catch(err=>Observable.throw(err.message));
  }
  public pagamentoOrder(order, orderUp){
    console.log(order);
    return this.http.put(this.domain + 'api/pagamentoOrder/' + order._id, orderUp)
    .map(res => res.json())
    .catch(err=>Observable.throw(err.message));
  }
  search(terms: Observable<string>) {
    return terms.debounceTime(400)
      .distinctUntilChanged()
      .switchMap(term => this.OrderSearch(term));
  }
  searchCozinha(terms: Observable<string>) {
    return terms.debounceTime(400)
      .distinctUntilChanged()
      .switchMap(term => this.OrderSearchCozinha(term));
  }
  searchDate(terms: Observable<string>) {
    return terms.debounceTime(400)
      .distinctUntilChanged()
      .switchMap(dateTerm => this.OrderSearchTerm(dateTerm));
  }
  public OrderSearch(term){
    return this.http.get(this.domain + 'api/searchOrder?pagamento=' + term).map(res => res.json());
  }
  public OrderSearchCozinha(term){
    return this.http.get(this.domain + 'api/searchOrder?status=' + term).map(res => res.json());
  }
  public OrderSearchTerm(dateTerm){
    return this.http.get(this.domain + 'api/searchOrder?&createdAt=' + dateTerm).map(res => res.json());
  }

}
