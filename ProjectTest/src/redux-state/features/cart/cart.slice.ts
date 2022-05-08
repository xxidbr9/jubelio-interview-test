import { ProductListEntity } from "@domain/product/entities/iProductList.entity";
import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";


type ProductCart = ProductListEntity & { quantity: number }

type RdxCartState = {
  products?: ProductCart[]
}

const initialState: RdxCartState = {
  products: []
}

const cartSlice = createSlice({
  initialState,
  name: "cart",
  reducers: {
    setProductList(state, action: { payload: ProductListEntity, type: string }) {
      const finnedIndexProduct = state.products.findIndex(product => product.id === action.payload.id)
      if (finnedIndexProduct >= 0) {

        const tmp = state.products[finnedIndexProduct]

        state.products[finnedIndexProduct] = {
          ...tmp,
          quantity: tmp.quantity + 1
        }
        return state
      }

      state.products.push({ ...action.payload, quantity: 1 })

      return state
    },

    setQuantity(state, action: { payload: { id: string, quantity: number }, type: string }) {
      const finnedIndexProduct = state.products.findIndex(product => product.id === action.payload.id)
      const tmp = state.products[finnedIndexProduct]

      state.products[finnedIndexProduct] = {
        ...tmp,
        quantity: action.payload.quantity
      }

      return state
    },

    removeProduct(state, action: { payload: { id: string }, type: string }) {
      const finnedIndexProduct = state.products.findIndex(
        product => product.id === action.payload.id
      );

      state.products.splice(finnedIndexProduct, 1);

      // return not necessary
      return state
    }
  }
})


export const rdxCartActions = cartSlice.actions
export const rdxCartReducer = cartSlice.reducer

// redux persist
const screenPersistConfig = {
  storage,
  key: "cart"
};

export const rdxCartPersistReducer = persistReducer(screenPersistConfig, rdxCartReducer)
