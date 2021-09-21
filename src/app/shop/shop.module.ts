import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShopComponent} from './shop.component';
import {ProductItemComponent} from './product-item/product-item.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [
    ShopComponent,
    ProductItemComponent,
  ],
  exports: [
    ShopComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    SharedModule
  ]
})
export class ShopModule {
}
