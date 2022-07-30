import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CartService } from '../service/cart.service';
import { InventoryService } from '../service/inventory.service';
import { UserService } from '../service/user.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Feature } from '../create-product/feature';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit, AfterViewInit {
  productId: any
  product: any
  showLoadingIcon = true
  images: any
  isDataLoaded = false

  categories: any;
  featureNames: any;

  productForm: FormGroup;

  nameForm = new FormControl('', [Validators.required]);
  priceForm = new FormControl('', [Validators.required]);
  categoryForm = new FormControl('', [Validators.required]);
  quantity = 1;
  featuresData: any;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private inventoryService: InventoryService, private cartService: CartService, public userService: UserService) {
    this.productForm = this.fb.group({
      features: this.fb.array([]),
    });
    this.images = []
  }
  ngAfterViewInit(): void {
    this.getFeatureNames()
  }

  ngOnInit(): void {
    if (this.userService.getUserId() == '') {
      this.router.navigate([''])
    }
    this.route.paramMap.subscribe(
      (data) => {
        this.showLoadingIcon = true
        this.productId = data.get("id")
        this.getProduct();
      }
    )
    this.getCategories()
    this.isDataLoaded = true
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
    this.featuresData = data.features;
    this.product.features = [];

    for (const i in Object.keys(this.featuresData)) {
      this.addFeature()
      let index = this.features().length - 1
      this.features().at(index).get('featureName')?.setValue(Object.keys(this.featuresData)[i])
      this.features().at(index).get('features')?.setValue([])
    }

  }
  private createImages(data: any) {
    var images = data.images;
    delete this.product.images
    for (const i in Object.keys(images)) {
      this.images.push({ id: Object.keys(images)[i], image: 'data:image/jpg;base64,' + Object.values(images)[i] });
    }
  }
  removeImage(id: any) {
    this.inventoryService.removeImage(id, this.product.id).subscribe(
      (data) => {
        this.images = this.images.filter((i: any) => i.id != id)
      },
      (error) => {

      }
    )
  }

  uploadImage(ev: Event) {
    const target = ev.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    const size = file.size;

    this.inventoryService.uploadImage(file, this.product.id).subscribe(
      (data) => {
        let img = 'data:image/jpg;base64,' + data.base64Image;
        this.images.push({ id: data.id, image: img, thumbImage: img })
        Swal.fire(
          {
            icon: 'success',
            title: 'Uspešno ste dodali sliku',
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
    );
  }

  updateQuantity() {
    this.inventoryService.updateQuantity(this.product.id, this.quantity).subscribe(
      () => {
        this.product.quantity += this.quantity
        this.quantity = 1
        Swal.fire(
          {
            icon: 'success',
            title: 'Uspešno ste ažurirali količinu',
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

  edit() {
    var product: any = { id:this.productId, name: this.product.name, price: this.product.price, category: this.product.category, features: {} }

    for (let index = 0; index < this.features().length; index++) {
      var featureName: string = this.features().at(index).get('featureName')?.value
      var features = this.features().at(index).get('features')?.value
      var newFeatures = []


      for (const feature of features) {
        newFeatures.push(feature.name)
      }

      product.features[featureName] = newFeatures
    }

    this.inventoryService.editProduct(product).subscribe(
      (data: any) => {
        this.router.navigate(['product', data.id])
        Swal.fire(
          {
            icon: 'success',
            title: 'Uspešno ste izmenili proizvod',
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

  getFeature(index: any) {
    var retVal = new Array<Feature>()
    if(this.features().at(index).get('features')!.value.length==0)
      this.addFeaturesForIndex(index)
    var map = this.features().at(index).get('features')!.value

    for (const value of map.values()) {
      retVal.push(value)
    }

    return retVal
  }
  addFeaturesForIndex(index: any) {
    var values: any = Object.values(this.featuresData)[index]
if(values!=undefined||values!=null)
    for (const element of values) {
      this.features().at(index).get('features')!.value.push({ name: element })
    }
  }






}
