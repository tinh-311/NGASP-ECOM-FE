import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PricecomComponent } from './pricecom/pricecom.component';
import { RegisterComponent } from './register/register.component';
import { ShopComponent } from './shop/shop.component';
import { SingleComponent } from './single/single.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { ProductsComponent } from './products/products.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: HomeComponent},
  {path: 'shop', component: ShopComponent},
  {path: 'pricecom', component: PricecomComponent},
  {path: 'single', component: SingleComponent},
  {path: 'thankyou', component: ThankyouComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'home/products', component: ProductsComponent},
  {path: 'home/products/:category', component: ProductsComponent},
  {path: 'admin', component: DashboardComponent},
  {path: '**', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
