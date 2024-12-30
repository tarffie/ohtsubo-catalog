import { Service, ServiceInput } from "../interfaces/Service";

export const mapToService = (body: ServiceInput): Service => ({
  id: body.id,
  title: body.title || "",
  description: body.description || "",
  price: body.price || 0,
  availabilityStatus: body.availabilityStatus ?? false,
  minimumOrderQuantity: body.minimumOrderQuantity || 0,
});
