import type { NextApiRequest, NextApiResponse } from 'next'
import axios, { AxiosRequestConfig } from "axios";
import apiConfig from '@configs/api.config';
import { ProductDetailResp, ProductListResp } from 'src/utils/types/outsideApi';
import ProductListDto from 'src/domain/product/dto/productList.dto';
import parseXml from 'src/utils/helpers/parseXml.helper';


const productListAPI = async (req: NextApiRequest, res: NextApiResponse) => {
  const page = req.query?.page || 1
  const config: AxiosRequestConfig = {
    method: "get",
    url: `http://api.elevenia.co.id/rest/prodservices/product/listing?page=${page}`,
    headers: {
      openapikey: apiConfig.API_KEY,
      "Content-type": "application/xml"
    }
  };

  try {
    const apiResp = await axios(config)
    const parsedResp = await parseXml(apiResp.data)

    const data = JSON.stringify(parsedResp)
    const jsonData = JSON.parse(data) as ProductListResp

    const resp = jsonData.Products.product?.map(async (product) => {
      const respDetail = await axios({ ...config, url: `http://api.elevenia.co.id/rest/prodservices/product/details/${product.prdNo}` });
      const detailData = await parseXml(respDetail.data)
      const detailDataParsed = detailData as ProductDetailResp
      const image = detailDataParsed.Product.prdImage01 || ""
      return new ProductListDto(product.prdNo, product.prdNm, product.stock, image, product.selPrc);
    }) || []

    const all = await Promise.all(resp)
    // const nextAPIResp = await axios({ ...config, url: `http://api.elevenia.co.id/rest/prodservices/product/listing?page=${+(page) + 1}` })
    // const parsedNextResp = await parseXml(nextAPIResp.data) as ProductListResp

    const jsonResp = {
      message: "success get all products",
      data: {
        products: all,
        // has_next: !!parsedNextResp.Products
      }
    }
    return res.status(200).json(jsonResp)

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error })
  };

};


export default productListAPI