import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { ProductService } from '../product.service';
import { mergeMap, map, catchError } from 'rxjs/operators';
import * as productActions from './product.actions';
import { of, Observable } from 'rxjs';
import { Action } from '@ngrx/store';

@Injectable()
export class ProductEffects {
  constructor(private actions$: Actions, private productService: ProductService) {}

  @Effect()
  loadProducts$ = this.actions$.pipe(
    ofType(productActions.ProductActionTypes.Load),
    mergeMap(action =>
      this.productService.getProducts().pipe(
        map(products => new productActions.LoadSuccess(products)),
        catchError(err => of(new productActions.LoadFail(err))),
      ),
    ),
  );

  @Effect()
  updateProduct$: Observable<Action> = this.actions$.pipe(
    ofType(productActions.ProductActionTypes.UpdateProduct),
    map((action: productActions.UpdateProduct) => action.payload),
    mergeMap(product =>
      this.productService.updateProduct(product).pipe(
        map(updated => new productActions.UpdateProductSuccess(updated)),
        catchError(err => of(new productActions.UpdateProductFail(err))),
      ),
    ),
  );
}
