export interface Bill {
  id: string;
  name: string;
  amount: number;
  dueDate: Date;
  paid: boolean;
  createdAt: Date;
  updatedAt?: Date;
}
