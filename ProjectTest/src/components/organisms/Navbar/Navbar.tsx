import CartIcon from '@assets/svg/Cart.svg'
import Container from '@atoms/Container'
import Drawer from '@atoms/Drawer'
import Icon from '@atoms/Icon'
import React from 'react'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { rdxCartSelector } from '@rdxFeatures/cart'
import { screenSelector } from '@rdxFeatures/screen'
import { useWindowScroll } from 'react-use'
import { NavbarProps } from './Navbar.props'
import CartSection from '@organisms/CartSection'
import DrawerHeader from '@molecules/HeaderCart/HeaderCart'
import Link from 'next/link'
import ROUTES_CONSTANT from '@constants/routes.constant'


const Navbar: React.FC<NavbarProps> = (props) => {
  const isMobile = useSelector(screenSelector.isMobile)
  const rdxProductInCart = useSelector(rdxCartSelector.getAllProductInCart)

  const { y } = useWindowScroll()
  const isScroll = y > 0


  return (
    <React.Fragment>
      <nav className={`fixed w-full z-30 bg-white py-4 transition-all duration-500 border-b ${isScroll ? "shadow-lg" : "shadow-none"} mobile:h-16 laptop:h-auto`}>
        <Container className="flex justify-between items-center">
          <Link href={ROUTES_CONSTANT.HOME} passHref>
            <a className="flex items-center">
              <Image src={"/images/app_icon/512.png"} height={32} width={32} alt={"brand"}/>
              <span className="text-red-500"> Air Product</span>
            </a>
          </Link>
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

      <div className="laptop:pt-28 mobile:pt-16" />
    </React.Fragment>
  )
}


export default Navbar

