export default class ProductListDto {

  constructor(
    public id: string,
    public name: string,
    public stock: number,
    public image_thumbnail: string,
    public price: number,
  ) { }
}