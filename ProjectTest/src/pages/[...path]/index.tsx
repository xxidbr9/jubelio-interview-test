import ROUTES_CONSTANT from '@constants/routes.constant'
import { ProductDetailEntity } from '@domain/product/entities/iProductDetail.entity'
import productDetailNetwork from '@domain/product/network/productDetail.network'
import ProductDetailTemplate from '@templates/ProductDetailTemplate/ProductDetailTemplate'
import { GetServerSideProps } from 'next'
import React from 'react'


type Props = {
  id?: any,
  data?: ProductDetailEntity
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  try {
    const path = ctx.params?.path
    const id = path[path.length - 1]
    const detailProduct = await productDetailNetwork(id)
    return {
      props: {
        id,
        data: detailProduct.data.data.product
      }
    }
  } catch (err) {
    return {
      props: {
        error: err
      },
      redirect: {
        destination: ROUTES_CONSTANT.NOT_FOUND
      }
    }
  }
}



const DetailProductPage = (props: Props) => {
  return (
    <React.Fragment>
      <ProductDetailTemplate data={props.data} />
    </React.Fragment>
  )
}

export default DetailProductPage