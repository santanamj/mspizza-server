import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { StorageProvider } from '../storage/storage';
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { Product } from '../../model/product';
import { ProductProvider } from '../product/product';
import { CartItem } from '../../model/cart-item';
import { ShoppingCart } from '../../model/shopping-cart';
import { environment } from '../../environments/environments';
import * as io from 'socket.io-client';
const CART_KEY = "cart";

@Injectable()
export class ShoppingCartProvider {
  private storage: Storage;
  private subscriptionObservable: Observable<ShoppingCart>;
  private subscribers: Array<Observer<ShoppingCart>> = new Array<Observer<ShoppingCart>>();
  private products: Product[];
  domain = environment.domain;
  iodomain = "https://service-socket.herokuapp.com"
  private socket;

  constructor(
    public http: Http,
    private productProvider: ProductProvider,
    private storageProvider: StorageProvider
  ) {
    this.storage = this.storageProvider.get();
    this.productProvider.getProducts().subscribe((products) => this.products = products);


    this.subscriptionObservable = new Observable<ShoppingCart>((observer: Observer<ShoppingCart>) => {
      this.subscribers.push(observer);
      observer.next(this.retrieve());
      return () => {
        this.subscribers = this.subscribers.filter((obs) => obs !== observer);
      };
    });
    this.socket = io("https://service-socket.herokuapp.com");
  }
  public get(): Observable<ShoppingCart> {
    return this.subscriptionObservable;
  }

  Order(pedido: any): void {
    this.socket.emit('addPedido', pedido);
  }
  public onPedido() {
    let observable = new Observable(observer => {
      this.socket.on('pedido', (data) => {
        observer.next(data);
      });

    })
    return observable;
  }

  public orderPost(myorder ) {
    console.log(myorder);
    return this.http.post(this.domain + 'api/addOrder',  myorder )
      .map(res => res.json());
  }
  public notifyPush(){
    return this.http.get(this.domain + 'api/notifyPush').map(res => res.json())
  }
  public notifyPost(pedido){
    return this.http.post(this.domain + 'api/usernotifyAdd', pedido)
    .map(res=> res.json());
  }

  public addItem(product, quantity: number ): void {
    console.log(product);
    console.log(quantity)
    const cart = this.retrieve();
    let item:any = Object.assign({quantity: quantity}, product );
    
    if (item === undefined) {
      item = new CartItem();
      console.log(item)    
      cart.items.push(item);     
    }
    cart.items.push(item); 
    console.log(item)
   
    console.log(item.quantity)
    cart.items = cart.items.filter((cartItem) => cartItem.quantity > 0);
    console.log(cart.items)

    this.calculateCart(cart);
    this.save(cart);
    this.dispatch(cart);
    console.log(cart.items);
  }

  public empty(): void {
    const newCart = new ShoppingCart();
    this.save(newCart);
    this.dispatch(newCart);
  }
  private calculateCart(cart: ShoppingCart): void {
    cart.itemsTotal = cart.items
      .map((item) => item.quantity * item.price)
      .reduce((previous, current) => previous + current, 0);

    cart.grossTotal = cart.itemsTotal;
  }

  private retrieve(): ShoppingCart {
    const cart = new ShoppingCart();
    const storedCart = this.storage.getItem(CART_KEY);
    if (storedCart) {
      cart.updateFrom(JSON.parse(storedCart));
    }

    return cart;
  }

  private save(cart: ShoppingCart): void {
    this.storage.setItem(CART_KEY, JSON.stringify(cart));
  }

  private dispatch(cart: ShoppingCart): void {
    this.subscribers
      .forEach((sub) => {
        try {
          sub.next(cart);
        } catch (e) {
          // we want all subscribers to get the update even if one errors.
        }
      });
  }
}
