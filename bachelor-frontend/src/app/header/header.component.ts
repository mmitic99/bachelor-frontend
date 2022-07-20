import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { CartService } from '../service/cart.service';
import { InventoryService } from '../service/inventory.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  categories: any;

  constructor(private inventoryService: InventoryService, public cartService:CartService, public authService:AuthService) { }

  ngOnInit(): void {
    this.inventoryService.getCategories().subscribe(
      (data) => {
        this.categories = data;
        this.categories.sort((a: string, b: string) => a.localeCompare(b))
      },
      (error) => {
        this.categories = []
      }
    )
  }
  cartNumber():number{
    return this.cartService.numberOfItems()
  }
}
