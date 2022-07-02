import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsByCategoryComponent } from './products-by-category/products-by-category.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'category/:name', component: ProductsByCategoryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
