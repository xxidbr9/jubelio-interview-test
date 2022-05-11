import { ProductDetailEntity } from "@domain/product/entities/iProductDetail.entity"
import { ProductListEntity } from "@domain/product/entities/iProductList.entity"
import productDetailNetwork from "@domain/product/network/productDetail.network"
import productListNetwork, { IProductListParams } from "@domain/product/network/productList.network"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import colors from "@styles/colors"

type RdxProductState = {
  products?: ProductListEntity[]
  searchProducts?: ProductListEntity[],
  searchQuery?: string,
  detailProduct?: ProductDetailEntity
  page?: number
  loading?: boolean
  detailLoading?: boolean
  detailActiveIndex?: number
  error?: any
  detailError?: any
}

const initialState: RdxProductState = {
  products: [],
  searchProducts: [],
  page: 0,
  loading: true,
  detailLoading: true,
  detailActiveIndex: 0
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
        detailProduct: response.data.data.product,
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
    },

    setSearchProductQuery(state, action: { payload: RdxProductState, type: string }) {
      const searchQuery = action.payload.searchQuery
      return {
        ...state,
        searchQuery,
      }
    },
    setDetailActiveIndex(state, action: { payload: RdxProductState, type: string }) {
      return {
        ...state,
        detailActiveIndex: action.payload.detailActiveIndex
      }
    },
    setLoading(state, action: { payload: RdxProductState, type: string }) {
      return {
        ...state,
        loading: action.payload.loading
      }
    },
    setSearchProductListSaga(state, action: { payload: RdxProductState, type: string }) {
      return {
        ...state,
        searchProducts: action.payload.searchProducts
      }
    },
    sortBy(state, action: { payload: { sort: "price" | "name", order: "desc" | "asc" }, type: string }) {
      switch (action.payload.sort) {
        case "price": {
          if (action.payload.order === "asc") {
            state.products.sort((a, b) => a.price - b.price)
          } else if (action.payload.order === "desc") {
            state.products.sort((a, b) => b.price - a.price)
          }
          return state
        }

        case "name": {
          if (action.payload.order === "asc") {
            state.products.sort((a, b) => {
              if (a.name < b.name) return -1;
              if (a.name > b.name) return 1;
              return 0
            })
            return state


          } else if (action.payload.order === "desc") {
            state.products.sort((a, b) => {
              if (a.name < b.name) return 1;
              if (a.name > b.name) return -1;
              return 0
            })
            return state
          }
        }

        default:
          return state
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
      const productPayload = action.payload.detailProduct
      // const finnedProductDetail = state.detailProducts.findIndex((prod) => prod.id === productPayload.id)
      // const newDetailsProduct = finnedProductDetail < 0 ? [...state.detailProducts, productPayload] : state.detailProducts

      return {
        ...state,
        detailProduct: productPayload,
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