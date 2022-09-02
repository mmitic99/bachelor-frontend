import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class InventoryService {
    constructor(private http: HttpClient) { }

    getCategories() {
        return this.http.get(environment.inventoryServiceUrl + 'category')
    }

    getFeatureNames() {
        return this.http.get(environment.inventoryServiceUrl + 'feature-name')
    }

    getAllProducts() {
        return this.http.get(environment.inventoryServiceUrl + 'product')
    }

    getProductsByCategory(categoryName: any) {
        return this.http.get(environment.inventoryServiceUrl + 'product/category/' + categoryName)
    }

    getProductById(productId: any) {
        return this.http.get(environment.inventoryServiceUrl + 'product/' + productId)
    }

    createProduct(product: any) {
        return this.http.post(environment.inventoryServiceUrl + 'product', product)
    }
    editProduct(product: any) {
        return this.http.put(environment.inventoryServiceUrl + 'product', product)
    }
    removeImage(id: any, productId: any) {
        return this.http.post(environment.inventoryServiceUrl + 'product/' + productId + '/image/' + id, null)
    }
    uploadImage(file: File, id: any) {
        let photo = new FormData();
        photo.append('image', file);


        return this.http.post<any>(environment.inventoryServiceUrl + 'product/image/' + id, photo);
    }

    updateQuantity(id: any, quantity: any) {
        return this.http.put<any>(environment.inventoryServiceUrl + 'product/quantity', {id:id, quantity:quantity});
    }
    
    filter(parameters: string) {
        return this.http.get(environment.inventoryServiceUrl + 'product/filter?' + parameters)
    }

    search(searchParam: any) {
        return this.http.get(environment.inventoryServiceUrl + 'product/search?searchParam=' + searchParam)
    }
}