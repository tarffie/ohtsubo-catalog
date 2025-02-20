import { User as NextAuthUser } from "next-auth"

export interface User extends NextAuthUser {
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
