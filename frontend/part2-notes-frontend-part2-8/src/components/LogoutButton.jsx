function LogoutButton({ onSetUser }) {
  function handleClick() {
    onSetUser(null);
    window.localStorage.removeItem("loggedNoteAppUser");
  }
  return <button onClick={handleClick}>Log out</button>;
}

export default LogoutButton;
