import * as ProductBrandActions from '../actions/product-brand.actions';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {ProductBrand} from '../../shared/models/product-brand';
import {Action, createReducer, on} from '@ngrx/store';

export interface IProductBrandState extends EntityState<ProductBrand> {
  selectProductBrandId: number | null;
  isLoading: boolean;
  isSaving: boolean;
  errorMessage: string;
  successMessage: string;
  errors: any;
  selectedProductBrand: ProductBrand;
}

export const adapter: EntityAdapter<ProductBrand> = createEntityAdapter<ProductBrand>();

export const initialState: IProductBrandState = adapter.getInitialState({
  selectProductBrandId: null,
  isLoading: false,
  isSaving: false,
  errorMessage: '',
  successMessage: '',
  errors: null,
  selectedProductBrand: null
});

const reducer = createReducer(
  initialState,
  on(ProductBrandActions.loadProductBrands, (state) => {
    return {...state};
  }),
  on(ProductBrandActions.loadProductBrandsSuccess, (state, {payload}) => {
    return adapter.setAll(payload, state);
  }),
  on(ProductBrandActions.loadProductBrandsFail, (state, {payload}) => {
    return {...state, errorMessage: payload};
  }));

// returning the reducer
export function productBrandReducer(
  state: IProductBrandState | undefined,
  action: Action
): IProductBrandState {
  return reducer(state, action);
}

// get the selectors
const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();

export const selectProductBrandIds = selectIds;

export const selectProductBrandEntities = selectEntities;

export const selectAllProductBrand = selectAll;

export const selectProductBrandTotal = selectTotal;

export const getSelectProducBrandId = (state: IProductBrandState) => state.selectProductBrandId;
export const getErrors = (state: IProductBrandState) => state.errors;
export const getLoading = (state: IProductBrandState) => state.isLoading;



