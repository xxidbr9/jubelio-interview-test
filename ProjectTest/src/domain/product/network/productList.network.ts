import appAxios from "@libs/axios"
import { NetworkPromise } from "@utils/types/network"
import { ProductListEntity } from "../entities/iProductList.entity"

export type IProductListParams = {
  page?: number
}

type Response = {
  products: ProductListEntity[]
}

function productListNetwork(params: IProductListParams): NetworkPromise<Response> {
  return appAxios({
    params,
    url: "/api/product",
    method: "GET",
  })
}

export default productListNetwork