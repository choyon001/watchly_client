import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import Swal from "sweetalert2";
import { RingLoader } from "react-spinners";

const PrivateRoute = ({ children }) => {
  const { user,loading } = useContext(AuthContext);
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <RingLoader color="#36d7b7" size={50} />
      </div>
    );
  }
  if (!user) {
    Swal.fire({
      icon: "error",
      title: "Access Denied",
      text: "You must be logged in to view this page.",
    });
    return <Navigate to="/auth/login" replace />;
  }
  return children;
};

export default PrivateRoute;
