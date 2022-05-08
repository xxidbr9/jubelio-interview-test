
import { rdxCartSelector } from "@rdxFeatures/cart"
import { RootState } from "@redux-state/index"
import { createSelector } from "@reduxjs/toolkit"
import _ from "lodash"

export const rdxProductState = (state: RootState) => state.productReducer
export const getAllProduct = createSelector(rdxProductState, state => state.products)
export const isLoading = createSelector(rdxProductState, state => state.loading)


export const getAllProductWithCartQuantity = createSelector([rdxProductState, rdxCartSelector.rdxProductCartState], (base, cart) => {
  const result = base.products.map(product => {
    const indexCartItem = cart.products.findIndex(el => el["id"] === product["id"]);
    const quantity = cart.products[indexCartItem]?.quantity
    return {
      ...product,
      quantity: !!quantity ? quantity : 0
    }
  });
  return result
})
