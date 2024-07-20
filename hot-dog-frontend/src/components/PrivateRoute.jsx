import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ element }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  return user ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
