import { AuthenticationProvider } from './../../app/guards/auth.guard';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import {Storage} from '@ionic/storage';
import {JwtHelper, tokenNotExpired} from 'angular2-jwt';

import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { User } from './model/user';


@Injectable()
export class AuthProvider {
// domain = ""; // Production
domain = environment.domain;
authToken;
user;
options;
public token: any;
constructor(
  private http: Http,
  public storage: Storage,
  private platform: Platform
) { }

// Function to create headers, add token, to be used in HTTP requests
createAuthenticationHeaders() {
  this.loadToken(); // Get token so it can be attached to headers
  // Headers configuration options
  this.options = new RequestOptions({
    headers: new Headers({
      'Content-Type': 'application/json', // Format set to JSON
      'authorization': this.authToken // Attach token
    })
  });
}

// Function to get token from client local storage
loadToken() {
  const token = localStorage.getItem('id_token');
  this.authToken = token; // Get token and asssign to variable to be used elsewhere
}

// Function to register user accounts
registerUser(user, tokenFcm) {
  console.log(user);
  return this.http.post(this.domain + 'api/register', user, tokenFcm).map(res => res.json());
}

// Function to check if username is taken
checkUsername(username) {
  return this.http.get(this.domain + 'api/checkUsername/' + username).map(res => res.json());
}

// Function to check if e-mail is taken
checkEmail(email) {
  return this.http.get(this.domain + 'api/checkEmail/' + email).map(res => res.json());
}

// Function to login user
login(user) {
  return this.http.post(this.domain + 'api/login', user).map(res => res.json());
}
updateUser(user, notitoken){
  this.createAuthenticationHeaders();
  return this.http.put(this.domain + 'api/updateUser/' + user._id, notitoken, this.options).map(res => res.json());
}
usernotifyAdd(notitoken){
  this.createAuthenticationHeaders();
  return this.http.post(this.domain + 'api/usernotifySubscribe/', notitoken, this.options).map(res => res.json());
}
removeNoti(notitokenRM){
  this.createAuthenticationHeaders();
  return this.http.post(this.domain + 'api/userremovenotify/', notitokenRM, this.options).map(res => res.json());
}
// Function to logout
logout() {
  this.authToken = null; // Set token to null
  this.user = null; // Set user to null
  localStorage.clear(); // Clear local storage
}

// Function to store user's data in client local storage
storeUserData(token, user) {
  localStorage.setItem('id_token', token); // Set token in local storage
  localStorage.setItem('user', JSON.stringify(user)); // Set user in local storage as string
  this.authToken = token; // Assign token to be used elsewhere
  this.user = user; // Set user to be used elsewhere
}


// Function to get user's profile data
getProfile() {
  this.createAuthenticationHeaders(); // Create headers before sending to API
  return this.http.get(this.domain + 'api/profile', this.options).map(res => res.json());
}
getUsers(id) {
  this.createAuthenticationHeaders(); // Create headers before sending to API
  return this.http.get(this.domain + 'api/profile/' + id, this.options).map(res => res.json());
}
// Function to get public profile data
getPublicProfile(username) {
  this.createAuthenticationHeaders(); // Create headers before sending to API
  return this.http.get(this.domain + 'authentication/publicProfile/' + username, this.options).map(res => res.json());
}

// Function to check if user is logged in
loggedIn() {
  return tokenNotExpired('id_token');
}

}
