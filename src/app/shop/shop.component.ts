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
import {selectAllProducts} from '../store/selectors/product.selectors';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
  animations: [
    trigger('fade', [
      state('void', style({opacity: 0})),
      transition('void <=> *', [
        animate(200)
      ]),
    ])
  ]
})
export class ShopComponent implements OnInit {
  products: Product[];
  selectedProductBrandId = 0;
  selectedProductTypeId = 0;
  productBrands: ProductBrand[];
  productTypes: ProductType[];
  sortSelected = 'name';
  sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Low to High', value: 'priceAsc'},
    {name: 'Price: High to Low', value: 'priceDesc'},
  ];

  constructor(private store: Store<IAppState>) {
  }

  ngOnInit(): void {
    this.getProducts();
    this.store.dispatch(loadProductBrands());
    this.store.dispatch(loadProducTypes());
  }

  getProducts(): void {
    const productParam = new RequestParam();
    productParam.pageIndex = 1;
    productParam.pageSize = 50;
    productParam.brandId = this.selectedProductBrandId;
    productParam.typeId = this.selectedProductTypeId;
    productParam.sort = this.sortSelected;

    this.store.dispatch(loadProducts({payload: productParam}));

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
    this.selectedProductBrandId = brandId;
    this.getProducts();
  }

  onSelectProductType(typeId: number): void {
    this.selectedProductTypeId = typeId;
    this.getProducts();
  }

  onSortSelected($event: Event): void {
    this.sortSelected = ($event.target as HTMLInputElement).value;
    this.getProducts();
  }

}
