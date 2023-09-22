export interface Contact {
  id: string;
  first: string;
  last: string;
  avatar: string;
  twitter: string;
  notes?: string;
  favorite: boolean;
  createdAt: Date;
}

export const makeContact = () => ({
  id: Math.random().toString(36).substring(2, 9),
  first: '',
  last: '',
  avatar: '',
  twitter: '',
  favorite: false,
  createdAt: new Date(),
});
