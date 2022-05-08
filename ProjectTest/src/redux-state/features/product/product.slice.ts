import { ProductListEntity } from "@domain/product/entities/iProductList.entity"
import productListNetwork, { IProductListParams } from "@domain/product/network/productList.network"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

type RdxProductState = {
  products?: ProductListEntity[],
  page?: number,
  loading?: boolean,
  error?: any
}

const initialState: RdxProductState = {
  products: [],
  page: 0,
  loading: true
}

const fetchProductList = createAsyncThunk(
  'restaurant/fetchRestaurant',
  async (params: IProductListParams, _thunkAPI) => {
    try {
      const response = await productListNetwork(params)
      return {
        ...response.data.data,
        page: params.page,
      }
    } catch (err) {
      return {
        error: err
      }
    }
  }
)

const productSlice = createSlice({
  initialState,
  name: "product",
  reducers: {
    setProductList(state, action: { payload: RdxProductState, type: string }) {
      const newProductList = [...state.products, ...action.payload.products]
      return {
        ...state,
        products: newProductList
      }
    }
  },
  extraReducers: {
    // fetchProductList start
    [`${fetchProductList.pending}`]: (state) => {
      state.loading = true
    },
    [`${fetchProductList.fulfilled}`]: (state, action) => {
      const newProductList = state.products.concat(action.payload.products)
      return {
        ...state,
        products: newProductList,
        loading: false,
        page: action.payload.page,
      }
    },
    [`${fetchProductList.rejected}`]: (state, action) => {
      state.loading = false
      state.error = action.payload.error
    },
    // fetchProductList end
  }
})

export const rdxProductActions = productSlice.actions
export const rdxProductReducer = productSlice.reducer

export const rdxProductThunkActions = {
  fetchProductList
}