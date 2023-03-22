import { create, useStore } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export interface Bill {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  autoPaid: boolean;
  balance?: number;
}

interface BillStore {
  bills: Bill[];
  hasError: boolean;
  isLoading: boolean;

  fetchBills: () => void;
  createBill: (bill: Partial<Bill>) => void;
  updateBill: (bill: Bill) => void;
  deleteBill: (id: string) => void;
}

const buildStore = (set, get) => ({
  bills: [],
  hasError: false,
  isLoading: false,

  fetchBills: async (): Promise<void> => {
    let { bills } = get();

    if (!bills.length) {
      set({ isLoading: true });

      await sleep(500);

      const response = await fetch('http://localhost:4200/api/bills');
      bills = await response.json();

      set({ bills, isLoading: false });
    }
  },

  createBill: async (bill: Partial<Bill>): Promise<void> => {
    set({ isLoading: true });

    const response = await fetch('http://localhost:4200/api/bills', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bill),
    });
    const billCreated = await response.json();

    set((state) => ({
      bills: [...state.bills, billCreated],
      isLoading: false,
    }));
  },

  updateBill: async (bill: Bill): Promise<void> => {
    set({ isLoading: true });

    const response = await fetch(`http://localhost:4200/api/bills/${bill.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bill),
    });
    const billUpdated = await response.json();

    set((state) => ({
      bills: state.bills.map((b) =>
        b.id === billUpdated.id ? billUpdated : b
      ),
      isLoading: false,
    }));
  },

  deleteBill: async (id: string): Promise<void> => {
    set({ isLoading: true });

    await fetch(`http://localhost:4200/api/bills/${id}`, {
      method: 'DELETE',
    });

    set((state) => ({
      bills: state.bills.filter((b) => b.id !== id),
      isLoading: false,
    }));
  },
});

function createStore() {
  return create<BillStore>()(
    devtools(
      immer(
        persist(buildStore, {
          name: 'bills',
        })
      )
    )
  );
}

const store = createStore();
const { fetchBills } = store.getState();

fetchBills();

export function useBillStore() {
  return useStore(store);
}
