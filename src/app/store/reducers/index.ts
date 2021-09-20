import {IProductState, productReducer} from './product.reducer';
import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {environment} from '../../../environments/environment';
import {IProductBrandState, productBrandReducer} from './product-brand.reducer';
import {IProductTypeState, productTypeReducer} from './product-type.reducer';

export interface IAppState {
  product?: IProductState;
  productBrand?: IProductBrandState;
  productType?: IProductTypeState;
}

export const reducers: ActionReducerMap<IAppState> = {
  product: productReducer,
  productBrand: productBrandReducer,
  productType: productTypeReducer,
};

export const metaReducers: MetaReducer<IAppState>[] = !environment.production
  ? []
  : [];
