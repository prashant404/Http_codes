import { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Search from './pages/Search';
import Lists from './pages/Lists';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';

const AppContent = () => {
  const { user, logout, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar bg="dark" variant="dark" expand="lg" className="fixed-top">
          <Container>
            <Navbar.Brand as={Link} to="/">HTTP Dog App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                {user ? (
                  <>
                    <Nav.Link as={Link} to="/search">Search</Nav.Link>
                    <Nav.Link as={Link} to="/lists">Lists</Nav.Link>
                  </>
                ) : (
                  <>
                    <Nav.Link as={Link} to="/login">Login</Nav.Link>
                    <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
                  </>
                )}
              </Nav>
              {user && (
                <Button variant="outline-light" onClick={logout}>Logout</Button>
              )}
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Container className="flex-grow-1 mt-5 pt-3">
          <Routes>
            <Route path="/login" element={user ? <Navigate to="/search" /> : <Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/search" element={user ? <Search /> : <Navigate to="/login" />} />
            <Route path="/lists" element={user ? <Lists /> : <Navigate to="/login" />} />
            <Route path="/" element={<Navigate to={user ? "/search" : "/login"} />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;