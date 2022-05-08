import type { ProductListEntity } from "@domain/product/entities/iProductList.entity"

type ProductType = ProductListEntity & { slug?: string, quantity?: number }
export type ProductCardProps = {
  data: ProductType
  onProductClick?: (id: string) => void
  onCartClick?: (product: ProductListEntity) => void
  otherProducts?: ProductType[]
}


