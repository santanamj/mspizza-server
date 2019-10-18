import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Category } from '../../model/category';
import { environment } from '../../environments/environments';

import 'rxjs/add/operator/catch';
import { map } from 'rxjs/operators';
import { Observable} from 'rxjs';
@Injectable()
export class CategoryProvider {
  domain = environment.domain;
  Category;
  constructor(
    private httpClient: HttpClient
  ) { }

  public addCategory(formData):Observable<Category>{
    return this.httpClient.post(this.domain + 'api/newCategory', formData)
    .map(response =>{
      return new Category(response)
    }).catch((error: any)=>{
      return Observable.throw(error);
    });
  }
  public getCategories(){
    return this.httpClient.get(this.domain + 'api/getCategory')
    .map(res=>res)
    .catch(err=> Observable.throw(err.message));
}



}

