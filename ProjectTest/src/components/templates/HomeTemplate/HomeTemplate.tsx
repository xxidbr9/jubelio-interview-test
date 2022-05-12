import ROUTES_CONSTANT from "@constants/routes.constant"
import { ProductListEntity } from "@domain/product/entities/iProductList.entity"
import { rdxCartActions } from "@rdxFeatures/cart"
import { rdxProductActions, rdxProductSelector, rdxProductThunkActions } from "@rdxFeatures/product"
import { screenSelector } from "@rdxFeatures/screen"
import React, { Fragment, useMemo, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useDebounce, useEffectOnce } from "react-use"
import { HomeTemplateProps } from "./HomeTemplate.props"
import Navbar from "@organisms/Navbar"
import { useRouter } from "next/router"
import ProductSection from "@organisms/ProductSection"
import SearchIcon from "@assets/svg/Search.icon"
import colors from "@styles/colors"
import Container from "@atoms/Container"
import Loader from "@atoms/Loader"
import { useDebouncedCallback } from "use-debounce"



const HomeTemplate: React.FC<HomeTemplateProps> = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const router = useRouter()
  const isMobile = useSelector(screenSelector.isMobile)
  const rdxProductsState = useSelector(rdxProductSelector.rdxProductState)
  const rdxProductWithCartQuantity = useSelector(rdxProductSelector.getAllProductWithCartQuantity)
  const rdxSearchProductWithCartQuantity = useSelector(rdxProductSelector.getAllSearchProductWithCartQuantity)
  const isSearchProduct = rdxSearchProductWithCartQuantity.length > 0 && rdxSearchProductWithCartQuantity.length !== rdxProductWithCartQuantity.length

  const products = isSearchProduct ? rdxSearchProductWithCartQuantity : rdxProductWithCartQuantity

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

  const _handleCartClick = () => {
    if (isMobile) {
      router.push(ROUTES_CONSTANT.CART)
      return
    }
    setIsDrawerOpen(true)
  }

  const _handleCartProductClick = (product: ProductListEntity) => {
    setIsDrawerOpen(true)
    dispatch(rdxCartActions.setProductList(product))
  }


  const _handleDrawerClose = () => setIsDrawerOpen(false)

  const debouncedSearchInput = useDebouncedCallback(
    (value) => {
      dispatch(rdxProductActions.setSearchProductQuery({ searchQuery: value }))
      dispatch(rdxProductActions.setLoading({ loading: false }))
    },
    500
  );

  const _handleSearch: React.ChangeEventHandler<HTMLInputElement> = (input) => {
    debouncedSearchInput(input.target.value)
    dispatch(rdxProductActions.setLoading({ loading: true }))
  }

  const hasMore = isSearchProduct ? false : rdxProductsState.page < 4
  const isLoading = rdxProductsState.loading && !rdxProductWithCartQuantity.length
  return (
    <React.Fragment>
      <Navbar drawerOpen={isDrawerOpen} onCartClick={_handleCartClick} onDrawerClose={_handleDrawerClose} />

      <Container className="mt-4">
        <SearchInput placeholder='Find a product eg: IPhone' onChange={_handleSearch} />
      </Container>
      {isLoading && <Loader />}
      {!isLoading && (
        <ProductSection
          hasMore={hasMore}
          onLoadMore={_handleNext}
          onCartClick={_handleCartProductClick}
          products={products}
        />
      )}
    </React.Fragment>
  )
}

const SearchInput: React.FC<JSX.IntrinsicElements['input']> = (props) => {
  return (
    <div className='w-full relative'>
      <SearchIcon stroke={colors.gray[500]} className="absolute mt-4 left-4" />
      <input
        defaultValue={props.defaultValue}
        type="text"
        className='rounded-full w-full flex flex-row gap-x-6 items-center pr-6 py-4 bg-gray-100 pl-12 outline-none'
        onChange={props.onChange}
        {...props}
      />
    </div>
  )
}



export default HomeTemplate