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

    getFeatureNames() {
        return this.http.get(environment.inventoryServiceUrl + 'feature-name')
    }

    getAllProducts(){
        return this.http.get(environment.inventoryServiceUrl + 'product')
    }

    getProductsByCategory(categoryName:any){
        return this.http.get(environment.inventoryServiceUrl + 'product/category/' + categoryName)
    }

    getProductById(productId: any) {
        return this.http.get(environment.inventoryServiceUrl + 'product/' + productId)
    }

    createProduct(product: any) {
        return this.http.post(environment.inventoryServiceUrl + 'product', product)
    }
}