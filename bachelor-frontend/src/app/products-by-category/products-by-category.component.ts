import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InventoryService } from '../service/inventory.service';

@Component({
  selector: 'app-products-by-category',
  templateUrl: './products-by-category.component.html',
  styleUrls: ['./products-by-category.component.css']
})
export class ProductsByCategoryComponent implements OnInit {
  categoryName: any
  items: any
  showLoadingIcon = true

  constructor(private route: ActivatedRoute, private inventoryService: InventoryService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (data) => {
        this.showLoadingIcon = true
        this.items = []
        this.categoryName = data.get("name")
        if (this.categoryName == 'all') {
          this.getAllProducts()
        }
        else {
          this.getProducts();
        }
      }
    )
  }
  getAllProducts() {
    this.inventoryService.getAllProducts().subscribe(
      (data: any) => {
        this.items = []
        data.forEach((product: { images: any, quantity: any }) => {
          this.items.push({ image: product.images[Object.keys(product.images)[0]], product: product, description: this.getProductDescription(product) })
        });
        this.showLoadingIcon = false
      },
      (error) => {
        this.items = []
        this.showLoadingIcon = false
      }
    )
  }
  getProducts() {
    this.inventoryService.getProductsByCategory(this.categoryName).subscribe(
      (data: any) => {
        this.items = []
        data.forEach((product: { images: any, quantity: any }) => {
          this.items.push({ image: product.images[Object.keys(product.images)[0]], product: product, description: this.getProductDescription(product) })
        });
        this.showLoadingIcon = false
      },
      (error) => {
        this.items = []
        this.showLoadingIcon = false
      }
    )
  }
  getProductDescription(product: any) {
    var retVal = "";

    for (const i in Object.keys(product.features)) {
      retVal += Object.keys(product.features)[i] + ": " + product.features[Object.keys(product.features)[i]] + ";  "
    }


    return retVal;
  }

}
