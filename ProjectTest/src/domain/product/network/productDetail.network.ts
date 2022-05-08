import appAxios from "@libs/axios"
import { NetworkPromise } from "@utils/types/network"
import { ProductDetailEntity } from "../entities/iProductDetail.entity"


function productDetailNetwork(id: string): NetworkPromise<{ product: ProductDetailEntity }> {
  return appAxios({
    url: `/api/product/${id}`,
    method: "GET",
  })
}

export default productDetailNetwork