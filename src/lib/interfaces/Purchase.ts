import Status from "../enums/status";
import { Service } from "@/lib/interfaces/Service";

export type Purchase = {
  id: bigint;
  userId: bigint;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  status: Status;
  services: Array<Service>;
};
