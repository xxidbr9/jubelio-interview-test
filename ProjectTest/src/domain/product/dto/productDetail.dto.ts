export default class ProductDetailDto {
  constructor(
    public id: string,
    public name: string,
    public stock: number,
    public images: string[],
    public price: number,
    public description: string,
    public sku: number | string,
    public categories: string[]
  ) { }
}