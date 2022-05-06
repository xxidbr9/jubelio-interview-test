
// List
interface Product {
  bndlDlvCnYn: string;
  cuponcheck: string;
  dispCtgrNo: string;
  dispCtgrStatCd: string;
  exchDlvCst: string;
  imageKindChk: string;
  optionAllAddPrc: string;
  outsideYnIn: string;
  outsideYnOut: string;
  prdAttrCd: string;
  prdNm: string;
  prdNo: string;
  prdSelQty: string;
  prdUpdYN: string;
  preSelPrc: string;
  proxyYn: string;
  rtngdDlvCst: string;
  saleEndDate: string;
  saleStartDate: string;
  selLimitPersonType: string;
  selMnbdNckNm: string;
  selMthdCd: string;
  selPrc: number;
  selPrdClfCd: string;
  selStatCd: string;
  selTermUseYn: string;
  sellerItemEventYn: string;
  sellerPrdCd: string;
  shopNo: string;
  tmpltSeq: string;
  validateMsg: string;
  nResult: string;
  dispCtgrNm: string;
  dispCtgrNmMid: string;
  dispCtgrNmRoot: string;
  dscAmt: string;
  dscPrice: string;
  freeDelivery: string;
  ProductOptionDetails: any;
  dispCtgrNo1: string;
  stock: number;
}

interface Products {
  product: Product[];
}

export interface ProductListResp {
  Products: Products;
}



// Detail
interface ProductCtgrAttribute {
  prdAttrNm: string;
  prdAttrNo: string;
}

interface ProductOptionDetails {
  addPrc: string;
  colCount: string;
  colOptPrice: string;
  optWght: string;
  selQty: string;
  sellerPrdOptCd: string;
  stckQty: string;
  stockNo: string;
  useYn: string;
}

interface ProductDetail {
  abrdBrandYn: string;
  abrdCnDlvCst: string;
  asDetail: string;
  bndlDlvCnYn: string;
  chinaSaleYn: string;
  chinaSelPrc: string;
  cupnDscMthdCd: string;
  cuponcheck: string;
  dispCtgrNo: string;
  dispCtgrStatCd: string;
  displayYn: string;
  dlvBasiAmt: string;
  dlvClf: string;
  dlvCnAreaCd: string;
  dlvCstInstBasiCd: string;
  dlvCstPayTypCd: string;
  dlvGrntYn: string;
  dlvWyCd: string;
  dscAmtPercnt: string;
  exchDlvCst: string;
  htmlDetail: string;
  imageKindChk: string;
  islandDlvCst: string;
  jejuDlvCst: string;
  memberNo: string;
  minorSelCnYn: string;
  mobile1WonYn: string;
  mstrPrdNo: string;
  optionAllAddPrc: string;
  orgnTypCd: string;
  outsideYnIn: string;
  outsideYnOut: string;
  paidSelPrc: string;
  prcCmpExpYn: string;
  prdAttrCd: string;
  prdImage01: string;
  prdImage02: string;
  prdImage03: string;
  prdImage04: string;
  prdNm: string;
  prdNo: string;
  prdSelQty: string;
  prdStatCd: string;
  prdTypCd: string;
  prdUpdYN: string;
  prdWght: string;
  preSelPrc: string;
  ProductCtgrAttribute: ProductCtgrAttribute;
  proxyYn: string;
  reviewDispYn: string;
  reviewOptDispYn: string;
  rtngExchDetail: string;
  rtngdDlvCst: string;
  selLimitPersonType: string;
  selLimitQty: string;
  selLimitTypCd: string;
  selMinLimitQty: string;
  selMinLimitTypCd: string;
  selMnbdNckNm: string;
  selMthdCd: string;
  selPrc: number;
  selPrdClfCd: string;
  selStatCd: string;
  selStatNm: string;
  selTermUseYn: string;
  sellerItemEventYn: string;
  sellerPrdCd: string;
  shopNo: string;
  suplDtyfrPrdClfCd: string;
  tmpltSeq: string;
  useGiftYn: string;
  useMon: string;
  validateMsg: string;
  nResult: string;
  createDt: string;
  dispCtgrNm: string;
  dispCtgrNmMid: string;
  dispCtgrNmRoot: string;
  dscAmt: string;
  dscPrice: string;
  freeDelivery: string;
  dispCtgrNo2: string;
  ProductOptionDetails: ProductOptionDetails;
  dispCtgrNo1: string;
  stock: number;
  updateDt: string;
}

export interface ProductDetailResp {
  Product: ProductDetail;
}


