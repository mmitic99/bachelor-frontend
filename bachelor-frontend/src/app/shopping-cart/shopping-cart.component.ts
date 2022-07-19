import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../service/cart.service';
import { InventoryService } from '../service/inventory.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  shoppingCartItems: any
  products: any

  constructor(private route: ActivatedRoute, private router: Router, private cartService: CartService, private inventoryService: InventoryService) { }

  ngOnInit(): void {

      this.shoppingCartItems = this.cartService.getItems();
      if (this.shoppingCartItems == null || this.shoppingCartItems.length == 0) {
        this.router.navigate([''])
      }
      this.getProducts();

  }

  changeQuantity(product:any){
    this.cartService.setQuantity(product.id, product.itemQuantity)
  }

  getProducts() {
    for (const item of this.shoppingCartItems) {
      this.getProduct(item.productId)
    }
  }

  getProduct(productId: string) {
    this.inventoryService.getProductById(productId).subscribe(
      (data: any) => {
        if (this.products == null) {
          this.products = []
        }
        this.products.push(data)
        this.createImages(data, this.products.length - 1);
      },
      (error) => {
        this.products = []
      })
  }

  createImages(data: any, index: number) {
    var images = data.images;
    for (const i in Object.keys(images)) {
      this.products[index].image = Object.values(images)[i]
      break;
    }
    this.products[index].itemQuantity = 1
    this.products[index].index = index
    for (const item of this.shoppingCartItems) {
      if (data.id == item.productId) {
        this.products[index].itemQuantity = item.quantity
        break;
      }
    }
  }

  price(){
    var retVal = 0;
    for (const product of this.products) {
      retVal += product.itemQuantity * product.price
    }
    return retVal;
  }

}
