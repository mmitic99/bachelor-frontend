import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { InventoryService } from '../service/inventory.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  items: any

  constructor(config: NgbCarouselConfig, private inventoryService: InventoryService) {
    // customize default values of carousels used by this component tree
    config.interval = 5000;
    config.keyboard = true;
    config.pauseOnHover = true;
  }

  ngOnInit(): void {
    this.inventoryService.getAllProducts().subscribe(
      (data: any) => {
        this.items = []
        data.forEach((product: { images: any, quantity: any }) => {
          console.log(product)
          if (product.quantity > 0)
            this.items.push({ image: product.images[Object.keys(product.images)[0]], product: product })
        });
      },
      (error: any) => {
        this.items = []
      }
    )
  }

}
