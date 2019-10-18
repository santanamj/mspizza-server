import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import 'rxjs/add/operator/catch';
import { map } from 'rxjs/operators';
import { Observable} from 'rxjs';
import { Product } from '../../model/product';
import { CacheProvider } from '../cache/cache';
import 'rxjs/add/operator/catch';
import { ErrorHandler } from '../../app/app.error-handler';

let count = 0;
@Injectable()
export class ProductProvider extends CacheProvider {
  domain = environment.domain;
  private products: Observable<Product[]>;

  constructor(public http: Http) {
    super();
  }
  public addProduct(formData){
    console.log(formData)
    return this.http.post(this.domain + 'api/addProduct', formData)
    .map(res => res.json());
  }
  public getProducts(): Observable<Product[]> {
    return this.cache<Product[]>(() => this.products,
                                 (val: Observable<Product[]>) => this.products = val,
                                 () => this.http.get(this.domain + 'api/getProducts')
      .map(res => res.json()));
  }
  public getAllProducts(): Observable<Product[]> {
    return this.http.get(this.domain + 'api/getProducts')
      .map(res => res.json());
    }

  public getProductId(id: string)  {
    return this.http.get(this.domain + 'api/getProduct/' + id )
    .map(res => res.json());
  }
}
