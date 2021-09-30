import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Product} from '../../shared/models/products';
import {Action, createReducer, on} from '@ngrx/store';

import * as ProductActions from '../actions/product.actions';

export interface IProductState extends EntityState<Product> {
  selectedProductId: number | null;
  isLoading: boolean;
  isSaving: boolean;
  errorMessage: string;
  successMessage: string;
  errors: any;
  selectedProduct: Product;
  pageIndex: number;
  pageSize: number;
  count: number;
  basketList: Product[];
  payed: boolean;
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
  pageIndex: 0,
  pageSize: 0,
  count: 0,
  basketList: [],
  payed: false
});

const reducer = createReducer(
  initialState,
  on(ProductActions.loadProducts, (state) => {
    return {...state};
  }),
  on(ProductActions.loadProductsSuccess, (state, {payload}) => {
    return adapter.setAll(payload.data, {
      ...state,
      isLoading: false,
      pageSize: payload.pageSize,
      pageIndex: payload.pageIndex,
      count: payload.count
    });
  }),
  on(ProductActions.loadProductsFail, (state, {payload}) => {
    return {...state, errorMessage: payload};
  }),
  on(ProductActions.loadProductById, (state) => {
    return {...state};
  }),
  on(ProductActions.loadProductByIdSuccess, (state, {payload}) => {
    return {...state, selectedProduct: payload, isLoading: false};
  }),
  on(ProductActions.loadProductByIdFail, (state, {payload}) => {
    return {...state, errorMessage: payload};
  }),
  on(ProductActions.addProductToBasket, (state, {payload}) => {
    const temp = [...state.basketList];
    temp.push(payload);
    return {...state, basketList: temp};
  }),
  on(ProductActions.sendPayment, (state) => {
    return {...state, isSaving: true};
  }),
  on(ProductActions.sendPaymentSuccess, (state, {payload}) => {
    return {...state, isSaving: false, payed: payload.totalPrice > 0};
  }),
  on(ProductActions.sendPaymentFail, (state, {payload}) => {
    return {...state, isSaving: false, payed: payload.totalPrice > 0};
  }),
);

export function productReducer(
  state: IProductState | undefined,
  action: Action
): IProductState {
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
export const getIsSaving = (state: IProductState) => state.isSaving;
export const getSelectedProduct = (state: IProductState) => state.selectedProduct;
export const getPageSize = (state: IProductState) => state.pageSize;
export const getPageIndex = (state: IProductState) => state.pageIndex;
export const getTotalCount = (state: IProductState) => state.count;
export const getBasketList = (state: IProductState) => state.basketList;
export const getPaymentStatus = (state: IProductState) => state.payed;
