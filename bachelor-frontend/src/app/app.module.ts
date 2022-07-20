import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ProductsByCategoryComponent } from './products-by-category/products-by-category.component';
import { ProductComponent } from './product/product.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { BuyerInfoComponent } from './buyer-info/buyer-info.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { KeysComponent } from './keys/keys.component';
import { CreateProductComponent } from './create-product/create-product.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ProductsByCategoryComponent,
    ProductComponent,
    BuyerInfoComponent,
    ShoppingCartComponent,
    LoginComponent,
    KeysComponent,
    CreateProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    NgbModule,
    NgImageSliderModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
