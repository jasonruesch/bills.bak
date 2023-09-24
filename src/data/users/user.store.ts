import { matchSorter } from 'match-sorter';
import sortBy from 'sort-by';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import * as api from './user.api';
import { User } from './user.model';

export interface UserState {
  users: User[];
  selected?: User;
}

export const useUserStore = create(
  immer<UserState>(() => ({
    users: [],
  }))
);

export const getUsers = async (query?: string) => {
  let users = await api.getUsers(query);

  await useUserStore.setState({ users });

  if (query) {
    users = matchSorter(users, query, { keys: ['first', 'last'] });
    await useUserStore.setState({ selected: undefined }); // Clear selected user
  }

  return users.sort(sortBy('last', 'createdAt'));
};

export const getUser = async (id: string) => {
  let { users } = useUserStore.getState();
  if (!users?.length) users = await getUsers();

  const user = users?.find((user) => user.id === id);
  await useUserStore.setState({ selected: user });

  return user ?? null;
};

export const createUser = async (updates: Partial<User>) => {
  const user = await api.createUser(updates);

  const { users } = useUserStore.getState();
  users.unshift(user);
  await useUserStore.setState({ users, selected: user });

  return user;
};

export const updateUser = async (id: string, updates: Partial<User>) => {
  const user = await api.updateUser(id, updates);

  const { users } = useUserStore.getState();
  await useUserStore.setState({
    users: users.map((user) =>
      user.id === id ? { ...user, ...updates } : user
    ),
  });

  return user;
};

export const deleteUser = async (id: string) => {
  const deleted = await api.deleteUser(id);

  if (deleted) {
    const { users, selected } = useUserStore.getState();
    await useUserStore.setState({
      users: users.filter((user) => user.id !== id),
      selected: id === selected?.id ? undefined : selected,
    });

    return true;
  }

  return false;
};

export const getSelectedUser = async () => {
  const { selected } = useUserStore.getState();

  return selected;
};
