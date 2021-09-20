import {Component, OnInit} from '@angular/core';
import {Pagination} from '../shared/models/pagination';
import {loadPaginatedProducts} from '../store/actions/product.actions';
import {select, Store} from '@ngrx/store';
import {selectPaginatedProducts} from '../store/selectors/product.selectors';
import {Product} from '../shared/models/products';
import {IAppState} from '../store/reducers';
import {loadProductBrands} from '../store/actions/product-brand.actions';
import {ProductBrand} from '../shared/models/product-brand';
import {ProductType} from '../shared/models/product-type';
import {selectAllProductTypes} from '../store/selectors/product-type.selectors';
import {selectAllProductBrands} from '../store/selectors/product-brand.selectors';
import {loadProducTypes} from '../store/actions/product-type.actions';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  products: Product[];
  productBrands$ = this.store.select(selectAllProductBrands);
  productTypes$ = this.store.select(selectAllProductTypes);

  constructor(private store: Store<IAppState>) {
  }

  ngOnInit(): void {
    this.getProducts();
    this.store.dispatch(loadProductBrands());
    this.store.dispatch(loadProducTypes());
  }

  getProducts(): void {
    const pagination = new Pagination();
    pagination.pageIndex = 1;
    pagination.pageSize = 6;
    this.store.dispatch(loadPaginatedProducts({payload: pagination}));

    this.store.pipe(select(selectPaginatedProducts)).subscribe(value => {
      this.products = value?.data;
    });
  }

}
