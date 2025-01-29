import Status from "../enums/status";
import { Service } from "@/lib/interfaces/Service";

export interface Purchase {
  id?: string | number;
  userId: string | number;
  price: number;
  status: Status;
  services: Array<Service>;
  date: Date;
}
