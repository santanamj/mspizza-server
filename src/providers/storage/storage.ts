import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import "rxjs/add/operator/share";
import { Observable } from "rxjs/Observable";
export abstract class StorageService {
  public abstract get(): Storage;
}
@Injectable()
export class StorageProvider {
  public get(): Storage {
    return localStorage;
  }
  constructor(public http: Http) {

  }

}
