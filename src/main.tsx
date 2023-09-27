import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import App from './app/app';
import {
  BillListPage,
  BillPage,
  EditBillPage,
  billAction,
  billLoader,
  billsLoader,
  deleteBillAction,
  editBillAction,
  newBillAction,
} from './app/bills';
import { NewBillPage } from './app/bills/new';
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
      <Route index element={<Navigate to="/bills" replace />} />
      <Route path="bills" errorElement={<ErrorPage />}>
        <Route index element={<BillListPage />} loader={billsLoader} />
        <Route path="new" element={<NewBillPage />} action={newBillAction} />
        <Route
          path=":billId"
          element={<BillPage />}
          loader={billLoader}
          action={billAction}
        />
        <Route
          path=":billId/edit"
          element={<EditBillPage />}
          loader={billLoader}
          action={editBillAction}
        />
        <Route path=":billId/delete" action={deleteBillAction} />
      </Route>
      <Route
        path="contacts"
        element={<ContactsPage />}
        errorElement={<ErrorPage />}
        loader={contactsLoader}
      >
        <Route index element={<DefaultContactPage />} />
        <Route
          path="new"
          element={<NewContactPage />}
          action={newContactAction}
        />
        <Route
          path=":contactId"
          element={<ContactPage />}
          loader={contactLoader}
          action={contactAction}
        />
        <Route
          path=":contactId/edit"
          element={<EditContactPage />}
          loader={contactLoader}
          action={editContactAction}
        />
        <Route path=":contactId/delete" action={deleteContactAction} />R
      </Route>
      <Route path="users" errorElement={<ErrorPage />}>
        <Route index element={<UsersPage />} loader={usersLoader} />
        <Route path="new" element={<NewUserPage />} action={newUserAction} />
        <Route
          path=":userId"
          element={<UserPage />}
          loader={userLoader}
          action={userAction}
        />
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
