import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
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
  searchParam: any
  showSearch = false

  constructor(private route: ActivatedRoute, private inventoryService: InventoryService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (data) => {
        this.showLoadingIcon = true
        this.items = []
        this.categoryName = data.get("name")
        this.searchParam = localStorage.getItem('searchParam')
        if (this.categoryName == 'all') {
          if (this.searchParam != null) {
            this.showSearch = true
            this.search()
          }
          else {
            this.getAllProducts()
          }
        }
        else {
          this.getProducts();
        }
      }
    )
  }

  search() {
    localStorage.removeItem('searchParam')
    this.inventoryService.search(this.searchParam).subscribe(
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
      })
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


  screenDiagonals = [
    { name: '13.3', completed: false },
    { name: '14', completed: false },
    { name: '15.4', completed: false },
    { name: '15.6', completed: false },
    { name: '16', completed: false },
    { name: '17.3', completed: false },
  ]

  screenResolutions = [
    { name: '1366 x 768', completed: false },
    { name: '1600 x 900', completed: false },
    { name: '1920 x 1080', completed: false },
    { name: '1920 x 1200', completed: false },
    { name: '2560 x 1600', completed: false },
    { name: '3024 x 1964', completed: false },
    { name: '3456 x 2234', completed: false },
  ]

  processorProducer = [
    { name: 'Apple', completed: false },
    { name: 'AMD', completed: false },
    { name: 'Intel', completed: false },
  ]

  ram = [
    { name: '4GB', completed: false },
    { name: '6GB', completed: false },
    { name: '8GB', completed: false },
    { name: '12GB', completed: false },
    { name: '16GB', completed: false },
    { name: '32GB', completed: false },
  ]

  hdd = [
    { name: '128GB', completed: false },
    { name: '256GB', completed: false },
    { name: '512GB', completed: false },
    { name: '1TB', completed: false },
    { name: '2TB', completed: false },
    { name: '4TB', completed: false },
    { name: '8TB', completed: false },
  ]

  filter() {
    this.showLoadingIcon = true
    this.items = []
    var parameters = ''

    var count = 0
    for (const item of this.screenDiagonals) {
      if (item.completed) {
        parameters += 'screenDiagonals=' + item.name + '&'
        count += 1
      }
    }
    if (count == 0) {
      parameters += 'screenDiagonals=&'
    }

    count = 0
    for (const item of this.screenResolutions) {
      if (item.completed) {
        parameters += 'screenResolutions=' + item.name + '&'
        count += 1
      }
    }
    if (count == 0) {
      parameters += 'screenResolutions=&'
    }

    count = 0
    for (const item of this.processorProducer) {
      if (item.completed) {
        parameters += 'processorProducer=' + item.name + '&'
        count += 1
      }
    }
    if (count == 0) {
      parameters += 'processorProducer=&'
    }

    count = 0
    for (const item of this.ram) {
      if (item.completed) {
        parameters += 'ram=' + item.name + '&'
        count += 1
      }
    }
    if (count == 0) {
      parameters += 'ram=&'
    }

    count = 0
    for (const item of this.hdd) {
      if (item.completed) {
        parameters += 'hdd=' + item.name + '&'
        count += 1
      }
    }
    if (count == 0) {
      parameters += 'hdd=&'
    }

    parameters += 'category=' + this.categoryName
    if (this.searchParam != null)
      parameters += '&searchParam=' + this.searchParam
    else
      parameters += '&searchParam='


    if (parameters == null || parameters == '') {
      if (this.categoryName == 'all') {
        this.getAllProducts()
      }
      else {
        this.getProducts();
      }
    }
    else {

      this.inventoryService.filter(parameters).subscribe(
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

  }

}
