export interface USER_TYPE {
  id: string;
  name?: string;
  email: string;
  password: string;
  address: string;
  referredBy: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}
