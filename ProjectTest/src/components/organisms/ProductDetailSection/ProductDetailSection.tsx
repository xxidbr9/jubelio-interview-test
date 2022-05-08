import Container from '@atoms/Container'
import moneyFormatter from '@helpers/moneyFormatter.helper'
import React, { useMemo, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image'
import Icon from '@atoms/Icon'
import CartIcon from '@assets/svg/Cart.svg'
import { ProductDetailEntity } from '@domain/product/entities/iProductDetail.entity';
import { rdxProductSelector } from '@rdxFeatures/product';
import { ProductListEntity } from '@domain/product/entities/iProductList.entity';
import { rdxCartActions } from '@rdxFeatures/cart';
import { useDispatch, useSelector } from 'react-redux';
import { screenSelector } from '@rdxFeatures/screen';

type Props = {
  data: ProductDetailEntity
  onCartClick: () => void
}

const ProductDetailSection = (props: Props) => {
  const isMobile = useSelector(screenSelector.isMobile)

  const IMAGE_HEIGHT = useMemo(() => isMobile ? 520 : 580, [isMobile])
  const IMAGE_RATIO = 4 / 3
  const IMAGE_WIDTH = IMAGE_HEIGHT / IMAGE_RATIO

  const [swiper, setSwiper] = useState<any>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const rdxProductWithCartQuantity = useSelector(rdxProductSelector.getAllProductWithCartQuantity)
  const product = rdxProductWithCartQuantity.find(product => product.id === props.data.id)

  const dispatch = useDispatch()

  const _handleChangeIndex = (index: number) => {
    setActiveIndex(index)
    swiper.slideTo(index)
  }

  const _handleCartProductDetailClick = (product: ProductListEntity) => {
    props.onCartClick()
    dispatch(rdxCartActions.setProductList(product))
  }

  return (
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
  )
}

export default ProductDetailSection