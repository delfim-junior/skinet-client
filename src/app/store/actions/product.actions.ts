import {createAction, props} from '@ngrx/store';
import {Product} from '../../shared/models/products';
import {RequestParam} from '../../shared/models/request-param';
import {Pagination} from '../../shared/models/pagination';

export const loadProducts = createAction(
  '[Product] Load Products',
  props<{ payload: RequestParam }>()
);

export const loadProductsSuccess = createAction('[Product] Load Products Success',
  props<{ payload: Pagination<Product[]> }>());

export const loadProductsFail = createAction(
  '[Product] Load Products Fail',
  props<{ payload: any }>());

/*export const loadPaginatedProducts = createAction(
  '[Product] Load Paginated Products',
  props<{ payload: RequestParam }>()
);

export const loadPaginatedProductsSuccess = createAction(
  '[Product] Load Paginated Products Success',
  props<{ payload: Pagination<Product[]> }>());

export const loadPaginatedProductsFail = createAction(
  '[Product] Load Paginated Products Fail',
  props<{ payload: any }>());*/

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
