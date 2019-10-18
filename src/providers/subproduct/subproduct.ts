import { Http } from '@angular/http';
import {HttpClient} from "@angular/common/http";
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import 'rxjs/add/operator/catch';
import { map } from 'rxjs/operators';
import { Observable} from 'rxjs';
import { Product } from '../../model/product';
import { CacheProvider } from '../cache/cache';
import 'rxjs/add/operator/catch';
import { Subproduct } from '../../model/subproduct';

@Injectable()
export class SubproductProvider  {
  domain = environment.domain;
 products;
 subproducts: Subproduct; 
  constructor(public http: HttpClient) {
    this.getProducts()
    console.log(this.getProducts())
    
  }
  public addSubProduct(formData){
    console.log(formData)
    return this.http.post(this.domain + 'api/addSubProduct', formData);
  }

  public getSubproducts(){
    return this.http.get(this.domain + 'api/getSubproduct')
    }
    public getProducts() {
      return this.http.get(this.domain + 'api/getProducts')
      .subscribe(
        data => this.products = data, 
       
        error => console.log(error),
        
      );
      
    }


}
