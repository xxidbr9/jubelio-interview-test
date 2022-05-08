import TrashIcon from '@assets/svg/Trash.svg'
import Button from '@atoms/Button'
import moneyFormatter from '@helpers/moneyFormatter.helper'
import { rdxCartSelector, rdxCartActions } from '@rdxFeatures/cart'
import colors from '@styles/colors'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Image from 'next/image'
import styled from '@emotion/styled'
import tw from 'twin.macro'

type Props = {}

const CartSection = (props: Props) => {
  const totalPayment = useSelector(rdxCartSelector.totalPayment)
  const rdxProductInCart = useSelector(rdxCartSelector.getAllProductInCart)

  const dispatch = useDispatch()


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

  return (
    <React.Fragment>
      <div className="px-4 grid grid-cols-1 gap-4 mt-9 py-4 gap-y-4 laptop:mb-40 mobile:mb-48">
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
            <div className="flex-1 flex flex-col justify-between py-1">
              <div className="flex flex-col gap-y-1">
                <span className="flex-1 text-ellipsis overflow-hidden font-medium" title={cartProduct.name}>
                  {cartProduct.name}
                </span>
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

      <div className="fixed bottom-0 border-t py-4 flex flex-col gap-y-2 bg-white w-full">
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
    </React.Fragment>
  )
}


const ButtonCart = styled.button`
  font-size: 24px;
  ${tw`text-gray-600`}
`

export default CartSection