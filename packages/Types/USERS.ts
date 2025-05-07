export interface USER_TYPE {
  id?: number;
  name?: string;
  email: string;
  password: string;
  address: string;
  referredBy: number;
  role: string;
  createAt: Date;
  updatedAt: Date;
}
