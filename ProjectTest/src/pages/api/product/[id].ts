import axios, { AxiosRequestConfig } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'
import { ProductDetailResp } from "src/utils/types/outsideApi";
import parseXml from "src/utils/helpers/parseXml.helper";
import ProductDetailDto from "src/domain/product/dto/productDetail.dto";
import apiConfig from "@configs/api.config";

const productDetailAPI = async (req: NextApiRequest, res: NextApiResponse) => {

  const { id } = req.query

  const config: AxiosRequestConfig = {
    method: 'get',
    url: `http://api.elevenia.co.id/rest/prodservices/product/details/${id}`,
    headers: {
      openapikey: apiConfig.API_KEY,
      'Content-type': 'application/xml',
    }
  };

  try {
    const apiResp = await axios(config)
    const parsedResp = await parseXml(apiResp.data)

    const data = JSON.stringify(parsedResp)
    const jsonData = JSON.parse(data) as ProductDetailResp
    const images: string[] = []

    if (!!jsonData.Product.prdImage01) {
      images.push(jsonData.Product.prdImage01)
    }

    if (!!jsonData.Product.prdImage02) {
      images.push(jsonData.Product.prdImage02)
    }

    if (!!jsonData.Product.prdImage03) {
      images.push(jsonData.Product.prdImage03)
    }

    if (!!jsonData.Product.prdImage04) {
      images.push(jsonData.Product.prdImage04)
    }

    const categories: string[] = []
    if (!!jsonData.Product.dispCtgrNm) {
      categories.push(jsonData.Product.dispCtgrNm)
    }
    if (!!jsonData.Product.dispCtgrNmMid) {
      categories.push(jsonData.Product.dispCtgrNmMid)
    }
    if (!!jsonData.Product.dispCtgrNmRoot) {
      categories.push(jsonData.Product.dispCtgrNmRoot)
    }

    const apiRes = new ProductDetailDto(jsonData.Product.prdNo, jsonData.Product.prdNm, jsonData.Product.stock, images, jsonData.Product.selPrc, jsonData.Product.htmlDetail, jsonData.Product.ProductOptionDetails.stockNo, categories)

    const jsonResp = {
      message: "success get product detail",
      data: {
        product: apiRes,
      }
    }
    return res.status(200).json(jsonResp)

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error })
  };

}

export default productDetailAPI