import { Injectable } from '@angular/core'

let itemsInCart = []
let cart = []
@Injectable({
    providedIn: 'root'
})
export class CartService {

    items: any

    constructor() { }

    addToCart(productId: string) {
        let local_storage
        let itemsInCart = []
        this.items = {
            productId: productId,
            quantity: 1,
        }
        if (sessionStorage.getItem('cart') == null) {
            local_storage = []
            itemsInCart.push(this.items)
            sessionStorage.setItem('cart', JSON.stringify(itemsInCart))
        }
        else {
            local_storage = JSON.parse(sessionStorage.getItem('cart')!)
            for (var i in local_storage) {
                if (this.items.productId == local_storage[i].productId) {
                    local_storage[i].quantity += 1
                    this.items = null
                    break
                }
            }
            if (this.items) {
                itemsInCart.push(this.items)
            }
            local_storage.forEach(function (item: any) {
                itemsInCart.push(item)
            })
            sessionStorage.setItem('cart', JSON.stringify(itemsInCart))

        }
    }
    getItems() {
        return this.items = JSON.parse(sessionStorage.getItem('cart')!)

        //return this.items = 
    }
    deleteItem(item: any) {
        item = item
        let shopping_cart
        let index
        shopping_cart = JSON.parse(sessionStorage.getItem('cart')!)
        for (let i in shopping_cart) {
            if (item.productId == shopping_cart[i].productId) {
                index = i
            }
        }
        shopping_cart.splice(index, 1)
        sessionStorage.setItem('cart', JSON.stringify(shopping_cart))

    }
    addQty(item: any) {
        item = item
        let shopping_cart
        shopping_cart = JSON.parse(sessionStorage.getItem('cart')!)
        for (let i in shopping_cart) {
            if (item.productId == shopping_cart[i].productId) {
                shopping_cart[i].quantity += 1
                item = null
                break
            }
        }
        sessionStorage.setItem('cart', JSON.stringify(shopping_cart))

    }
    numberOfItems(): number {
        let itemsInCart = JSON.parse(sessionStorage.getItem('cart')!)
        if (itemsInCart != null) {
            return itemsInCart.length
        } else {
            return 0
        }
    }
    clearCart() {
        sessionStorage.clear()
    }
}
