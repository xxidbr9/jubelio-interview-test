import { ProductDetailEntity } from "@domain/product/entities/iProductDetail.entity"
import { ProductListEntity } from "@domain/product/entities/iProductList.entity"
import productDetailNetwork from "@domain/product/network/productDetail.network"
import productListNetwork, { IProductListParams } from "@domain/product/network/productList.network"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

type RdxProductState = {
  products?: ProductListEntity[]
  detailProducts?: ProductDetailEntity[]
  page?: number
  loading?: boolean
  detailLoading?: boolean
  error?: any
  detailError?: any
}

const initialState: RdxProductState = {
  products: [],
  page: 0,
  loading: true,
  detailProducts: [],
  detailLoading: true
}

const fetchProductList = createAsyncThunk(
  'product/fetchProductList',
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

const fetchProductDetail = createAsyncThunk(
  'product/fetchProductDetail',
  async (id: string, _thunkAPI) => {
    try {
      const response = await productDetailNetwork(id)
      return {
        detailProduct: response.data.data,
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

    // fetchProductDetail start
    [`${fetchProductDetail.pending}`]: (state) => {
      state.detailLoading = true
    },
    [`${fetchProductDetail.fulfilled}`]: (state, action) => {
      const newDetailsProduct = [...state.detailProducts, action.payload.detailProduct]
      return {
        ...state,
        detailProducts: newDetailsProduct,
        detailLoading: false
      }
    },
    [`${fetchProductDetail.rejected}`]: (state, action) => {
      state.detailLoading = false
      state.detailError = action.payload.error
    },
    // fetchProductDetail end
  }
})

export const rdxProductActions = productSlice.actions
export const rdxProductReducer = productSlice.reducer

export const rdxProductThunkActions = {
  fetchProductList,
  fetchProductDetail
}