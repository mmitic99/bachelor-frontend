import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { InventoryService } from '../service/inventory.service';
import { Product } from './product';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { Feature } from './feature';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  categories: any;
  featureNames: any;

  productForm: FormGroup;

  product = new Product("", 0, "", [])

  nameForm = new FormControl('', [Validators.required]);
  priceForm = new FormControl('', [Validators.required]);
  categoryForm = new FormControl('', [Validators.required]);

  constructor(private inventoryService: InventoryService, private fb: FormBuilder, private router: Router, private userService: UserService) {
    this.productForm = this.fb.group({
      features: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    if (this.userService.getUserId() == '') {
      this.router.navigate([''])
    }
    this.getCategories()
    this.getFeatureNames()
  }
  getFeatureNames() {
    this.inventoryService.getFeatureNames().subscribe(
      (data) => {
        this.featureNames = data;
        this.featureNames.sort((a: string, b: string) => a.localeCompare(b))
      },
      (error) => {
        this.featureNames = []
      }
    )
  }

  getCategories() {
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

  create() {
    var product: any = { name: this.product.name, price: this.product.price, category: this.product.category, features: {} }

    for (let index = 0; index < this.features().length; index++) {
      var featureName: string = this.features().at(index).get('featureName')?.value
      var features = this.features().at(index).get('features')?.value
      var newFeatures = []


      for (const feature of features) {
        newFeatures.push(feature.name)
      }

      product.features[featureName] = newFeatures
    }

    this.inventoryService.createProduct(product).subscribe(
      (data: any) => {
        this.router.navigate(['product', data.id])
        
        Swal.fire(
          {
            icon: 'success',
            title: 'Uspešno ste kreirali proizvod',
            timer: 3000,
            showConfirmButton: false,
          })
      },
      (error) => {
        Swal.fire(
          {
            icon: 'error',
            title: error.message,
            timer: 3000,
            showConfirmButton: false,
          })
      }
    )
  }

  getnameErrorMessage() {
    return this.nameForm.hasError('required') ? 'Ne sme biti prazno' :
      '';
  }

  getpriceErrorMessage() {
    return this.priceForm.hasError('required') ? 'Ne sme biti prazno' :
      '';
  }

  getcategoryErrorMessage() {
    return this.categoryForm.hasError('required') ? 'Ne sme biti prazno' :
      '';
  }



  features(): FormArray {
    return this.productForm.get("features") as FormArray
  }

  newFeature(): FormGroup {
    return this.fb.group({
      featureName: '',
      features: this.fb.array([]),
    })
  }

  addFeature() {
    this.features().push(this.newFeature());
  }

  removeFeature(i: number) {
    this.features().removeAt(i);
  }

  onSubmit() {
    console.log(this.productForm.value);
  }



  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  add(event: MatChipInputEvent, index: number): void {
    const value = (event.value || '').trim();
    if (value) {
      this.features().at(index).get('features')!.value.push({ name: value });
    }
    event.chipInput!.clear();
  }

  remove(feature: Feature, index: number): void {
    const i = this.features().at(index).get('features')!.value.indexOf(feature);

    if (index >= 0) {
      this.features().at(index).get('features')!.value.splice(i, 1);
    }
  }

  getFeature(index: number) {
    var retVal = new Array<Feature>()
    var map = this.features().at(index).get('features')!.value

    for (const value of map.values()) {
      retVal.push(value)
    }

    return retVal
  }

}
