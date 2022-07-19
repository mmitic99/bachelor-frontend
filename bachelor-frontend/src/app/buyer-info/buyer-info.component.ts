import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../service/cart.service';
import { InventoryService } from '../service/inventory.service';
import { OrderService } from '../service/order.service';
import { Buyer } from './buyer';

@Component({
  selector: 'app-buyer-info',
  templateUrl: './buyer-info.component.html',
  styleUrls: ['./buyer-info.component.css']
})
export class BuyerInfoComponent implements OnInit {
  productId: any
  shoppingCartItems: any
  products: any
  buyer = new Buyer('', '', '', '', '', '', '', '')
  showLoadingIcon = false

  nameForm = new FormControl('', [Validators.required, Validators.maxLength(30)]);
  surnameForm = new FormControl('', [Validators.required, Validators.maxLength(30)]);
  emailForm = new FormControl('', [Validators.required, Validators.maxLength(30)]);
  phoneNumberForm = new FormControl('', [Validators.required, Validators.maxLength(30)]);
  streetAndNumberForm = new FormControl('', [Validators.required, Validators.maxLength(30)]);
  postalCodeForm = new FormControl('', [Validators.required, Validators.maxLength(30)]);
  cityForm = new FormControl('', [Validators.required, Validators.maxLength(30)]);

  constructor(private route: ActivatedRoute, private router: Router, private cartService: CartService, private inventoryService: InventoryService, private orderService: OrderService) { }

  ngOnInit(): void {

    this.productId = sessionStorage.getItem('buyNowProductId')
    if (this.productId != null) {
      sessionStorage.removeItem('buyNowProductId')
      this.getProduct(this.productId);
    }
    else {
      this.shoppingCartItems = this.cartService.getItems();
      if (this.shoppingCartItems == null || this.shoppingCartItems.length == 0) {
        this.router.navigate([''])
      }
      this.getProducts();
    }


    /*this.route.paramMap.subscribe(
      (data) => {
        this.fromCart = data.get("fromCart")

        if (this.fromCart == 'false') {
          this.productId = sessionStorage.getItem('buyNowProductId')
          if (this.productId == null) {
            this.router.navigate([''])
          }
          sessionStorage.removeItem('buyNowProductId')
          this.getProduct(this.productId);
        }
        else {
          this.shoppingCartItems = this.cartService.getItems();
          if (this.shoppingCartItems == null || this.shoppingCartItems.length == 0) {
            this.router.navigate([''])
          }
          this.getProducts();
        }
      })*/
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

  sendOrder(){
    this.showLoadingIcon = true;
    this.buyer.products = []
    for (const product of this.products) {
      this.buyer.products.push({id:product.id, quantity:product.itemQuantity})
    }

    this.orderService.order(this.buyer).subscribe(
      (data)=>{
        this.showLoadingIcon = false;
        this.cartService.clearCart()
        this.router.navigate([''])
      },
      (error)=>{
        console.log(error)
      }
    )
  }
  
  getNameErrorMessage() {
    return this.nameForm.hasError('required') ? 'Polje je obavezno' :
      '';
  }
  
  getSurnameErrorMessage() {
    return this.surnameForm.hasError('required') ? 'Polje je obavezno' :
      '';
  }
  
  getEmailErrorMessage() {
    return this.emailForm.hasError('required') ? 'Polje je obavezno' :
      '';
  }
  
  getPhoneErrorMessage() {
    return this.phoneNumberForm.hasError('required') ? 'Polje je obavezno' :
      '';
  }
  
  getStreetErrorMessage() {
    return this.streetAndNumberForm.hasError('required') ? 'Polje je obavezno' :
      '';
  }
  
  getPostalErrorMessage() {
    return this.postalCodeForm.hasError('required') ? 'Polje je obavezno' :
      '';
  }
  
  getCityErrorMessage() {
    return this.cityForm.hasError('required') ? 'Polje je obavezno' :
      '';
  }

}
