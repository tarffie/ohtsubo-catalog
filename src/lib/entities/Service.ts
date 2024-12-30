import { z } from "zod";

export const ServiceSchema = z.object({
  id: z.string().optional(),
  title: z.string().nonempty(),
  description: z.string().optional(),
  price: z.number().nonnegative(),
  availabilityStatus: z.boolean(),
  minimumOrderQuantity: z.number().int().nonnegative(),
});
