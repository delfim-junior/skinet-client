import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as ProductTypeActions from '../actions/product-type.actions';
import {ApiService} from '../../services/api.service';
import {catchError, exhaustMap, map} from 'rxjs/operators';
import {ProductType} from '../../shared/models/product-type';
import {of} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class ProductTypeEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
  ) {
  }

  loadProductTypes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductTypeActions.loadProducTypes),
      exhaustMap(action =>
        this.apiService.get<ProductType[]>('/Products/types').pipe(
          map((productTypes) => ProductTypeActions.loadProductTypesSuccess({payload: productTypes})),
          catchError(err => of(ProductTypeActions.loadProductTypesFail({payload: err})))
        )
      )
    )
  );
}
