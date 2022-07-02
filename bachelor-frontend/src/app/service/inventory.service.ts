import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class InventoryService {
    constructor(private http: HttpClient) { }

    getCategories(){
        return this.http.get(environment.inventoryServiceUrl + 'category')
    }

    getAllProducts(){
        return this.http.get(environment.inventoryServiceUrl + 'product')
    }

    getProductsByCategory(categoryName:any){
        return this.http.get(environment.inventoryServiceUrl + 'product/category/' + categoryName)
    }
}