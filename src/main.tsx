import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import App from './app/app';
import IndexContactPage from './app/contact';
import ContactPage, {
  action as contactAction,
  loader as contactLoader,
} from './app/contact/contact';
import ContactsPage, { loader as contactsLoader } from './app/contact/contacts';
import { action as destroyAction } from './app/contact/destroy';
import EditContactPage, { action as editAction } from './app/contact/edit';
import NewContactPage, { action as newAction } from './app/contact/new';
import ErrorPage from './app/error';

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <App />,
//     errorElement: <ErrorPage />,
//     children: [
//       {
//         path: 'contacts',
//         element: <ContactsPage />,
//         errorElement: <ErrorPage />,
//         loader: contactsLoader,
//         children: [
//           { index: true, element: <IndexContactPage /> },
//           {
//             path: ':contactId',
//             element: <ContactPage />,
//             loader: contactLoader,
//             action: contactAction,
//           },
//           {
//             path: ':contactId/edit',
//             element: <EditContactPage />,
//             loader: contactLoader,
//             action: editAction,
//           },
//           {
//             path: ':contactId/destroy',
//             action: destroyAction,
//           },
//         ],
//       },
//     ],
//   },
// ]);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorPage />}>
      <Route
        path="contacts"
        element={<ContactsPage />}
        errorElement={<ErrorPage />}
        loader={contactsLoader}
      >
        <Route index element={<IndexContactPage />} />
        <Route
          path=":contactId"
          element={<ContactPage />}
          loader={contactLoader}
          action={contactAction}
        />
        <Route path="new" element={<NewContactPage />} action={newAction} />
        <Route
          path=":contactId/edit"
          element={<EditContactPage />}
          loader={contactLoader}
          action={editAction}
        />
        <Route path=":contactId/destroy" action={destroyAction} />
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
