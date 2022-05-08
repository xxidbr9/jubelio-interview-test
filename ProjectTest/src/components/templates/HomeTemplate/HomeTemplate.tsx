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
import ProductSection from "@organisms/ProductSection"




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
      return
    }
    setIsDrawerOpen(true)
  }

  const _handleCartProductClick = (product: ProductListEntity) => {
    setIsDrawerOpen(true)
    dispatch(rdxCartActions.setProductList(product))
  }


  const _handleDrawerClose = () => setIsDrawerOpen(false)

  const hasMore = rdxProductsState.page < 4


  return (
    <React.Fragment>
      <Navbar drawerOpen={isDrawerOpen} onCartClick={_handleCartClick} onDrawerClose={_handleDrawerClose} />
      <ProductSection hasMore={hasMore} onLoadMore={_handleNext} onCartClick={_handleCartProductClick} products={products} />
    </React.Fragment>
  )
}





export default HomeTemplate