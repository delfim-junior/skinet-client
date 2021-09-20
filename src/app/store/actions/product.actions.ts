import {createAction, props} from '@ngrx/store';
import {Product} from '../../shared/models/products';
import {ProductsPaginated} from '../../shared/models/products-paginated';
import {Pagination} from '../../shared/models/pagination';

export const loadProducts = createAction('[Product] Load Products');

export const loadProductsSuccess = createAction('[Product] Load Products Success',
  props<{ payload: Product[] }>());

export const loadProductsFail = createAction(
  '[Product] Load Products Fail',
  props<{ payload: any }>());

export const loadPaginatedProducts = createAction(
  '[Product] Load Paginated Products',
  props<{ payload: Pagination }>()
);

export const loadPaginatedProductsSuccess = createAction(
  '[Product] Load Paginated Products Success',
  props<{ payload: ProductsPaginated }>());

export const loadPaginatedProductsFail = createAction(
  '[Product] Load Paginated Products Fail',
  props<{ payload: any }>());

export const addProduct = createAction(
  '[Product] Add Product',
  props<{ payload: Product }>()
);

export const addProductSuccess = createAction(
  '[Product] Add Product Success',
  props<{ payload: Product }>()
);

export const addProductFail = createAction(
  '[Product] Add Product Fail',
  props<{ payload: any }>()
);
