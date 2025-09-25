import Navbar from "../../components/common/Navbar/Navbar";
import Footer from "../../components/common/Footer/Footer";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useAuth } from "../../context/AuthContext";
import { loginSchema } from "../../utils/validators";
import Button from "../../components/ui/Button";
import React, { useState } from "react";
import SuccessScreen from "../../components/ui/SuccessScreen";

export default function Login() {
  const { role: rawRole } = useParams(); // 'donor', 'hospital' or backend 'hospital_admin'
  // normalize role param: accept plural forms like 'hospitals' and backend names like 'hospital_admin'
  const role = (rawRole || '').toLowerCase().replace(/s$/, '');
  const { login } = useAuth();
  const nav = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null); // State to hold the logged-in user's data

  const initial = { emailOrUsername: "", password: "" };

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    // Support both frontend-friendly 'hospital' and backend 'hospital_admin' values
  const urlRoleIsHospital = role === "hospital" || role === "hospital_admin";

    // If the identifier looks like an email (contains @), send it as email; otherwise send as hospitalName for hospital logins.
    const identifier = values.emailOrUsername.trim();
    const looksLikeEmail = identifier.includes("@");

    // Build payload mapping according to what the user entered and the login page type
    const payload = looksLikeEmail || !urlRoleIsHospital
      ? {
          email: identifier,
          password: values.password,
        }
      : {
          hospitalName: identifier,
          password: values.password,
        };

    try {
      const res = await login(payload);
      setSubmitting(false);

      if (res?.error) {
        setFieldError("emailOrUsername", res.error.message || "Login failed");
        return;
      }

      // Set the user data and show the success screen
      setLoggedInUser(res.user);
      setShowSuccess(true);

      // Route based on the returned user role (more reliable than the URL param)
      const returnedRole = res.user?.role;
      setTimeout(() => {
        if (returnedRole === "hospital_admin") nav("/dashboard/hospital");
        else if (returnedRole === "donor") nav("/dashboard/donor");
        else nav('/');
      }, 1000);
    } catch (error) {
      setSubmitting(false);
      // Display a form-level error
      setFieldError("emailOrUsername", error?.message || "Login failed");
    }
  };

  if (showSuccess) return <SuccessScreen user={loggedInUser} />;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 px-4 sm:px-6 py-12 mt-20">
        <div className="w-full max-w-lg mx-auto text-center">
          <h1 className="font-bold text-3xl">
            {/* Accept either 'hospital' or backend 'hospital_admin' as hospital */}
            Log In to Your {(role === "hospital" || role === "hospital_admin") ? "Hospital" : "Donor"} Account
          </h1>
          <div className="flex gap-1 text-lg justify-center sm:text-lg">
            <h3>Don't have an account?</h3>
            <Link to={`/register/${(role === "hospital_admin" ? "hospital" : role)}`} className="text-[#921223] underline">
              Sign up here
            </Link>
          </div>
          <div className="mt-20">
            <Formik
              initialValues={initial}
              validationSchema={loginSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <label className="block mb-2">
                    {" "}
                    {role === "hospital"
                      ? "Hospital Admin Email"
                      : "Email"}{" "}
                  </label>
                  <Field
                    name="emailOrUsername"
                    placeholder="email address"
                    className="w-full md:w-1/2 p-2 border rounded mb-2"
                    autoComplete="email"
                  />
                  <ErrorMessage
                    name="emailOrUsername"
                    component="div"
                    className="text-red-600"
                  />

                  <label className="block mt-4 mb-2">Password</label>
                  <Field
                    name="password"
                    type="password"
                    placeholder="password"
                    className="w-full md:w-1/2 p-2 border rounded mb-2"
                    autoComplete="current-password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-600"
                  />

                  <div className="mt-6">
                    <Button type="submit" className="w-full md:w-1/2 text-white">
                      {isSubmitting ? "Signing in..." : "Sign In"}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}