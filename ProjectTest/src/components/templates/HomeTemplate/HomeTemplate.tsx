import CloseIcon from "@assets/svg/Close.icon"
import Container from "@atoms/Container"
import Drawer from "@atoms/Drawer"
import Loader from "@atoms/Loader"
import ROUTES_CONSTANT, { RoutesType } from "@constants/routes.constant"
import { ProductListEntity } from "@domain/product/entities/iProductList.entity"
import moneyFormatter from "@helpers/moneyFormatter.helper"
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
import Image from 'next/image'
import TrashIcon from "@assets/svg/Trash.svg"
import colors from "@styles/colors"
import styled from "@emotion/styled"
import tw from "twin.macro"
import Button from "@atoms/Button"

const ButtonCart = styled.button`
  font-size: 24px;
  ${tw`text-gray-600`}
`

const HomeTemplate: React.FC<HomeTemplateProps> = (props) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const isMobile = useSelector(screenSelector.isMobile)
  const rdxProductsState = useSelector(rdxProductSelector.rdxProductState)
  const rdxProductWithCartQuantity = useSelector(rdxProductSelector.getAllProductWithCartQuantity)
  const products = rdxProductWithCartQuantity


  const totalPayment = useSelector(rdxCartSelector.totalPayment)
  const rdxProductInCart = useSelector(rdxCartSelector.getAllProductInCart)


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

  const _handleCartClick = (product: ProductListEntity) => {
    setIsDrawerOpen(true)
    dispatch(rdxCartActions.setProductList(product))
    // window.history.pushState({}, "", ROUTES_CONSTANT.CART)
  }

  const _handleDrawerClose = () => {
    setIsDrawerOpen(false)
    // window.history.replaceState({}, "", ROUTES_CONSTANT.HOME)
  }

  const _handleSubQuantity = (id: string) => {
    const finnedProduct = rdxProductInCart.find(product => product.id === id)
    if (finnedProduct.quantity > 1) {
      const quantity = finnedProduct.quantity - 1
      dispatch(rdxCartActions.setQuantity({ id, quantity }))
    } else {
      dispatch(rdxCartActions.removeProduct({ id }))
    }
  }

  const _handleAddQuantity = (id: string) => {
    const finnedProduct = rdxProductInCart.find(product => product.id === id)
    const quantity = finnedProduct.quantity + 1
    dispatch(rdxCartActions.setQuantity({ id, quantity }))
  }

  const _handleRemoveClick = (id: string) => {
    dispatch(rdxCartActions.removeProduct({ id }))
  }


  const hasMore = rdxProductsState.page < 4

  return (
    <React.Fragment>
      <main className={`${isDrawerOpen ? "overflow-hidden" : "overflow-auto"}`}>
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
                  onCartClick={_handleCartClick}
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
      {!isMobile && (
        <Drawer
          open={isDrawerOpen}
          header={<DrawerHeader onClose={_handleDrawerClose} />}
          onClose={_handleDrawerClose}
        >
          <div className="px-4 grid grid-cols-1 gap-4 mt-9 py-4 gap-y-4 mb-36">
            {rdxProductInCart.map((cartProduct) => (
              <div className="flex gap-x-4" key={cartProduct.id}>
                <div className="w-24 h-24 border rounded-md">
                  {!!cartProduct.image_thumbnail && (
                    <Image src={cartProduct.image_thumbnail} layout="fixed" width={96} height={96} className="object-cover w-full" alt={cartProduct.name} />
                  )}
                  {!cartProduct.image_thumbnail && (
                    <div style={{ height: 96 }} className="bg-gray-50 flex justify-center items-center w-full" >
                    </div>
                  )}
                </div>
                <div className="flex flex-col justify-between py-1">
                  <div className="flex flex-col gap-y-1">
                    <div className="flex gap-x-1 text-sm">
                      <span className="w-52 text-ellipsis overflow-hidden whitespace-nowrap font-medium" title={cartProduct.name}>
                        {cartProduct.name}
                      </span>
                    </div>
                    <span className="text-xs">{moneyFormatter(cartProduct.price)}</span>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex gap-x-2 items-center border px-2 rounded-sm">
                      <ButtonCart onClick={() => _handleSubQuantity(cartProduct.id)}>-</ButtonCart>
                      <div>{cartProduct.quantity}</div>
                      <ButtonCart onClick={() => _handleAddQuantity(cartProduct.id)}>+</ButtonCart>
                    </div>
                    <button onClick={() => _handleRemoveClick(cartProduct.id)}><TrashIcon color={colors.red[500]} /></button>
                  </div>
                </div>

              </div>
            ))}
          </div>

          <div className="fixed bottom-0 border-t py-4 flex flex-col gap-y-2 bg-white">
            <div className="flex justify-between items-center px-4">
              <span>Estimate Total </span>
              <span className="text-right">{moneyFormatter(totalPayment)}</span>
            </div>

            <div className="px-4">
              <Button fluid>Checkout</Button>
            </div>

            <div className="px-4">
              <span className="text-xs w-full text-gray-500">
                By checking out, I agree to the <span className="text-black font-medium">Terms</span> of Use and acknowledge that I have read the <span className="text-black font-medium">Privacy Policy</span>.
              </span>
            </div>
          </div>
        </Drawer>
      )}
    </React.Fragment>
  )
}



const DrawerHeader = ({ onClose }) => {
  const totalInCart = useSelector(rdxCartSelector.totalInCart)
  return (
    <div className="fixed w-full px-4 border-b py-3 flex justify-between items-center z-50 bg-white">
      <div className="flex gap-x-2 items-center">
        <CloseIcon onClick={onClose} className="cursor-pointer" />
        <span className="text-sm font-medium">
          Your Cart
        </span>
      </div>
      <span className="text-sm">
        {!!totalInCart ?
          `${totalInCart} ${totalInCart > 1 ? "items" : "item"}`
          : "No items"}
      </span>
    </div>
  )
}

export default HomeTemplate