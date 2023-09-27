import { createClient } from '@supabase/supabase-js';

import { Bill } from './bill.model';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function supabaseToBill(bill: any): Bill {
  return {
    id: bill.id,
    name: bill.name,
    amount: bill.amount,
    dueDate: new Date(bill.due_date),
    paid: bill.paid,
    createdAt: new Date(bill.created_at),
    updatedAt: bill.updated_at ? new Date(bill.updated_at) : undefined,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function billToSupabase(bill: Partial<Bill>): any {
  return {
    ...(bill.id ? { id: bill.id } : {}),
    ...(bill.name ? { name: bill.name } : {}),
    ...(bill.amount ? { amount: bill.amount } : {}),
    ...(bill.dueDate ? { due_date: bill.dueDate.toISOString() } : {}),
    ...(bill.paid ? { paid: bill.paid } : {}),
    ...(bill.createdAt ? { created_at: bill.createdAt.toISOString() } : {}),
    ...(bill.updatedAt ? { updated_at: bill.updatedAt.toISOString() } : {}),
  };
}

export async function getBills(
  query = '*',
  orderBy = 'created_at',
  ascending = false
): Promise<Bill[]> {
  const { data: bills, error } = await supabase
    .from('bills')
    .select()
    .ilike('name', `%${query}%`)
    .order(orderBy, { ascending });

  if (error) throw error;

  return bills.map(supabaseToBill);
}

export async function getBill(id: string): Promise<Bill> {
  const { data: bill, error } = await supabase
    .from('bills')
    .select()
    .eq('id', id)
    .single();

  if (error) throw error;

  return supabaseToBill(bill);
}

export async function createBill(updates: Partial<Bill>): Promise<Bill> {
  const values = billToSupabase(updates);
  const { data: bill, error } = await supabase
    .from('bills')
    .insert(values)
    .select()
    .single();

  if (error) throw error;

  return supabaseToBill(bill);
}

export async function updateBill(
  id: string,
  updates: Partial<Bill>
): Promise<Bill> {
  const values = billToSupabase(updates);
  const { data: bill, error } = await supabase
    .from('bills')
    .update(values)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;

  return supabaseToBill(bill);
}

export async function deleteBill(id: string): Promise<boolean> {
  const { error } = await supabase.from('bills').delete().eq('id', id);

  if (error) throw error;

  return true;
}
