import {createAction, props} from '@ngrx/store';
import {ProductType} from '../../shared/models/product-type';

export const loadProducTypes = createAction('[Product Type] Load Product Types');

export const loadProductTypesSuccess = createAction('[Product Type] Load Product Type Success',
  props<{ payload: ProductType[] }>()
);

export const loadProductTypesFail = createAction('[Product Type] Load Product Types Fail',
  props<{ payload: any }>()
);
