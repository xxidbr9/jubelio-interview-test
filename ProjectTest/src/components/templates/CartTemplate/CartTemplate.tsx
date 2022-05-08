import ROUTES_CONSTANT from '@constants/routes.constant'
import DrawerHeader from '@molecules/HeaderCart/HeaderCart'
import CartSection from '@organisms/CartSection'
import { useRouter } from 'next/router'
import React from 'react'

type Props = {}

const CartTemplate = (props: Props) => {
  const router = useRouter()
  const _handleCloseClick = () =>{
    router.replace(ROUTES_CONSTANT.HOME)
  }
  return (
    <React.Fragment>
      <DrawerHeader onClose={_handleCloseClick} />
      <CartSection />
    </React.Fragment>
  )
}

export default CartTemplate