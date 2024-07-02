import { Link, Navigate, Route, Routes, useMatch } from "react-router-dom";
import Notes from "./Notes";
import Users from "./Users";
import Home from "./Home";
import { useState } from "react";
import Note from "./Note";
import Login from "./Login";
import { Alert, Nav, Navbar } from "react-bootstrap";

const App = () => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      content: "HTML is easy",
      important: true,
      user: "Matti Luukkainen",
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false,
      user: "Matti Luukkainen",
    },
    {
      id: 3,
      content: "Most important methods of HTTP-protocol are GET and POST",
      important: true,
      user: "Arto Hellas",
    },
  ]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const match = useMatch("/notes/:id");

  const note = match
    ? notes.find((note) => note.id === Number(match.params.id))
    : null;

  function login(user) {
    setUser(user);
    setMessage(`Welcome ${user}`);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  }
  const padding = {
    padding: 5,
  };

  return (
    <div className="container">
      {message && <Alert variant="success">{message}</Alert>}
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/">
                home
              </Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/notes">
                notes
              </Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/users">
                users
              </Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              {user ? (
                <em>{user} logged in</em>
              ) : (
                <Link style={padding} to="/login">
                  login
                </Link>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={login} />} />
        <Route
          path="/users"
          element={user ? <Users /> : <Navigate replace to="/login" />}
        />
        <Route path="/notes" element={<Notes notes={notes} />} />
        <Route path="/notes/:id" element={<Note note={note} />} />
      </Routes>

      <footer>
        <i>Note app, Department of Computer Science 2024</i>
      </footer>
    </div>
  );
};

export default App;
