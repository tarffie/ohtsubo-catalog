export interface Service {
  id: string | bigint;
  title: string;
  description: string;
  price: number;
  availabilityStatus: number;
  minimumOrderQuantity: number;
}
