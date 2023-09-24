import {
  Form,
  Params,
  useFetcher,
  useLoaderData,
  useNavigate,
} from 'react-router-dom';

import { User, getUser, updateUser } from '@/data';

import Styles from '../styles';

export async function loader({ params }: { params: Params<string> }) {
  const user = await getUser(params.userId as string);
  if (!user) {
    throw new Response(null, { status: 404, statusText: 'Not Found' });
  }

  return { user };
}
export async function action({
  request,
  params,
}: {
  request: Request;
  params: Params<string>;
}) {
  const formData = await request.formData();

  return updateUser(params.userId as string, {
    favorite: formData.get('favorite') === 'true',
  });
}

export function UserPage() {
  const { user } = useLoaderData() as { user: User };
  const navigate = useNavigate();

  return (
    <>
      <Styles />

      <div id="detail">
        <button type="button" onClick={() => navigate('..')} className="mb-8">
          Back
        </button>

        <div id="user">
          <div>
            <img key={user.avatar} src={user.avatar} alt="" />
          </div>
          <div>
            <h1>
              {user.first || user.last ? (
                <>
                  {user.first} {user.last}
                </>
              ) : (
                <i>No Name</i>
              )}{' '}
              <Favorite user={user} />
            </h1>

            {user.twitter && (
              <p>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={`https://twitter.com/${user.twitter}`}
                >
                  {user.twitter}
                </a>
              </p>
            )}

            {user.notes && <p>{user.notes}</p>}

            <div>
              <Form action="edit">
                <button type="submit">Edit</button>
              </Form>
              <Form
                method="post"
                action="delete"
                onSubmit={(event) => {
                  if (
                    // eslint-disable-next-line no-restricted-globals
                    !confirm('Please confirm you want to delete this record.')
                  ) {
                    event.preventDefault();
                  }
                }}
              >
                <button type="submit">Delete</button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Favorite({ user }: { user: User }) {
  const fetcher = useFetcher();
  let favorite = user.favorite;
  if (fetcher.formData) {
    favorite = fetcher.formData.get('favorite') === 'true';
  }

  return (
    <fetcher.Form method="post">
      <button
        name="favorite"
        value={favorite ? 'false' : 'true'}
        aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        {favorite ? '★' : '☆'}
      </button>
    </fetcher.Form>
  );
}
