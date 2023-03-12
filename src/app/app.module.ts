import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PricecomComponent } from './pricecom/pricecom.component';
import { HomeComponent } from './home/home.component';
import { SingleComponent } from './single/single.component';
import { ShopComponent } from './shop/shop.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


import {MatIconModule} from '@angular/material/icon';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';


import { HttpClientModule } from '@angular/common/http';
import { CommonModule, TitleCasePipe  } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { CategoryComponent } from './category/category.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ManageUsersComponent } from './admin/manage-users/manage-users.component';
import { ManageCategoriesComponent } from './admin/manage-categories/manage-categories.component';
import { ManageProductsComponent } from './admin/manage-products/manage-products.component';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PricecomComponent,
    HomeComponent,
    SingleComponent,
    ShopComponent,
    CheckoutComponent,
    ThankyouComponent,
    LoginComponent,
    RegisterComponent,
    ProductsComponent,
    CategoryComponent,
    DashboardComponent,
    ManageUsersComponent,
    ManageCategoriesComponent,
    ManageProductsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [TitleCasePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
