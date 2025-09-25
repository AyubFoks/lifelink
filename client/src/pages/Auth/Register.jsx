import Navbar from "../../components/common/Navbar/Navbar";
import Footer from "../../components/common/Footer/Footer";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate, useParams } from "react-router-dom";
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

        return (
          <div className="flex flex-col min-h-screen">
            <Navbar/>
            <main>
                <div className="max-w-lg mx-auto py-25">
                    <h1 className="text-3xl font-bold text-center mb-6">Create your Hospital Account</h1>
                    <Formik
                     initialValues={initial}
                     validationSchema={schema}
                     onSubmit={async (values, { setSubmitting }) => {
                         setSubmitting(true);
                         const res = await register({ ...values, role: "hospital" });
                         setSubmitting(false);
                         if (!res?.error) nav("/login/hospital");
                        }}
                    >
                        {({ isSubmitting }) => (
                           <Form className="space-y-4">
                                <div>
                                  <label className="block mb-2">Hospital Name</label>
                                  <Field name="hospitalName" className="w-full p-2 border rounded" />
                                  <ErrorMessage name="hospitalName" component="div" className="text-red-600" />
                                </div>
                                <div>
                                  <label className="block mb-2">Admin Name</label>
                                  <Field name="adminName" className="w-full p-2 border rounded" />
                                  <ErrorMessage name="adminName" component="div" className="text-red-600" />
                                </div>
                                <div>
                                  <label className="block mb-2">Admin Email</label>
                                  <Field name="adminEmail" type="email" className="w-full p-2 border rounded" />
                                  <ErrorMessage name="adminEmail" component="div" className="text-red-600" />
                                </div>
                                <div>
                                  <label className="block mb-2">Hospital Location</label>
                                  <Field name="location" className="w-full p-2 border rounded" />
                                  <ErrorMessage name="location" component="div" className="text-red-600" />
                                </div>
                                <div>
                                  <label className="block mb-2">Password</label>
                                  <Field name="password" type="password" className="w-full p-2 border rounded" />
                                  <ErrorMessage name="password" component="div" className="text-red-600" />
                                </div>
                                <div>
                                  <label className="block mb-2">Confirm Password</label>
                                  <Field name="confirmPassword" type="password" className="w-full p-2 border rounded" />
                                  <ErrorMessage name="confirmPassword" component="div" className="text-red-600" />
                                </div>
                                <Button type="submit" className="w-full text-white">
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

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar/>
            <main>
                <div className="max-w-lg mx-auto py-25">
                    <h1 className="text-3xl font-bold text-center mb-6">Create your Donor Account</h1>
                    <Formik
                      initialValues={initialDonor}
                      validationSchema={schema}
                      onSubmit={async (values, { setSubmitting }) => {
                         setSubmitting(true);
                         const res = await register({ ...values, role: "donor" });
                         setSubmitting(false);
                         if (!res?.error) nav("/login/donor");
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form className="space-y-4">
                                <div>
                                    <label className="block mb-2">Full Name</label>
                                    <Field name="name" className="w-full p-2 border rounded" />
                                    <ErrorMessage name="name" component="div" className="text-red-600" />
                                </div>
                                <div>
                                    <label className="block mb-2">Email</label>
                                    <Field name="email" type="email" className="w-full p-2 border rounded" />
                                    <ErrorMessage name="email" component="div" className="text-red-600" />
                                </div>
                                <div>
                                    <label className="block mb-2">Address</label>
                                    <Field name="address" className="w-full p-2 border rounded" />
                                    <ErrorMessage name="address" component="div" className="text-red-600" />
                                </div>
                                <div>
                                    <label className="block mb-2">Password</label>
                                    <Field name="password" type="password" className="w-full p-2 border rounded" />
                                    <ErrorMessage name="password" component="div" className="text-red-600" />
                                </div>
                                <div>
                                    <label className="block mb-2">Confirm Password</label>
                                    <Field name="confirmPassword" type="password" className="w-full p-2 border rounded" />
                                    <ErrorMessage name="confirmPassword" component="div" className="text-red-600" />
                                </div>
                                <div>
                                    <label className="block mb-2">Blood Group</label>
                                    <Field as="select" name="bloodGroup" className="w-full p-2 border rounded">
                                        <option>A+</option><option>A-</option>
                                        <option>B+</option><option>B-</option>
                                        <option>AB+</option><option>AB-</option>
                                        <option>O+</option><option>O-</option>
                                    </Field>
                                    <ErrorMessage name="bloodGroup" component="div" className="text-red-600" />
                                </div>
                                <Button type="submit" className="w-full text-white">
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