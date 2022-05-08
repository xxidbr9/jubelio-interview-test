import Container from "@atoms/Container"
import Loader from "@atoms/Loader"
import ROUTES_CONSTANT, { RoutesType } from "@constants/routes.constant"
import { ProductListEntity } from "@domain/product/entities/iProductList.entity"
import { createSlugLink } from "@helpers/slugGenerator.helper"
import ProductCard from "@molecules/Card/ProductCard"
import { rdxCartActions, rdxCartSelector } from "@rdxFeatures/cart"
import { rdxProductSelector, rdxProductThunkActions } from "@rdxFeatures/product"
import { screenSelector } from "@rdxFeatures/screen"
import React, { useState } from "react"
import InfiniteScroll from "react-infinite-scroller"
import { useSelector, useDispatch } from "react-redux"
import { useEffectOnce } from "react-use"
import { HomeTemplateProps } from "./HomeTemplate.props"
import Navbar from "@organisms/Navbar"
import { useRouter } from "next/router"




const HomeTemplate: React.FC<HomeTemplateProps> = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const router = useRouter()
  const isMobile = useSelector(screenSelector.isMobile)
  const rdxProductsState = useSelector(rdxProductSelector.rdxProductState)
  const rdxProductWithCartQuantity = useSelector(rdxProductSelector.getAllProductWithCartQuantity)
  const products = rdxProductWithCartQuantity


  const dispatch = useDispatch()

  useEffectOnce(() => {
    dispatch(rdxProductThunkActions.fetchProductList({ page: 1 }))
  })


  const _handleNext = () => {
    if (rdxProductsState.loading) {
      return
    }
    setTimeout(() => {
      const nextPage = rdxProductsState.page + 1
      dispatch(rdxProductThunkActions.fetchProductList({ page: nextPage }))
    }, 1000) // to fast for fetch
  }

  const _handleCartClick = () => {
    if (isMobile) {
      router.push(ROUTES_CONSTANT.CART)
    }
    setIsDrawerOpen(true)
  }

  const _handleCartProductClick = (product: ProductListEntity) => {
    setIsDrawerOpen(true)
    dispatch(rdxCartActions.setProductList(product))
    // window.history.pushState({}, "", ROUTES_CONSTANT.CART)
  }


  const _handleDrawerClose = () => {
    setIsDrawerOpen(false)
    // window.history.replaceState({}, "", ROUTES_CONSTANT.HOME)
  }



  const hasMore = rdxProductsState.page < 4


  return (
    <React.Fragment>
      <Navbar drawerOpen={isDrawerOpen} onCartClick={_handleCartClick} onDrawerClose={_handleDrawerClose} />

      <main className={""}>
        <Container className='mb-4'>
          <div className=''>
            <h1 className='text-xl font-medium'>Shop All Product</h1>
          </div>
        </Container>

        <InfiniteScroll
          pageStart={0}
          loadMore={_handleNext}
          hasMore={hasMore}
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
                  onCartClick={_handleCartProductClick}
                />
              ))}
            </div>
            {!hasMore && (
              <div className='my-10 text-center'>
                You reach the end, can&apos;t find what you need?
              </div>
            )}
          </Container>
        </InfiniteScroll>
      </main>

    </React.Fragment>
  )
}





export default HomeTemplate