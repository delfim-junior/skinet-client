import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromProductBrand from '../reducers/product-brand.reducer';

export const ProductBrandState = createFeatureSelector<fromProductBrand.IProductBrandState>('productBrand');

export const selectAllProductBrands = createSelector(
  ProductBrandState,
  fromProductBrand.selectAllProductBrand
);

export const selectErrors = createSelector(
  ProductBrandState,
  fromProductBrand.getErrors,
);

export const selectIsLoading = createSelector(
  ProductBrandState,
  fromProductBrand.getLoading
);

