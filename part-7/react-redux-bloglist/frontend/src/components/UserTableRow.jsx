function UserTableRow({ user }) {
  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.blogs.length}</td>
    </tr>
  );
}

export default UserTableRow;
