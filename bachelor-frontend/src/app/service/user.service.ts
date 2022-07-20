import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from 'src/environments/environment';
import { Buyer } from "../buyer-info/buyer";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient, private router: Router) { }

    login(username: string, password: string) {
      return this.http.post(environment.userServiceUrl + 'user/login', { username: username, password: password });
    }

    getUser(){
      return this.http.get(environment.userServiceUrl + 'user/' + this.getUserId());
    }

    getNewKey() {
      return this.http.get(environment.userServiceUrl + 'user/' + this.getUserId() + '/data-key');
    }

    getNewKeyPair() {
      return this.http.get(environment.userServiceUrl + 'user/' + this.getUserId() + '/data-key-pair');
    }

    decryptKey(ciphertext:string) {
      return this.http.post(environment.userServiceUrl + 'user/decryptKey', {ciphertext:ciphertext},
      {responseType: 'text'});
    }
  
    logout() {
      localStorage.removeItem('userId')
      localStorage.removeItem('username')
      this.router.navigate([''])
    }

    getUsername() {
      return localStorage.getItem('username') ?? "";
    }
  
    getUserId() {
      return localStorage.getItem('userId') ?? "";
    }
    
}