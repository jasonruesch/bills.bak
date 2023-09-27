import { Bill } from '@/data';

export const fromEntries = <
  T,
  U extends Iterable<readonly [PropertyKey, unknown]>
>(
  formData: U
): T => {
  const entity = Object.fromEntries(formData);

  return entity as unknown as T;
};

export const formDataToBill = (formData: FormData): Partial<Bill> => {
  const data = fromEntries(formData) as { [key: string]: string };
  return {
    ...(data.id ? { id: data.id } : {}),
    ...(data.name ? { name: data.name } : {}),
    ...(data.amount ? { amount: parseFloat(data.amount) } : {}),
    ...(data.dueDate ? { dueDate: new Date(data.dueDate) } : {}),
    ...(data.paid ? { paid: data.paid === 'on' } : {}),
    ...(data.createdAt ? { createdAt: new Date(data.createdAt) } : {}),
    ...(data.updatedAt ? { updatedAt: new Date(data.updatedAt) } : {}),
  } satisfies Partial<Bill>;
};
