import localforage from 'localforage';

import { User } from './user.model';

export const getUsers = async (query?: string) => {
  const users = (await localforage.getItem<User[]>('users')) || [];

  return users;
};

export const getUser = async (id: string) => {
  const users = (await localforage.getItem<User[]>('users')) || [];

  const user = users?.find((user) => user.id === id);

  return user ?? null;
};

export const createUser = async (updates: Partial<User>) => {
  const users = (await localforage.getItem<User[]>('users')) || [];
  const id = Math.random().toString(36).substring(2, 9);
  const user = {
    ...updates,
    id,
    avatar: updates.avatar || `https://i.pravatar.cc/192?u=${id}`,
    createdAt: new Date(),
  } as User;

  users?.unshift(user);
  await localforage.setItem('users', users);

  return user;
};

export const updateUser = async (id: string, updates: Partial<User>) => {
  let users = (await localforage.getItem<User[]>('users')) || [];
  const user = users?.find((user) => user.id === id);

  if (!user) throw new Error(`No user found for ${id}`);

  users = users.map((user) =>
    user.id === id ? { ...user, ...updates } : user
  );
  await localforage.setItem('users', users);

  return user;
};

export const deleteUser = async (id: string) => {
  const users = (await localforage.getItem<User[]>('users')) || [];
  const index = users?.findIndex((user) => user.id === id);

  if (index > -1) {
    users.splice(index, 1);
    await localforage.setItem('users', users);

    return true;
  }

  return false;
};
