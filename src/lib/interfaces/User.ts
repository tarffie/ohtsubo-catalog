export interface User {
  id: string | bigint | number;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
