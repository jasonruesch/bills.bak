import { Form, useNavigate } from 'react-router-dom';

import { User } from '@/data';

export function UserForm({ user }: { user?: User }) {
  const navigate = useNavigate();

  return (
    <Form method="post" id="user-form">
      <p>
        <span>Name</span>
        <input
          placeholder="First"
          aria-label="First name"
          type="text"
          name="first"
          defaultValue={user?.first}
          required
        />
        <input
          placeholder="Last"
          aria-label="Last name"
          type="text"
          name="last"
          defaultValue={user?.last}
          required
        />
      </p>
      <label>
        <span>Twitter</span>
        <input
          type="text"
          name="twitter"
          placeholder="@jack"
          defaultValue={user?.twitter}
          required
        />
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="avatar"
          defaultValue={user?.avatar}
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea name="notes" defaultValue={user?.notes} rows={6} />
      </label>
      <p>
        <button type="submit">Save</button>
        <button
          type="button"
          onClick={() =>
            user?.id ? navigate(`../${user.id}`) : navigate('..')
          }
        >
          Cancel
        </button>
      </p>
    </Form>
  );
}
