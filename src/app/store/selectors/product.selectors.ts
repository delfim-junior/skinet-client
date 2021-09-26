import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromProduct from '../reducers/product.reducer';

export const ProductState = createFeatureSelector<fromProduct.IProductState>('product');

export const selectAllProducts = createSelector(
  ProductState,
  fromProduct.selectAllProduct
);

export const selectedProduct = createSelector(
  ProductState,
  fromProduct.getSelectedProduct
);

export const selectErrors = createSelector(
  ProductState,
  fromProduct.getErrors
);

export const selectLoading = createSelector(
  ProductState,
  fromProduct.getIsLoading
);

export const selectPageIndex = createSelector(
  ProductState,
  fromProduct.getPageIndex
);

export const selectPageSize = createSelector(
  ProductState,
  fromProduct.getPageSize
);

export const selectTotalCount = createSelector(
  ProductState,
  fromProduct.getTotalCount
);
