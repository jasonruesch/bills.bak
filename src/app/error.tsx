import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

import Styles from './styles';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  const message = isRouteErrorResponse(error)
    ? error.statusText
    : error instanceof Error
    ? error.message
    : '';

  return (
    <>
      <Styles />

      <div id="error-page">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{message}</i>
        </p>
      </div>
    </>
  );
}
