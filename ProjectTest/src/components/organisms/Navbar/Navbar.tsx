import CartIcon from '@assets/svg/Cart.svg'
import Container from '@atoms/Container'
import Drawer from '@atoms/Drawer'
import Icon from '@atoms/Icon'
import React from 'react'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import CloseIcon from '@assets/svg/Close.icon'
import { rdxCartActions, rdxCartSelector } from '@rdxFeatures/cart'
import { screenSelector } from '@rdxFeatures/screen'
import { useWindowScroll } from 'react-use'
import { NavbarProps } from './Navbar.props'
import CartSection from '@organisms/CartSection'
import DrawerHeader from '@molecules/HeaderCart/HeaderCart'


const Navbar: React.FC<NavbarProps> = (props) => {
  const isMobile = useSelector(screenSelector.isMobile)
  const rdxProductInCart = useSelector(rdxCartSelector.getAllProductInCart)

  const { y } = useWindowScroll()
  const isScroll = y > 0


  return (
    <React.Fragment>
      <nav className={`fixed w-full z-30 bg-white py-4 transition-all duration-500 border-b ${isScroll ? "shadow-lg" : "shadow-none"}`}>
        <Container className="flex justify-between items-center">
          <div className="flex items-center">
            <Image src={"/images/app_icon/512.png"} height={32} width={32} />
            <span className="text-red-500"> Air Product</span>
          </div>
          <button className="p-2" onClick={props.onCartClick}>
            <Icon src={CartIcon} badge={rdxProductInCart.length} />
          </button>
        </Container>
      </nav>
      {!isMobile && (
        <Drawer
          open={props.drawerOpen}
          header={<DrawerHeader onClose={props.onDrawerClose} />}
          onClose={props.onDrawerClose}
        >
          <CartSection />
        </Drawer>
      )}
      <div className="laptop:pt-28 mobile:pt-24" />
    </React.Fragment>
  )
}


export default Navbar

