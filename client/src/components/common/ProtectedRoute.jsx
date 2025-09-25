import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

/**
 * ProtectedRoute supports two usages:
 * 1) <ProtectedRoute allowedRoles={['donor']} /> as a wrapper for <Outlet /> (AppRoutes.jsx)
 * 2) <ProtectedRoute role="donor">children</ProtectedRoute> where children are rendered directly (App.jsx)
 */
const ProtectedRoute = ({ allowedRoles, role, children }) => {
  const { isAuthenticated, user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  // Helper to pick login path based on expected role
  const targetRole = role || (allowedRoles && allowedRoles[0]) || null;
  const loginPath = targetRole === "hospital" || targetRole === "hospital_admin" ? "/login/hospital" : "/login/donor";

  if (!isAuthenticated) {
    return <Navigate to={loginPath} replace />;
  }

  const userRole = user?.role;

  // allow if no role restriction
  if (!targetRole && !allowedRoles) {
    return children || <Outlet />;
  }

  // If allowedRoles is provided (Outlet usage)
  if (allowedRoles) {
    // normalize hospital role names if needed
    const expandedAllowed = allowedRoles.flatMap(r => (r === 'hospital' ? ['hospital', 'hospital_admin'] : [r]));
    if (!expandedAllowed.includes(userRole)) {
      // Log useful debug info to the console so we can inspect in the browser
      // (This will appear in the browser devtools console when you reproduce the issue.)
      // eslint-disable-next-line no-console
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

  // If role prop is provided (children usage)
  // Accept backend role 'hospital_admin' when role==='hospital'
  if (role) {
    const normalizedRole = role === "hospital" ? ["hospital", "hospital_admin"] : [role];
    if (!normalizedRole.includes(userRole)) {
      // eslint-disable-next-line no-console
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
