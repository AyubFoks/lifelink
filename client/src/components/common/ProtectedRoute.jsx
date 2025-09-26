import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";


const ProtectedRoute = ({ allowedRoles, role, children }) => {
  const { isAuthenticated, user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }


  const targetRole = role || (allowedRoles && allowedRoles[0]) || null;
  const loginPath = targetRole === "hospital" || targetRole === "hospital_admin" ? "/login/hospital" : "/login/donor";

  if (!isAuthenticated) {
    return <Navigate to={loginPath} replace />;
  }

  const userRole = user?.role;

 
  if (!targetRole && !allowedRoles) {
    return children || <Outlet />;
  }


  if (allowedRoles) {
   
    const expandedAllowed = allowedRoles.flatMap(r => (r === 'hospital' ? ['hospital', 'hospital_admin'] : [r]));
    if (!expandedAllowed.includes(userRole)) {
      
      console.debug('[ProtectedRoute] Access denied. allowedRoles=', expandedAllowed, 'userRole=', userRole);
      return (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <p className="text-red-600 font-bold">Unauthorized access.</p>
          <p className="text-gray-600 mt-2">You do not have permission to view this page.</p>
        </div>
      );
    }
    return <Outlet />;
  }


  if (role) {
    const normalizedRole = role === "hospital" ? ["hospital", "hospital_admin"] : [role];
    if (!normalizedRole.includes(userRole)) {
  
      console.debug('[ProtectedRoute] Role mismatch. expected=', normalizedRole, 'userRole=', userRole);
      return (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <p className="text-red-600 font-bold">Unauthorized: insufficient role.</p>
          <p className="text-gray-600 mt-2">Expected role: {normalizedRole.join(', ')}, your role: {userRole}</p>
        </div>
      );
    }
    return children || <Outlet />;
  }

  // Fallback: allow
  return children || <Outlet />;
};

export default ProtectedRoute;
