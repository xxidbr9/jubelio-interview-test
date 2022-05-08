import CloseIcon from '@assets/svg/Close.icon'
import { rdxCartSelector } from '@rdxFeatures/cart'
import React from 'react'
import { useSelector } from 'react-redux'

const DrawerHeader = ({ onClose }) => {
  const totalInCart = useSelector(rdxCartSelector.totalInCart)
  return (
    <div className="fixed w-full px-4 border-b py-3 flex justify-between items-center z-50 bg-white mobile:top-0">
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

export default DrawerHeader