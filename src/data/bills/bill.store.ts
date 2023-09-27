import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import * as api from './bill.api';
import { Bill } from './bill.model';

export interface BillState {
  bills: Bill[];
  selected?: Bill;
}

export const useBillStore = create(
  immer<BillState>(() => ({
    bills: [],
  }))
);

export const getBills = async (
  query?: string,
  orderBy?: string,
  ascending?: boolean
): Promise<Bill[]> => {
  const bills = await api.getBills(query, orderBy, ascending);
  await useBillStore.setState({ bills, selected: undefined }); // Clear selected bill

  return bills;
};

export const getBill = async (id: string): Promise<Bill | null> => {
  let { bills } = useBillStore.getState();
  if (!bills?.length) bills = await getBills();

  const bill = bills?.find((bill) => bill.id === id);
  await useBillStore.setState({ selected: bill });

  return bill ?? null;
};

export const createBill = async (updates: Partial<Bill>): Promise<Bill> => {
  const bill = await api.createBill(updates);

  const { bills } = useBillStore.getState();
  bills.unshift(bill);
  await useBillStore.setState({ bills, selected: bill });

  return bill;
};

export const updateBill = async (
  id: string,
  updates: Partial<Bill>
): Promise<Bill> => {
  const bill = await api.updateBill(id, updates);

  const { bills } = useBillStore.getState();
  await useBillStore.setState({
    bills: bills.map((bill) =>
      bill.id === id ? { ...bill, ...updates } : bill
    ),
  });

  return bill;
};

export const deleteBill = async (id: string): Promise<boolean> => {
  const deleted = await api.deleteBill(id);

  if (deleted) {
    const { bills, selected } = useBillStore.getState();
    await useBillStore.setState({
      bills: bills.filter((bill) => bill.id !== id),
      selected: id === selected?.id ? undefined : selected,
    });
  }

  return deleted;
};

export const getSelectedBill = (): Bill | null => {
  const { selected } = useBillStore.getState();

  return selected ?? null;
};
