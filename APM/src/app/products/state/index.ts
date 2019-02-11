import * as fromRoot from '../../state/app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromProduct from './product.reducer';

export interface State extends fromRoot.State {
  products: fromProduct.ProductState;
}

const getProductFeatureState = createFeatureSelector<fromProduct.ProductState>('products');

export const getShowProductCode = createSelector(
  getProductFeatureState,
  state => state.showProductCode,
);

export const getCurrentProductId = createSelector(
  getProductFeatureState,
  state => state.currentProductId,
);

export const getCurrentProduct = createSelector(
  getProductFeatureState,
  getCurrentProductId,
  (state, currentProductId) => {
    if (currentProductId === 0) {
      return {
        id: 0,
        productName: '',
        productCode: 'New',
        description: '',
        starRating: 0,
      };
    } else {
      return currentProductId ? state.products.find(p => p.id === currentProductId) : null;
    }
  },
);

export const getProducts = createSelector(
  getProductFeatureState,
  state => state.products,
);

export const getError = createSelector(
  getProductFeatureState,
  state => state.error,
);
