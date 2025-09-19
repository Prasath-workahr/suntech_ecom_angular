import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ProductDetailsComponent } from './product-details.component/product-details.component.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'login', component: IndexComponent },
  { path: 'product-details', component: ProductDetailsComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
