import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuyerInfoComponent } from './buyer-info/buyer-info.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { ProductsByCategoryComponent } from './products-by-category/products-by-category.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'category/:name', component: ProductsByCategoryComponent },
  { path: 'product/:id', component: ProductComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'buyer-info', component: BuyerInfoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
