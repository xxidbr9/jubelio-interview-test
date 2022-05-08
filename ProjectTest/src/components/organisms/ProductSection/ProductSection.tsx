import Container from '@atoms/Container'
import Loader from '@atoms/Loader'
import { RoutesType } from '@constants/routes.constant'
import { ProductListEntity } from '@domain/product/entities/iProductList.entity'
import { createSlugLink } from '@helpers/slugGenerator.helper'
import ProductCard from '@molecules/Card/ProductCard'
import React from 'react'
import InfiniteScroll from 'react-infinite-scroller'

type ProductType = ProductListEntity & { quantity: number }

type Props = {
  onLoadMore: () => void
  hasMore: boolean
  products: ProductType[]
  onCartClick: (product: ProductListEntity) => void
  title?: string
}

const ProductSection = (props: Props) => {
  const { products } = props
  return (
    <main className={""}>
      <Container className='mb-4'>
        <div className=''>
          <h1 className='text-xl font-medium'>{props.title || "Shop All Product"}</h1>
        </div>
      </Container>

      <InfiniteScroll
        pageStart={0}
        loadMore={props.onLoadMore}
        hasMore={props.hasMore}
        useWindow={true}
        loader={<Loader key={0} />}
        className="mt-4"

      >
        <Container>
          <div className='grid desktop:grid-cols-4 laptop:grid-cols-2 tablet:grid-cols-3 tablet:gap-x-6 mobile:grid-cols-2 laptop:gap-x-6 laptop:gap-y-8 mobile:gap-y-4 mobile:gap-x-4'>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                data={{ ...product, slug: createSlugLink(RoutesType.HOME, product.name, product.id), quantity: product.quantity }}
                onCartClick={props.onCartClick}
              />
            ))}
          </div>
          {!props.hasMore && (
            <div className='my-10 text-center'>
              You reach the end, can&apos;t find what you need?
            </div>
          )}
        </Container>
      </InfiniteScroll>
    </main>
  )
}

export default ProductSection