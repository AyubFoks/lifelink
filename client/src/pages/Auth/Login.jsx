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
          else nav("/"); // donor dashboard later
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar/>
            <main className="py-25">
                <div className="w-1/2 mx-auto text-center">
                    <h1 className="font-bold text-3xl">Log In to Your {role === "hospital" ? "Hospital" : "Donor"} Account</h1>
                    <div className="flex gap-1 text-lg justify-center">
                        <h3>Don't have an account?</h3>
                        <Link to='/register' className="text-[#921223] underline">Sign up here</Link>
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    )
}