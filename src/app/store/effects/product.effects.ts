import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ApiService} from '../../services/api.service';
import * as ProductActons from '../actions/product.actions';
import {catchError, exhaustMap, map} from 'rxjs/operators';
import {Product} from '../../shared/models/products';
import {of} from 'rxjs';
import {ProductsPaginated} from '../../shared/models/products-paginated';
import {HttpParams} from '@angular/common/http';
import {Pagination} from '../../shared/models/pagination';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService
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
