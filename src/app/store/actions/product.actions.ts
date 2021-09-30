import {createAction, props} from '@ngrx/store';
import {Product} from '../../shared/models/products';
import {RequestParam} from '../../shared/models/request-param';
import {Pagination} from '../../shared/models/pagination';
import {PaymentRequest} from '../../shared/models/payment-request';

export const loadProducts = createAction(
  '[Product] Load Products',
  props<{ payload: RequestParam }>()
);

export const loadProductsSuccess = createAction(
  '[Product] Load Products Success',
  props<{ payload: Pagination<Product[]> }>()
);

export const loadProductsFail = createAction(
  '[Product] Load Products Fail',
  props<{ payload: any }>());

export const loadProductById = createAction(
  '[Product] Load Product By Id',
  props<{ payload: number }>()
);

export const loadProductByIdSuccess = createAction(
  '[Product] Load Product By Id Success',
  props<{ payload: Product }>()
);

export const loadProductByIdFail = createAction(
  '[Product] Load Product By Id Fail',
  props<{ payload: any }>()
);

export const addProductToBasket = createAction(
  '[Product] Add to Basket',
  props<{ payload: Product }>()
);

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

export const sendPayment = createAction(
  '[Product] Send Payment',
  props<{payload: PaymentRequest}>()
);

export const sendPaymentSuccess = createAction(
  '[Product] Send Payment Success',
  props<{payload: PaymentRequest}>()
);

export const sendPaymentFail = createAction(
  '[Product] Send Payment Fail',
  props<{payload: any}>()
);
