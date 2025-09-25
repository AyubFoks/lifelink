import Navbar from "../../components/common/Navbar/Navbar";
import Footer from "../../components/common/Footer/Footer";
import  {Link, useNavigate, useParams }  from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useAuth } from "../../context/AuthContext";
import { loginSchema } from "../../utils/validators";
import Button from "../../components/ui/Button";

export default function Login() {
    const { role } = useParams(); // 'donor' or 'hospital'
    const { login } = useAuth();
    const nav = useNavigate();

    const initial = { emailOrUsername: "", password: "" };

    const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
       // Build payload mapping according to role:
       const payload = role === "hospital"
        ? {
          hospitalName: values.emailOrUsername,
          password: values.password,
        }
        : {
          email: values.emailOrUsername,
          password: values.password,
        };

        const res = await login(payload);
        setSubmitting(false);
        if (res?.error) {
          setFieldError("emailOrUsername", res.error.message || "Login failed");
        } else {
          // route after login
          if (role === "hospital") nav("/dashboard/hospital");
          else nav("/dashboard/donor"); // donor dashboard
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar/>
            <main className="flex-1 px-4 sm:px-6 py-12 mt-20">
                <div className="w-full max-w-lg mx-auto text-center">
                    <h1 className="font-bold text-3xl">Log In to Your {role === "hospital" ? "Hospital" : "Donor"} Account</h1>
                    <div className="flex gap-1 text-lg justify-center sm:text-lg">
                        <h3>Don't have an account?</h3>
                        <Link to={`/register/${role}`} className="text-[#921223] underline">Sign up here</Link>
                    </div>
                    <div className="mt-20">
                        <Formik initialValues={initial} validationSchema={loginSchema} onSubmit={handleSubmit}>
                            {({ isSubmitting }) => (
                                <Form>
                                    <label className="block mb-2"> {role === "hospital" ? "Hospital Admin Email" : "Email"} </label>
                                    <Field name="emailOrUsername" placeholder="email address" className="w-full md:w-1/2 p-2 border rounded mb-2" autoComplete="email"/>
                                    <ErrorMessage name="emailOrUsername" component="div" className="text-red-600" />

                                    <label className="block mt-4 mb-2">Password</label>
                                    <Field name="password" type="password" placeholder="password" className="w-full md:w-1/2 p-2 border rounded mb-2" autoComplete="current-password" />
                                    <ErrorMessage name="password" component="div" className="text-red-600" />

                                    <div className="mt-6">
                                        <Button type="submit" className="w-full md:w-1/2 text-white">{isSubmitting ? "Signing in..." : "Sign In"}</Button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    )
}