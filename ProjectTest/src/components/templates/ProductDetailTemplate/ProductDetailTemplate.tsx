import { ProductListEntity } from '@domain/product/entities/iProductList.entity'
import Navbar from '@organisms/Navbar'
import ProductSection from '@organisms/ProductSection'
import { rdxCartActions } from '@rdxFeatures/cart'
import { rdxProductSelector, rdxProductThunkActions } from '@rdxFeatures/product'
import { useRouter } from 'next/router'
import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffectOnce } from 'react-use'
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image'
import { screenSelector } from '@rdxFeatures/screen'
import ProductDetailSection from '@organisms/ProductDetailSection'
import { ProductDetailEntity } from '@domain/product/entities/iProductDetail.entity'
import ROUTES_CONSTANT from '@constants/routes.constant'

type Props = {
  data?: ProductDetailEntity
}

const ProductDetailTemplate = (props: Props) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const router = useRouter()
  const isMobile = useSelector(screenSelector.isMobile)

  const rdxProductsState = useSelector(rdxProductSelector.rdxProductState)
  const rdxProductWithCartQuantity = useSelector(rdxProductSelector.getAllProductWithCartQuantity)
  const products = rdxProductWithCartQuantity.filter(product => product.id !== props.data.id)

  const dispatch = useDispatch()

  useEffectOnce(() => {
    dispatch(rdxProductThunkActions.fetchProductList({ page: 1 }))
  })

  const _handleCartClick = () => {
    if (isMobile) {
      router.push(ROUTES_CONSTANT.CART)
    }
    setIsDrawerOpen(true)
  }
  const _handleCartProductClick = (product: ProductListEntity) => {
    setIsDrawerOpen(true)
    dispatch(rdxCartActions.setProductList(product))
  }
  const _handleDrawerClose = () => setIsDrawerOpen(false)

  const _handleNext = () => {
    if (rdxProductsState.loading) {
      return
    }
    setTimeout(() => {
      const nextPage = rdxProductsState.page + 1
      dispatch(rdxProductThunkActions.fetchProductList({ page: nextPage }))
    }, 1000) // to fast for fetch
  }

  const _handleCartProductDetailClick = () => {
    setIsDrawerOpen(false)
  }


  const hasMore = rdxProductsState.page < 4
  const IMAGE_HEIGHT = useMemo(() => isMobile ? 520 : 580, [isMobile])
  const IMAGE_RATIO = 4 / 3
  const IMAGE_WIDTH = IMAGE_HEIGHT / IMAGE_RATIO
  return (
    <React.Fragment>
      <Navbar drawerOpen={isDrawerOpen} onCartClick={_handleCartClick} onDrawerClose={_handleDrawerClose} />
      {isMobile && (
        <div style={{ height: IMAGE_HEIGHT, width: "100%" }}>
          <Swiper
            spaceBetween={0} slidesPerView={1} pagination={{
              clickable: true
            }}
            className="w-full h-full bg-gray-200">
            {props.data.images.map((pic, picIndex) => (
              <SwiperSlide key={`${props.data.id}-${picIndex}`} className="z-0">
                <Image src={pic} alt="" layout='fill' className='object-cover z-10' />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      <ProductDetailSection data={props.data} onCartClick={_handleCartProductDetailClick} />

      <ProductSection
        hasMore={hasMore}
        onLoadMore={_handleNext}
        onCartClick={_handleCartProductClick}
        products={products}
        title="More Products"
      />
    </React.Fragment>
  )
}

export default ProductDetailTemplate