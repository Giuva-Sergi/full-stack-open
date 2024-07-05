import UserTableRow from "./UserTableRow";

function UsersTable({ users }) {
  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Blogs created</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <UserTableRow key={user.id} user={user} />
        ))}
      </tbody>
    </table>
  );
}

export default UsersTable;
