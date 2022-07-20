import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from 'src/environments/environment';
import { Buyer } from "../buyer-info/buyer";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient, private router: Router) { }

    login(username: string, password: string) {
      return this.http.post(environment.userServiceUrl + 'user/login', { username: username, password: password });
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