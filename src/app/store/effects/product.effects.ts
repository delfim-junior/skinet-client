import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ApiService} from '../../services/api.service';
import * as ProductActons from '../actions/product.actions';
import {catchError, exhaustMap, map} from 'rxjs/operators';
import {Product} from '../../shared/models/products';
import {of} from 'rxjs';
import {Pagination} from '../../shared/models/pagination';
import {AlertifyService} from '../../services/alertify.service';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private alertifyService: AlertifyService
  ) {
  }

  loadProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActons.loadProducts),
      exhaustMap(action =>
        this.apiService.get<Pagination<Product[]>>('/Products', action.payload).pipe(
          map((products) => {
              return ProductActons.loadProductsSuccess({payload: products});
            }
          ),
          catchError(err => of(ProductActons.loadProductsFail({payload: err})))
        ))
    )
  );

  loadProductById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActons.loadProductById),
      exhaustMap(action =>
        this.apiService.get<Product>(`/Products/${action.payload}`).pipe(
          map(product => ProductActons.loadProductByIdSuccess({payload: product})),
          catchError(err => of(ProductActons.loadProductByIdFail({payload: err})))
        ))
    )
  );

  pay = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActons.sendPayment),
      exhaustMap(action =>
        this.apiService.post<Product>(`/Products/pay`, action.payload).pipe(
          map(product => ProductActons.sendPaymentSuccess({payload: product})),
          catchError(err => of(ProductActons.sendPaymentFail({payload: err})))
        ))
    )
  );

  /*  loadPaginatedProduct$ = createEffect(() =>
      this.actions$.pipe(
        ofType(ProductActons.loadPaginatedProducts),
        exhaustMap(action => {
            return this.apiService.get<ProductsPaginated>('/Products', action.payload).pipe(
              map((paginatedProducts) => {
                  console.log(paginatedProducts);
                  return ProductActons.loadPaginatedProductsSuccess({payload: paginatedProducts});
                }
              ),
              catchError(err => of(ProductActons.loadPaginatedProductsFail({payload: err})))
            );
          }
        )
      )
    );*/
}
