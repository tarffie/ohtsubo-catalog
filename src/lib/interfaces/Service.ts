export interface Service {
  id: string | number;
  title: string;
  description: string;
  price: number;
  availabilityStatus: number;
  minimumOrderQuantity: number;
}

export interface ServiceInput {
  id: string | number;
  title?: string;
  description?: string;
  price?: number;
  availabilityStatus?: boolean;
  minimumOrderQuantity?: number;
}
