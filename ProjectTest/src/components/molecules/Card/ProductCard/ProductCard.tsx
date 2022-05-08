import { ProductListEntity } from "@domain/product/entities/iProductList.entity"
import { screenSelector } from "@rdxFeatures/screen"
import React, { useMemo } from "react"
import Image from 'next/image'
import moneyFormatter from '@helpers/moneyFormatter.helper'
import CartIcon from '@assets/svg/Cart.svg'
import { useSelector } from "react-redux"
import { ProductCardProps } from "./ProductCard.props"

const ProductCard: React.FC<ProductCardProps> = ({ data: product, ...props }) => {
  const isMobile = useSelector(screenSelector.isMobile)

  const IMAGE_WIDTH = useMemo(() => isMobile ? 170 : 304, [isMobile])
  const IMAGE_RATIO = 4 / 3
  const IMAGE_HEIGHT = IMAGE_WIDTH * IMAGE_RATIO
  const _handleLinkEvent = (event) => {
    window.history.pushState(product, "", product.slug)
    event.preventDefault()
  }
  return (
    <div className="border rounded flex flex-col">
      <a href={product.slug} onClick={_handleLinkEvent}>
        {!!product.image_thumbnail && (
          <Image src={product.image_thumbnail} layout="responsive" width={IMAGE_WIDTH} height={IMAGE_HEIGHT} className="object-cover w-full" alt={product.name} />
        )}
        {!product.image_thumbnail && (
          <div style={{ height: IMAGE_HEIGHT }} className="bg-gray-50 flex justify-center items-center" >
          </div>
        )}
      </a>
      <div className='px-2 border-t py-2 flex flex-col justify-between flex-1 gap-2 bg-gray-50 relative'>
        <a href={product.slug} onClick={_handleLinkEvent} >
          <div className="absolute w-full h-full z-10" />
          <span className='font-medium'>
            {product.name}
          </span>
        </a>
        <div className='flex flex-col gap-y-4 relative z-20'>
          <span className='font-normal text-gray-600'>{moneyFormatter(product.price)}</span>
          <button onClick={() => props.onCartClick(product)} className='flex justify-between p-3 border rounded bg-white active:scale-[.98] hover:border-black transition-all duration-50 ease-out'>
            <span className='font-medium'>Add to cart</span>
            <CartIcon />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard

