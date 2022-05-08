
import { RootState } from "@redux-state/index"
import { createSelector } from "@reduxjs/toolkit"

export const rdxProductState = (state: RootState) => state.productReducer
export const getAllProduct = createSelector(rdxProductState, state => state.products)
export const isLoading = createSelector(rdxProductState, state => state.loading)
