import localforage from 'localforage';
import { matchSorter } from 'match-sorter';
import sortBy from 'sort-by';

import { User } from './user.model';

export async function getUsers(query?: string) {
  await fakeNetwork(`getUsers:${query}`);
  let users = await localforage.getItem<User[]>('users');
  if (!users) users = [];
  if (query) {
    users = matchSorter(users, query, { keys: ['first', 'last'] });
  }
  return users.sort(sortBy('last', 'createdAt'));
}

export async function createUser(updates: Partial<User>) {
  await fakeNetwork();
  const id = Math.random().toString(36).substring(2, 9);
  const user = {
    ...updates,
    id,
    avatar: updates.avatar || `https://i.pravatar.cc/192?u=${id}`,
    createdAt: new Date(),
  } as User;
  const users = await getUsers();
  users.unshift(user);
  await set(users);
  return user;
}

export async function getUser(id: string) {
  await fakeNetwork(`user:${id}`);
  const users = (await localforage.getItem<User[]>('users')) || [];
  const user = users.find((user) => user.id === id);
  return user ?? null;
}

export async function updateUser(id: string, updates: Partial<User>) {
  await fakeNetwork();
  const users = (await localforage.getItem<User[]>('users')) || [];
  const user = users.find((user) => user.id === id);
  if (!user) throw new Error(`No user found for ${id}`);
  Object.assign(user, updates);
  await set(users);
  return user;
}

export async function deleteUser(id: string) {
  const users = (await localforage.getItem<User[]>('users')) || [];
  const index = users?.findIndex((user) => user.id === id);
  if (index > -1) {
    users.splice(index, 1);
    await set(users);
    return true;
  }
  return false;
}

function set(users: User[]) {
  return localforage.setItem('users', users);
}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache: { [key: string]: boolean } = {};

async function fakeNetwork(key = '') {
  if (!key) {
    fakeCache = {};
  }

  if (fakeCache[key]) {
    return;
  }

  fakeCache[key] = true;
  return new Promise((res) => {
    setTimeout(res, Math.random() * 800);
  });
}
