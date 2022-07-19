import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { Buyer } from "../buyer-info/buyer";

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    constructor(private http: HttpClient) { }

    order(order: any) {
        return this.http.post(environment.orderServiceUrl + 'order', order)
    }
}