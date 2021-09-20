import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Product} from '../../shared/models/products';
import {Action, createReducer, on} from '@ngrx/store';

import * as ProductActions from '../actions/product.actions';
import {ProductsPaginated} from '../../shared/models/products-paginated';

export interface IProductState extends EntityState<Product> {
  selectedProductId: number | null;
  isLoading: boolean;
  isSaving: boolean;
  errorMessage: string;
  successMessage: string;
  errors: any;
  selectedProduct: Product;
  paginatedProducts: ProductsPaginated;
}

export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>();

export const initialState: IProductState = adapter.getInitialState({
  selectedProductId: null,
  isLoading: false,
  isSaving: false,
  errorMessage: '',
  successMessage: '',
  errors: null,
  selectedProduct: null,
  paginatedProducts: null
});

const reducer = createReducer(
  initialState,
  on(ProductActions.loadProducts, (state) => {
    return {...state};
  }),
  on(ProductActions.loadProductsSuccess, (state, {payload}) => {
    return adapter.setAll(payload, state);
  }),
  on(ProductActions.loadProductsFail, (state, {payload}) => {
    return {...state, errorMessage: payload};
  }),
  on(ProductActions.loadPaginatedProducts, (state) => {
    return {...state};
  }),
  on(ProductActions.loadPaginatedProductsSuccess, (state, {payload}) => {
    /*  const paginatedProducts = {...state.paginatedProducts};
      paginatedProducts.pageIndex = payload.pageIndex;
      paginatedProducts.pageSize = payload.pageSize;
      paginatedProducts.data = [...state.paginatedProducts.data, payload.data];*/
    return {...state, paginatedProducts: payload};
  }),
  on(ProductActions.loadPaginatedProductsFail, (state, {payload}) => {
    return {...state, errorMessage: payload};
  })
);

export function productReducer(
  state: IProductState | undefined,
  action: Action
) {
  return reducer(state, action);
}

export const getSelectedProductId = (state: IProductState) => state.selectedProductId;

// Get the Selectors

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();

// select the array of product ids
export const selectProductIds = selectIds;

// select the dictionary of product entities
export const selectProductEntities = selectEntities;

// select the array of product
export const selectAllProduct = selectAll;

// select the total Product count
export const selectProductTotal = selectTotal;

export const getErrors = (state: IProductState) => state.errors;
export const getIsLoading = (state: IProductState) => state.isLoading;
export const getSelectedProduct = (state: IProductState) => state.selectedProduct;
export const getPaginatedProducts = (state: IProductState) => state.paginatedProducts;

