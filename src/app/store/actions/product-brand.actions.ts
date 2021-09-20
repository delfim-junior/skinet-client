import {createAction, props} from '@ngrx/store';
import {ProductBrand} from '../../shared/models/product-brand';

export const loadProductBrands = createAction('[Product Brand] Load Product Brands');

export const loadProductBrandsSuccess = createAction(
  '[Product Brand] Load Product Brand Success',
  props<{ payload: ProductBrand[] }>()
);

export const loadProductBrandsFail = createAction(
  '[Product Brand] Load Product Brand Success',
  props<{ payload: any }>()
);
