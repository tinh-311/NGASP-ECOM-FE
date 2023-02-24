import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PricecomComponent } from './pricecom/pricecom.component';
import { ShopComponent } from './shop/shop.component';
import { SingleComponent } from './single/single.component';
import { ThankyouComponent } from './thankyou/thankyou.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: LoginComponent},
  {path: 'header', component: HeaderComponent},
  {path: 'homie', component: HomeComponent},
  {path: 'footer', component: FooterComponent},
  {path: 'shop', component: ShopComponent},
  {path: 'pricecom', component: PricecomComponent},
  {path: 'single', component: SingleComponent},
  {path: 'thankyou', component: ThankyouComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: '**', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
