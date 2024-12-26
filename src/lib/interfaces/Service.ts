export interface Service {
  id: number,
  title: string,
  description: string,
  thumbnailcategory: string,
  price: number,
  discountPercentage: number,
  rating: number,
  stock: number,
  tags: Array<string>,
  sku: string,
  weight: number,
  dimensions: [object],
  warrantyInformation: string,
  shippingInformation: string,
  availabilityStatus: string,
  reviews: Array<string>,
  returnPolicy: string,
  minimumOrderQuantity: number,
  meta: [object],
  images: [Array<object>],
  thumbnail: string
}
