import Container from '@atoms/Container'
import React, { useEffect, useMemo, useState } from 'react'
import { ProductListEntity } from '@domain/product/entities/iProductList.entity'
import Image from 'next/image'
import productListNetwork from '@domain/product/network/productList.network'
import moneyFormatter from '@helpers/moneyFormatter.helper'
import CartIcon from '@assets/svg/Cart.svg'
import { useDispatch, useSelector } from 'react-redux'
import { rdxProductActions, rdxProductSelector, rdxProductThunkActions } from '@rdxFeatures/product'
import { useEffectOnce } from 'react-use'
import InfiniteScroll from 'react-infinite-scroller';
import Lottie from 'react-lottie';
import animatedData from '@assets/lottie/loading.json'
import { screenSelector } from '@rdxFeatures/screen'

type Props = {}

const HomePage = (props: Props) => {
  return <HomeTemplate />
}

export default HomePage



const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animatedData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

const LoaderNext = () => {
  return (
    <Lottie options={defaultOptions}
      height={200}
      width={200} />
  );
}


type HomeTemplateProps = {

}

const HomeTemplate: React.FC<HomeTemplateProps> = (props) => {
  const isMobile = useSelector(screenSelector.isMobile)
  const rdxProductsState = useSelector(rdxProductSelector.rdxProductState)
  const { products } = rdxProductsState
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

  const hasMore = rdxProductsState.page < 4

  const IMAGE_WIDTH = useMemo(() => isMobile ? 170 : 304, [isMobile])
  const IMAGE_RATIO = 4 / 3
  const IMAGE_HEIGHT = IMAGE_WIDTH * IMAGE_RATIO

  return (
    <main>
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
        loader={<LoaderNext key={0} />}
        className="mt-4"

      >
        <Container>
          <div className='grid desktop:grid-cols-4 laptop:grid-cols-2 tablet:grid-cols-3 tablet:gap-x-6 mobile:grid-cols-2 laptop:gap-x-6 laptop:gap-y-8 mobile:gap-y-4 mobile:gap-x-4'>
            {products.map((product) => (
              <div key={product.id} className="border rounded flex flex-col">
                {!!product.image_thumbnail && (
                  <Image src={product.image_thumbnail} layout="responsive" width={IMAGE_WIDTH} height={IMAGE_HEIGHT} className="object-cover w-full" />
                )}
                {!product.image_thumbnail && (
                  <div style={{ height: IMAGE_HEIGHT }} className="bg-gray-50 flex justify-center items-center" >
                  </div>
                )}
                <div className='px-2 border-t py-2 flex flex-col justify-between flex-1 gap-2 bg-gray-50'>
                  <span className='font-medium'>
                    {product.name}
                  </span>
                  <div className='flex flex-col gap-y-4'>
                    <span className='font-normal text-gray-600'>{moneyFormatter(product.price)}</span>
                    <button className='flex justify-between p-3 border rounded bg-white active:scale-[.98] hover:border-black transition-all duration-50 ease-out'>
                      <span className='font-medium'>Add to cart</span>
                      <CartIcon />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {!hasMore && (
            <div className='my-10 text-center'>
              You reach the end, can't find what you need?
            </div>
          )}
        </Container>
      </InfiniteScroll>
    </main>
  )
}

