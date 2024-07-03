import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearSelectedUser, getSelectedUser } from "../reducers/userReducer";

function User() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(clearSelectedUser());
    dispatch(getSelectedUser(id));
  }, []);

  if (!selectedUser) {
    return <div>loading user...</div>;
  }
  return (
    <div>
      <h2>{selectedUser.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {selectedUser.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default User;
