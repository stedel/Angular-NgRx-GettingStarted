import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { ProductService } from '../product.service';
import { mergeMap, map, catchError } from 'rxjs/operators';
import * as productActions from './product.actions';
import { of } from 'rxjs';

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
  updateProduct$ = this.actions$.pipe(
    ofType(productActions.ProductActionTypes.UpdateProduct),
    map((action: productActions.UpdateProduct) => action.payload),
    mergeMap(product =>
      this.productService.updateProduct(product).pipe(
        map(updated => new productActions.UpdateProductSuccess(updated)),
        catchError(err => of(new productActions.UpdateProductFail(err))),
      ),
    ),
  );

  @Effect()
  deleteProduct$ = this.actions$.pipe(
    ofType(productActions.ProductActionTypes.DeleteProduct),
    map((action: productActions.DeleteProduct) => action.payload),
    mergeMap(productId =>
      this.productService.deleteProduct(productId).pipe(
        map(() => new productActions.DeleteProductSuccess(productId)),
        catchError(err => of(new productActions.DeleteProductFail(err))),
      ),
    ),
  );

  @Effect()
  createProduct$ = this.actions$.pipe(
    ofType(productActions.ProductActionTypes.CreateProduct),
    map((action: productActions.CreateProduct) => action.payload),
    mergeMap(newProduct =>
      this.productService.createProduct(newProduct).pipe(
        map(created => new productActions.CreateProductSuccess(created)),
        catchError(err => of(new productActions.CreateProductFail(err))),
      ),
    ),
  );
}
