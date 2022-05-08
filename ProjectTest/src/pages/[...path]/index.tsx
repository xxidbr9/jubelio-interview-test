import Container from '@atoms/Container'
import ROUTES_CONSTANT from '@constants/routes.constant'
import { ProductDetailEntity } from '@domain/product/entities/iProductDetail.entity'
import { ProductListEntity } from '@domain/product/entities/iProductList.entity'
import productDetailNetwork from '@domain/product/network/productDetail.network'
import moneyFormatter from '@helpers/moneyFormatter.helper'
import Navbar from '@organisms/Navbar'
import ProductSection from '@organisms/ProductSection'
import { rdxCartActions } from '@rdxFeatures/cart'
import { rdxProductSelector, rdxProductThunkActions } from '@rdxFeatures/product'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffectOnce } from 'react-use'
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image'
import { screenSelector } from '@rdxFeatures/screen'
import { Thumbs } from 'swiper'
import Icon from '@atoms/Icon'
import CartIcon from '@assets/svg/Cart.svg'

type Props = {
  id?: any,
  data?: ProductDetailEntity
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  try {
    const path = ctx.params?.path
    const id = path[path.length - 1]
    const detailProduct = await productDetailNetwork(id)
    return {
      props: {
        id,
        data: detailProduct.data.data.product
      }
    }
  } catch (err) {
    return {
      props: {
        error: err
      },
      redirect: {
        destination: ROUTES_CONSTANT.NOT_FOUND
      }
    }
  }
}



const DetailProductPage = (props: Props) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const router = useRouter()
  const isMobile = useSelector(screenSelector.isMobile)

  const [swiper, setSwiper] = useState<any>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const rdxProductsState = useSelector(rdxProductSelector.rdxProductState)
  const rdxProductWithCartQuantity = useSelector(rdxProductSelector.getAllProductWithCartQuantity)
  const products = rdxProductWithCartQuantity.filter(product => product.id !== props.id)
  const product = rdxProductWithCartQuantity.find(product => product.id === props.id)

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


  const _handleChangeIndex = (index: number) => {
    setActiveIndex(index)
    swiper.slideTo(index)
  }

  const _handleCartProductDetailClick = (product: ProductListEntity) => {
    setIsDrawerOpen(true)
    dispatch(rdxCartActions.setProductList(product))
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
      
      <Container className='laptop:mb-20 mobile:mb-10'>
        <div className='flex gap-x-8 laptop:flex-row mobile:flex-col'>
          {!isMobile && (
            <div className='flex gap-x-4'>
              <ul className='flex flex-col gap-y-4'>
                {props.data.images.map(((src, picIndex) => (
                  <li onClick={() => _handleChangeIndex(picIndex)} key={`${props.data.id}-${picIndex}-thumb`} className={`${picIndex === activeIndex ? "ring-2 ring-black " : ""} z-0  rounded-sm cursor-pointer`}>
                    <Image src={src} alt="" layout='fixed' height={64} width={64} className='object-cover z-10' />
                  </li>
                )))}
              </ul>
              <div style={{ height: IMAGE_HEIGHT, width: IMAGE_WIDTH }}>
                <Swiper
                  spaceBetween={0} slidesPerView={1} pagination={{
                    clickable: true
                  }}
                  onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                  onSwiper={setSwiper}
                  className="w-full h-full bg-gray-200">
                  {props.data.images.map((pic, picIndex) => (
                    <SwiperSlide key={`${props.data.id}-${picIndex}`} className="z-0">
                      <Image src={pic} alt="" layout='fill' className='object-cover z-10' />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          )}
          <div className='flex flex-col gap-y-4 mobile:py-4'>
            <div>
              <h1 className='text-lg font-medium'>{props.data.name}</h1>
              <div className='flex gap-x-2 text-sm text-gray-400'>
                <span>ID : {props.data.id}</span>
                <span>Stock : {props.data.stock}</span>
                <span>SKU : {props.data.sku}</span>
              </div>
              <h2 className='text-2xl'>{moneyFormatter(props.data.price)}</h2>
            </div>
            <div className='flex flex-col gap-y-2'>
              <span className='font-medium underline'>Detail</span>
              <article className='prose' dangerouslySetInnerHTML={{ __html: props.data.description }} />
            </div>

            <button onClick={() => _handleCartProductDetailClick(product)} className='flex justify-between p-3 border rounded bg-white active:scale-[.98] hover:border-black transition-all duration-50 ease-out'>
              <span className='font-medium'>{product?.quantity > 0 ? "Add more" : "Add to cart"}</span>
              <Icon src={CartIcon} badge={product?.quantity} />
            </button>

          </div>
        </div>
      </Container>

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

export default DetailProductPage