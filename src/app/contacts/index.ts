export * from './components/form';
export { action as deleteContactAction } from './delete';
export {
  ContactPage,
  action as contactAction,
  loader as contactLoader,
} from './detail';
export { EditContactPage, action as editContactAction } from './edit';
export {
  ContactListPage as ContactsPage,
  loader as contactsLoader,
} from './list';
export { NewContactPage, action as newContactAction } from './new';
