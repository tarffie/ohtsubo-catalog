import { Status } from "../enums/Status";
import { Service } from "@/lib/interfaces/Service";

export interface Purchase {
  id?: string | number;
  price: number;
  status: Status;
  services: Array<Service>;
  date: Date;
}
