import Navbar from "../../components/common/Navbar/Navbar";
import Footer from "../../components/common/Footer/Footer";
import React, {useState} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { donorRegisterSchema, hospitalRegisterSchema } from "../../utils/validators";
import Button from "../../components/ui/Button";

export default function Register() {
    const { role } = useParams(); // donor | hospital
    const { register } = useAuth();
    const nav = useNavigate();

    if (role === "hospital") {
        const initial = {
           hospitalName: "",
           adminName: "",
           adminEmail: "",
           location: "",
           password: "",
           confirmPassword: "",
        };
        const schema = hospitalRegisterSchema;
        const [showSuccess, setShowSuccess] = useState(false);

        if (showSuccess) return <SuccessScreen user={user} />;

        return (
          <div className="flex flex-col min-h-screen">
            <Navbar/>
            <main className="flex-1 px-4 sm:px-6 py-12 mt-20">
                <div className="w-full max-w-lg mx-auto">
                    <h1 className="text-3xl font-bold text-center">Create your Hospital Account</h1>
                    <div className="flex gap-1 text-lg justify-center mb-8">
                        <h3>Already have an account?</h3>
                        <Link to={`/login/${role}`} className="text-[#921223] underline">Log in here</Link>
                    </div>
                    <Formik
                     initialValues={initial}
                     validationSchema={schema}

                     onSubmit={async (values, { setSubmitting }) => {
                        setSubmitting(true);
                        const res = await register({ ...values, role: "hospital" });
                        setSubmitting(false);

                        if (!res?.error) {
                            setShowSuccess(true);
                            setTimeout(() => {
                                nav("/dashboard/hospital");
                            }, 10000);
                        }
                      }}
                    >
                        {({ isSubmitting }) => (
                           <Form className="space-y-4 mt-20">
                                <div>
                                  <label className="block mb-2">Hospital Name</label>
                                  <Field name="hospitalName" className="w-full p-2 border rounded" placeholder="hospital name" autoComplete="name"/>
                                  <ErrorMessage name="hospitalName" component="div" className="text-red-600" />
                                </div>
                                <div>
                                  <label className="block mb-2">Admin Name</label>
                                  <Field name="adminName" className="w-full p-2 border rounded" placeholder="admin full name" autoComplete="name"/>
                                  <ErrorMessage name="adminName" component="div" className="text-red-600" />
                                </div>
                                <div>
                                  <label className="block mb-2">Admin Email</label>
                                  <Field name="adminEmail" type="email" className="w-full p-2 border rounded" placeholder="work email"autoComplete="email"/>
                                  <ErrorMessage name="adminEmail" component="div" className="text-red-600" />
                                </div>
                                <div>
                                  <label className="block mb-2">Hospital Location</label>
                                  <Field name="location" className="w-full p-2 border rounded" placeholder="hospital physical address/location"/>
                                  <ErrorMessage name="location" component="div" className="text-red-600" />
                                </div>
                                <div>
                                  <label className="block mb-2">Password</label>
                                  <Field name="password" type="password" className="w-full p-2 border rounded" placeholder="password" autoComplete="new-password" />
                                  <ErrorMessage name="password" component="div" className="text-red-600" />
                                </div>
                                <div>
                                  <label className="block mb-2">Confirm Password</label>
                                  <Field name="confirmPassword" type="password" className="w-full p-2 border rounded" placeholder="password" autoComplete="new-password" />
                                  <ErrorMessage name="confirmPassword" component="div" className="text-red-600" />
                                </div>
                                <Button type="submit" className="w-full text-white mt-6">
                                  {isSubmitting ? "Registering..." : "Register"}
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </main>
            <Footer/>
          </div>
        );
    }

    // donor form
    const initialDonor = {
        name: "",
        email: "",
        address: "",
        password: "",
        confirmPassword: "",
        bloodGroup: "A+",
    };
    const schema = donorRegisterSchema;
    const [showSuccess, setShowSuccess] = useState(false);

    if (showSuccess) return <SuccessScreen user={user} />;

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar/>
            <main className="flex-1 px-4 sm:px-6 py-12 mt-20">
                <div className="w-full max-w-lg mx-auto">
                    <h1 className="text-3xl font-bold text-center">Create your Donor Account</h1>
                    <div className="flex gap-1 text-lg justify-center mb-6 sm:text-lg">
                        <h3>Already have an account?</h3>
                        <Link to={`/login/${role}`} className="text-[#921223] underline">Log in here</Link>
                    </div>
                    <Formik
                      initialValues={initialDonor}
                      validationSchema={schema}
                      onSubmit={async (values, { setSubmitting }) => {
                        setSubmitting(true);
                        const res = await register({ ...values, role: "donor" });
                        setSubmitting(false);

                        if (!res?.error) {
                            setShowSuccess(true);
                            setTimeout(() => {
                                nav("/dashboard/donor");
                            }, 10000);
                        }
                      }}
                    >
                        {({ isSubmitting }) => (
                            <Form className="space-y-4  mt-20">
                                <div>
                                    <label className="block mb-2">Full Name</label>
                                    <Field name="name" className="w-full p-2 border rounded" placeholder="full name" autoComplete="name"/>
                                    <ErrorMessage name="name" component="div" className="text-red-600" />
                                </div>
                                <div>
                                    <label className="block mb-2">Email</label>
                                    <Field name="email" type="email" className="w-full p-2 border rounded" placeholder="email address" autoComplete="email"/>
                                    <ErrorMessage name="email" component="div" className="text-red-600" />
                                </div>
                                <div>
                                    <label className="block mb-2">Password</label>
                                    <Field name="password" type="password" className="w-full p-2 border rounded" placeholder="password" autoComplete="new-password" />
                                    <ErrorMessage name="password" component="div" className="text-red-600" />
                                </div>
                                <div>
                                    <label className="block mb-2">Confirm Password</label>
                                    <Field name="confirmPassword" type="password" className="w-full p-2 border rounded" placeholder="password" autoComplete="new-password"/>
                                    <ErrorMessage name="confirmPassword" component="div" className="text-red-600" />
                                </div>
                                <div className="flex gap-2 w-full justify-between">
                                    <div className="flex-1">
                                        <label className="block mb-2">Blood Group</label>
                                        <Field as="select" name="bloodGroup" className="w-full p-2 border rounded">
                                            <option>A+</option><option>A-</option>
                                            <option>B+</option><option>B-</option>
                                            <option>AB+</option><option>AB-</option>
                                            <option>O+</option><option>O-</option>
                                        </Field>
                                        <ErrorMessage name="bloodGroup" component="div" className="text-red-600" />
                                    </div>
                                    <div className="flex-1">
                                        <label className="block mb-2">Address</label>
                                        <Field name="address" className="w-full p-2 border rounded" placeholder="physical address"/>
                                        <ErrorMessage name="address" component="div" className="text-red-600" />
                                    </div>
                                </div>
                                <Button type="submit" className="w-full text-white mt-6">
                                    {isSubmitting ? "Registering..." : "Register"}
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </main>
            <Footer/>
        </div>
    );
}