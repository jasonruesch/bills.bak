import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import App from './app/app';
import {
  ContactPage,
  ContactsPage,
  EditContactPage,
  NewContactPage,
  contactAction,
  contactLoader,
  contactsLoader,
  deleteContactAction,
  editContactAction,
  newContactAction,
} from './app/contacts';
import { DefaultContactPage } from './app/contacts/default';
import ErrorPage from './app/error';
import {
  EditUserPage,
  NewUserPage,
  UserPage,
  UsersPage,
  deleteUserAction,
  editUserAction,
  newUserAction,
  userAction,
  userLoader,
  usersLoader,
} from './app/users';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorPage />}>
      <Route
        path="contacts"
        element={<ContactsPage />}
        errorElement={<ErrorPage />}
        loader={contactsLoader}
      >
        <Route index element={<DefaultContactPage />} />
        <Route
          path=":contactId"
          element={<ContactPage />}
          loader={contactLoader}
          action={contactAction}
        />
        <Route
          path="new"
          element={<NewContactPage />}
          action={newContactAction}
        />
        <Route
          path=":contactId/edit"
          element={<EditContactPage />}
          loader={contactLoader}
          action={editContactAction}
        />
        <Route path=":contactId/delete" action={deleteContactAction} />
      </Route>
      <Route path="users" errorElement={<ErrorPage />}>
        <Route index element={<UsersPage />} loader={usersLoader} />
        <Route
          path=":userId"
          element={<UserPage />}
          loader={userLoader}
          action={userAction}
        />
        <Route path="new" element={<NewUserPage />} action={newUserAction} />
        <Route
          path=":userId/edit"
          element={<EditUserPage />}
          loader={userLoader}
          action={editUserAction}
        />
        <Route path=":userId/delete" action={deleteUserAction} />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
