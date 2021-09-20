import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromProductType from '../reducers/product-type.reducer'

export const ProductTypeState = createFeatureSelector<fromProductType.IProductTypeState>('productType');

export const selectAllProductTypes = createSelector(
  ProductTypeState,
  fromProductType.selectAllProductTypes
);

export const selectLoading = createSelector(
  ProductTypeState,
  fromProductType.getLoading
);

