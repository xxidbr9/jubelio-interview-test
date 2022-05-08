
import { RootState } from "@redux-state/index"
import { createSelector } from "@reduxjs/toolkit"

export const rdxProductCartState = (state: RootState) => state.cartReducer
export const getAllProductInCart = createSelector(rdxProductCartState, state => state.products)
export const totalInCart = createSelector(rdxProductCartState, state => state.products.length)
export const totalPayment = createSelector(rdxProductCartState, state => {
  const total = state.products.reduce((f, n) => {
    const sum = n.price * n.quantity
    return f + sum
  }, 0)

  return total
})