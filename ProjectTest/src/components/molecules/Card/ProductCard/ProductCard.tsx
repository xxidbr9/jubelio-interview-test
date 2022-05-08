import { ProductListEntity } from "@domain/product/entities/iProductList.entity"
import { screenSelector } from "@rdxFeatures/screen"
import React, { Fragment, useEffect, useMemo, useState } from "react"
import Image from 'next/image'
import moneyFormatter from '@helpers/moneyFormatter.helper'
import CartIcon from '@assets/svg/Cart.svg'
import { useDispatch, useSelector } from "react-redux"
import { ProductCardProps } from "./ProductCard.props"
import NotFoundImage from '@assets/images/notFound.png'
import Icon from "@atoms/Icon"
import { useRouter } from "next/router"
import { Dialog, Transition } from "@headlessui/react"
import ROUTES_CONSTANT from "@constants/routes.constant"
import ProductDetailSection from "@organisms/ProductDetailSection"
import { rdxProductActions, rdxProductReducer, rdxProductSelector, rdxProductThunkActions } from "@rdxFeatures/product"
import Loader from "@atoms/Loader"
import CloseIcon from "@assets/svg/Close.icon"
import RightIcon from "@assets/svg/RIght.svg"
import LeftIcon from "@assets/svg/Left.svg"

const ProductCard: React.FC<ProductCardProps> = ({ data: product, otherProducts, ...props }) => {
  const isMobile = useSelector(screenSelector.isMobile)
  const [src, setSrc] = React.useState(product.image_thumbnail);


  const router = useRouter()

  const rdxIsDetailLoading = useSelector(rdxProductSelector.isDetailLoading)
  const rdxProductDetail = useSelector(rdxProductSelector.getDetailProduct)
  const thisProductIndex = otherProducts.findIndex(find => find.id === rdxProductDetail?.id)

  const IMAGE_WIDTH = useMemo(() => isMobile ? 170 : 304, [isMobile])
  const IMAGE_RATIO = 4 / 3
  const IMAGE_HEIGHT = IMAGE_WIDTH * IMAGE_RATIO

  useEffect(() => {
    console.log(rdxProductDetail)
  }, [rdxProductDetail])

  let [isOpen, setIsOpen] = useState(false)

  const dispatch = useDispatch()

  function closeModal() {
    window.history.replaceState({}, "", ROUTES_CONSTANT.HOME)
    setIsOpen(false)
  }

  const _handleLinkEvent = (event) => {
    if (isMobile) {
      router.push(product.slug)
      return
    }
    window.history.pushState(product, "", product.slug)
    event.preventDefault()
    dispatch(rdxProductThunkActions.fetchProductDetail(product.id))
    setIsOpen(true)
  }

  const _handlePrevProduct = () => {
    if (thisProductIndex > 0) {
      const nextProduct = otherProducts[thisProductIndex - 1]
      dispatch(rdxProductThunkActions.fetchProductDetail(nextProduct.id))
      window.history.pushState(nextProduct, "", nextProduct.slug)
    }
  }

  const _handleNextProduct = () => {
    if (thisProductIndex < otherProducts.length - 1) {
      const nextProduct = otherProducts[thisProductIndex + 1]
      dispatch(rdxProductThunkActions.fetchProductDetail(nextProduct.id))
      window.history.pushState(nextProduct, "", nextProduct.slug)
    }
  }

  const _handleCartProductDetailClick = () => {
    props.onCartClick(product)
  }

  return (
    <React.Fragment>
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

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-40" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25">

            </div>
          </Transition.Child>
          <Dialog.Panel>
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <div className="w-auto transform overflow-hidden rounded-sm bg-white p-6 text-left align-middle shadow-xl transition-all">

                    {rdxIsDetailLoading && <Loader />}
                    {!rdxIsDetailLoading && (
                      <ProductDetailSection isModal data={rdxProductDetail} onCartClick={_handleCartProductDetailClick} />
                    )}
                  </div>
                </Transition.Child>
              </div>
              <button className="absolute z-50 right-8 top-8" onClick={closeModal}>
                <CloseIcon color="#fff" className="scale-150" strokeWidth={2.5} />
              </button>
              {thisProductIndex > 0 && (
                <button className="absolute z-50 left-8 top-1/2 bg-white rounded-full p-4" onClick={_handlePrevProduct}>
                  <LeftIcon />
                </button>
              )}
              {thisProductIndex < otherProducts.length - 1 && (
                <button className="absolute z-50 right-8 top-1/2 bg-white rounded-full p-4" onClick={_handleNextProduct}>
                  <RightIcon />
                </button>
              )}
            </div>
          </Dialog.Panel>
        </Dialog>
      </Transition>
    </React.Fragment>
  )
}

export default ProductCard

