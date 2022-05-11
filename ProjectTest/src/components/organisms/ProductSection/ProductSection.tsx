import Container from '@atoms/Container'
import Loader from '@atoms/Loader'
import { RoutesType } from '@constants/routes.constant'
import { ProductListEntity } from '@domain/product/entities/iProductList.entity'
import { createSlugLink } from '@helpers/slugGenerator.helper'
import ProductCard from '@molecules/Card/ProductCard'
import { rdxProductActions } from '@rdxFeatures/product'
import React from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { useDispatch } from 'react-redux'
import { Menu, Transition } from '@headlessui/react'
import styled from '@emotion/styled'
import tw from 'twin.macro'
import MenuIcon from '@assets/svg/Menu,icon'
import FilterIcon from '@assets/svg/Filter.icon'

type ProductType = ProductListEntity & { quantity: number }

type Props = {
  onLoadMore: () => void
  hasMore: boolean
  products: ProductType[]
  onCartClick: (product: ProductListEntity) => void
  title?: string,
  onSort?: () => void
}

const NavbarItem = styled.div<{ isActive: boolean }>`
  ${tw`cursor-pointer py-3 px-4 text-sm hover:bg-gray-50 hover:text-gray-900`}
  ${props => props.isActive ? tw`text-gray-900 bg-gray-50` : tw`text-gray-400`}
`

const ProductSection = (props: Props) => {
  const { products } = props
  const otherProducts = products.map(product => ({ ...product, slug: createSlugLink(RoutesType.HOME, product.name, product.id) }))

  const dispatch = useDispatch()
  const _handleSort = (sort: "name" | "price", order: "desc" | "asc") => {
    if (sort === "name" && order === "desc") dispatch(rdxProductActions.sortBy({ sort: "name", order: "desc" }))
    if (sort === "name" && order === "asc") dispatch(rdxProductActions.sortBy({ sort: "name", order: "asc" }))
    if (sort === "price" && order === "desc") dispatch(rdxProductActions.sortBy({ sort: "price", order: "desc" }))
    if (sort === "price" && order === "asc") dispatch(rdxProductActions.sortBy({ sort: "price", order: "asc" }))
  }
  
  return (
    <main className={"mt-4"}>
      <Container className='mb-4'>
        <div className='flex justify-between'>
          <h1 className='text-xl font-medium'>{props.title || "Shop All Product"}</h1>
          <div>
            <Menu as="div" className="relative inline-block text-left">
              {({ open }) => (
                <React.Fragment>
                  <Menu.Button className={`flex items-center rounded-full border py-2  gap-3 px-4 ${open && "shadow-md"} hover:shadow-md transition-all duration-150`}>
                    <span>
                      Sorting
                    </span>
                    <FilterIcon />
                  </Menu.Button>

                  <Transition
                    as={React.Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute z-[999] right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className='flex flex-col py-2'>
                        <React.Fragment>
                          <Menu.Item>
                            {({ active }) => (
                              <NavbarItem isActive={active} onClick={() => _handleSort("price","asc")}>
                                Price: Low to High
                              </NavbarItem>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <NavbarItem isActive={active} onClick={() => _handleSort("price","desc")}>
                                Price: High to Low
                              </NavbarItem>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <NavbarItem isActive={active} onClick={() => _handleSort("name","asc")}>
                                Name: A-Z
                              </NavbarItem>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <NavbarItem isActive={active} onClick={() => _handleSort("name","desc")}>
                                Name: Z-A
                              </NavbarItem>
                            )}
                          </Menu.Item>
                        </React.Fragment>
                      </div>
                    </Menu.Items>
                  </Transition>
                </React.Fragment>
              )}
            </Menu>
          </div>
        </div>
      </Container>
                            
      <InfiniteScroll
        pageStart={0}
        loadMore={props.onLoadMore}
        hasMore={props.hasMore}
        useWindow={true}
        loader={<Loader key={0} />}
        className="mt-4"

      >
        <Container>
          <div className='grid desktop:grid-cols-4 laptop:grid-cols-2 tablet:grid-cols-3 tablet:gap-x-6 mobile:grid-cols-2 laptop:gap-x-6 laptop:gap-y-8 mobile:gap-y-4 mobile:gap-x-4'>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                data={{ ...product, slug: createSlugLink(RoutesType.HOME, product.name, product.id), quantity: product.quantity }}
                onCartClick={props.onCartClick}
                otherProducts={otherProducts}
              />
            ))}
          </div>
          {!props.hasMore && (
            <div className='my-10 text-center'>
              You reach the end, can&apos;t find what you need?
            </div>
          )}
        </Container>
      </InfiniteScroll>
    </main>
  )
}

export default ProductSection