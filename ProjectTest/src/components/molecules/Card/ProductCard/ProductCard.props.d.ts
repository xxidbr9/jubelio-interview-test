import type { ProductListEntity } from "@domain/product/entities/iProductList.entity"

export type ProductCardProps = {
  data: ProductListEntity & { slug?: string }
  onProductClick?: (id: string) => void
  onCartClick?: (product: ProductListEntity) => void
}


