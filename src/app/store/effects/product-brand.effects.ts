import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ApiService} from '../../services/api.service';
import {Store} from '@ngrx/store';
import {IAppState} from '../reducers';
import * as ProductBrandActions from '../actions/product-brand.actions';
import {catchError, exhaustMap, map} from 'rxjs/operators';
import {ProductBrand} from '../../shared/models/product-brand';
import {of} from 'rxjs';


@Injectable()
export class ProductBrandEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private store: Store<IAppState>
  ) {
  }

  loadProductBrands$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductBrandActions.loadProductBrands),
      exhaustMap(action =>
        this.apiService.get<ProductBrand[]>('/Products/brands').pipe(
          map((productBrands) => {
            return ProductBrandActions.loadProductBrandsSuccess({payload: productBrands});
          }),
          catchError(err => of(ProductBrandActions.loadProductBrandsFail({payload: err})))
        ))
    ));
}
