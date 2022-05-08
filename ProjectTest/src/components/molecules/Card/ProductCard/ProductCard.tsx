import { ProductListEntity } from "@domain/product/entities/iProductList.entity"
import { screenSelector } from "@rdxFeatures/screen"
import React, { useMemo } from "react"
import Image from 'next/image'
import moneyFormatter from '@helpers/moneyFormatter.helper'
import CartIcon from '@assets/svg/Cart.svg'
import { useSelector } from "react-redux"
import { ProductCardProps } from "./ProductCard.props"
import NotFoundImage from '@assets/images/notFound.png'
import Icon from "@atoms/Icon"
import { useRouter } from "next/router"

const ProductCard: React.FC<ProductCardProps> = ({ data: product, ...props }) => {
  const isMobile = useSelector(screenSelector.isMobile)
  const [src, setSrc] = React.useState(product.image_thumbnail);

  const router = useRouter()
  const IMAGE_WIDTH = useMemo(() => isMobile ? 170 : 304, [isMobile])
  const IMAGE_RATIO = 4 / 3
  const IMAGE_HEIGHT = IMAGE_WIDTH * IMAGE_RATIO

  const _handleLinkEvent = (event) => {
    if (isMobile) {
      router.push(product.slug)
      return
    }
    window.history.pushState(product, "", product.slug)
    event.preventDefault()
  }

  return (
    <div className="border rounded flex flex-col">
      <a href={product.slug} onClick={_handleLinkEvent}>
        <Image
          onError={() => setSrc(NotFoundImage.src)}
          src={!!src ? src : NotFoundImage.src} layout="responsive" width={IMAGE_WIDTH} height={IMAGE_HEIGHT} className="object-cover w-full" alt={product.name} />
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
            <span className='font-medium'>{product.quantity > 0 ? "Add more" : "Add to cart"}</span>
            <Icon src={CartIcon} badge={product.quantity} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard

