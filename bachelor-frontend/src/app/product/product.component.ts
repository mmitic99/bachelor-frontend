import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InventoryService } from '../service/inventory.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productId: any
  product: any
  showLoadingIcon = true

  constructor(private route: ActivatedRoute, private inventoryService: InventoryService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (data) => {
        this.showLoadingIcon = true
        this.productId = data.get("id")
        this.getProduct();
      }
    )
  }
  getProduct() {
    this.inventoryService.getProductById(this.productId).subscribe(
      (data: any) => {
        this.showLoadingIcon = false
        this.product = data
        this.createImages(data);
        this.createFeatures(data);
      },
      (error) => {
        this.showLoadingIcon = false
      }
    )
  }
  createFeatures(data: any) {
    var features = data.features;
    this.product.features = [];

    for (const i in Object.keys(features)) {
      var values: any = Object.values(features)[i]

      var newValues = ""

      for (const element of values) {
        newValues += element + '<br>'
      }

      this.product.features.push({ key: Object.keys(features)[i], values: newValues })
    }

  }


  private createImages(data: any) {
    var images = data.images;
    this.product.images = [];
    for (const i in Object.keys(images)) {
      this.product.images.push({ image: 'data:image/jpg;base64,' + Object.values(images)[i], thumbImage: 'data:image/jpg;base64,' + Object.values(images)[i], alt: 'ImageNotAvailable' });
    }
  }
}
