import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Product} from '../shared/models/products';
import {IAppState} from '../store/reducers';
import {loadProductBrands} from '../store/actions/product-brand.actions';
import {selectAllProductTypes} from '../store/selectors/product-type.selectors';
import {selectAllProductBrands} from '../store/selectors/product-brand.selectors';
import {loadProducTypes} from '../store/actions/product-type.actions';
import {RequestParam} from '../shared/models/request-param';
import {ProductBrand} from '../shared/models/product-brand';
import {ProductType} from '../shared/models/product-type';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {loadProducts} from '../store/actions/product.actions';
import {selectAllProducts, selectPageIndex, selectPageSize, selectTotalCount} from '../store/selectors/product.selectors';
import {PageChangedEvent} from 'ngx-bootstrap/pagination';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
  animations: [
    trigger('fade', [
      state('void', style({opacity: 0})),
      transition('void <=> *', [
        animate(300)
      ]),
    ])
  ]
})
export class ShopComponent implements OnInit {
  pageIndex$ = this.store.pipe(select(selectPageIndex));
  pageSize$ = this.store.pipe(select(selectPageSize));
  totalCount$ = this.store.pipe(select(selectTotalCount));

  products: Product[];
  productBrands: ProductBrand[];
  productTypes: ProductType[];
  sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Low to High', value: 'priceAsc'},
    {name: 'Price: High to Low', value: 'priceDesc'},
  ];
  shopParams = new RequestParam();
  form: FormGroup;


  constructor(private store: Store<IAppState>) {
  }

  ngOnInit(): void {
    this.getProducts();
    this.store.dispatch(loadProductBrands());
    this.store.dispatch(loadProducTypes());
    this.form = new FormGroup({
      searchInput: new FormControl()
    });
  }

  getProducts(): void {
    this.store.dispatch(loadProducts({payload: this.shopParams}));

    this.store.pipe(select(selectAllProducts)).subscribe(value => {
      this.products = value;
    });

    this.getProductBrands();
    this.getProductTypes();
  }

  getProductBrands(): void {
    this.store.select(selectAllProductBrands).subscribe(value => {
      this.productBrands = [{id: 0, name: 'All'}, ...value];
    });
  }

  getProductTypes(): void {
    this.store.select(selectAllProductTypes).subscribe(value => {
      this.productTypes = [{id: 0, name: 'All'}, ...value];
    });
  }

  onSelectProductBrand(brandId: number): void {
    this.shopParams = {...this.shopParams, brandId};
    this.getProducts();
  }

  onSelectProductType(typeId: number): void {
    this.shopParams = {...this.shopParams, typeId};
    this.getProducts();
  }

  onSortSelected($event: Event): void {
    this.shopParams = {...this.shopParams, sort: ($event.target as HTMLInputElement).value};
    this.getProducts();
  }

  onPageChanged(event: PageChangedEvent): void {
    this.shopParams = {...this.shopParams, pageIndex: event.page};
    this.getProducts();
  }

  onSearchInputChange(): void {
    console.log(this.form);
  }

  onReset(): void {
    this.getProducts();
  }

}
