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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ManageUserEditComponent } from './admin/manage-users/manage-user-edit/manage-user-edit.component';
import { ManageUserAddComponent } from './admin/manage-users/manage-user-add/manage-user-add.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatBadgeModule} from '@angular/material/badge';
import { ManageProductsAddNewComponent } from './admin/manage-products/manage-products-add-new/manage-products-add-new.component';
import { ImageViewComponent } from './image-view/image-view.component';
import { ManageProductsEditComponent } from './admin/manage-products/manage-products-edit/manage-products-edit.component';
import { ManageCategoriesAddNewComponent } from './admin/manage-categories/manage-categories-add-new/manage-categories-add-new.component';
import { ManageCategoriesEditComponent } from './admin/manage-categories/manage-categories-edit/manage-categories-edit.component';

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
    ManageUserEditComponent,
    ManageUserAddComponent,
    ManageProductsAddNewComponent,
    ImageViewComponent,
    ManageProductsEditComponent,
    ManageCategoriesAddNewComponent,
    ManageCategoriesEditComponent,
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
    NgxPaginationModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatBadgeModule
  ],
  entryComponents: [ManageUserAddComponent],
  providers: [TitleCasePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
