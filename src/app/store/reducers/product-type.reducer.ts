import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {ProductType} from '../../shared/models/product-type';
import {Action, createReducer, on} from '@ngrx/store';
import * as ProductTypeActions from '../actions/product-type.actions';

export interface IProductTypeState extends EntityState<ProductType> {
  selectedProductTypeId: number | null,
  isLoading: boolean;
  isSaving: boolean;
  errorMessage: string;
  successMessage: string;
  errors: any;
  selectedProductType: ProductType;
}

export const adapter: EntityAdapter<ProductType> = createEntityAdapter<ProductType>();

export const initialState: IProductTypeState = adapter.getInitialState({
  selectedProductTypeId: null,
  isLoading: false,
  isSaving: false,
  errorMessage: '',
  successMessage: '',
  errors: null,
  selectedProductType: null,
});

const reducer = createReducer(
  initialState,
  on(ProductTypeActions.loadProducTypes, (state) => {
    return {...state};
  }),
  on(ProductTypeActions.loadProductTypesSuccess, (state, {payload}) => {
    return adapter.setAll(payload, state);
  }),
  on(ProductTypeActions.loadProductTypesFail, (state, {payload}) => {
    return {...state, errorMessage: payload};
  })
);

// returning the reducer
export function productTypeReducer(
  state: IProductTypeState | undefined,
  action: Action
): IProductTypeState {
  return reducer(state, action);
}

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

export const selectProductTypeIds = selectIds;
export const selectProductTypeEntities = selectEntities;
export const selectAllProductTypes = selectAll;
export const selectTotalProductTypes = selectTotal;

export const getSelectedProductType = (state: IProductTypeState) => state.selectedProductType;
export const getErrors = (state: IProductTypeState) => state.errors;
export const getLoading = (state: IProductTypeState) => state.isLoading;
