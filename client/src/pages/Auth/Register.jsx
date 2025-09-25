import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate, useParams } from "react-router-dom";
import authService from "../../services/authService";
import { useState } from "react";
import Navbar from "../../components/common/Navbar/Navbar";
import Footer from "../../components/common/Footer/Footer";
import Button from "../../components/ui/Button";

const Register = () => {
  const { role } = useParams(); // 'donor' or 'hospital'
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const isHospital = role === "hospital";

  const initialValues = {
    fullName: "",
    email: "",
    password: "",
    bloodType: "",
    location: "",
    hospitalName: "",
    hospitalAddress: "",
    hospitalContact: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Required"),
    ...(isHospital
      ? {
          hospitalName: Yup.string().required("Hospital Name is required"),
          hospitalAddress: Yup.string().required("Hospital Address is required"),
          hospitalContact: Yup.string().required("Hospital Contact is required"),
        }
      : {
          fullName: Yup.string().required("Full Name is required"),
          bloodType: Yup.string().required("Blood Type is required"),
          location: Yup.string().required("Location is required"),
        }),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setError(null);
    const payload = isHospital
      ? {
          hospitalName: values.hospitalName,
          email: values.email,
          password: values.password,
          hospitalAddress: values.hospitalAddress,
          hospitalContact: values.hospitalContact,
        }
      : {
          fullName: values.fullName,
          email: values.email,
          password: values.password,
          bloodType: values.bloodType,
          location: values.location,
        };

    try {
      const service = isHospital ? authService.registerHospital : authService.register;
      const data = await service(payload);

      if (data.error) {
        throw new Error(data.error.message || "Registration failed.");
      }

      navigate(`/login/${role}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 px-4 sm:px-6 py-12 mt-20">
        <div className="w-full max-w-lg mx-auto text-center">
          <h1 className="font-bold text-3xl">
            Create a New {isHospital ? "Hospital" : "Donor"} Account
          </h1>
          <div className="flex gap-1 text-lg justify-center sm:text-lg">
            <h3>Already have an account?</h3>
            <Link to={`/login/${role}`} className="text-[#921223] underline">
              Sign in here
            </Link>
          </div>
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
          <div className="mt-10">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-6 text-left">
                  {isHospital ? (
                    <>
                      {/* Hospital Fields */}
                      <div>
                        <label htmlFor="hospitalName" className="block mb-2">Hospital Name</label>
                        <Field name="hospitalName" className="w-full p-2 border rounded" />
                        <ErrorMessage name="hospitalName" component="div" className="text-red-600" />
                      </div>
                      <div>
                        <label htmlFor="email" className="block mb-2">Admin Email</label>
                        <Field name="email" type="email" className="w-full p-2 border rounded" />
                        <ErrorMessage name="email" component="div" className="text-red-600" />
                      </div>
                       <div>
                        <label htmlFor="hospitalAddress" className="block mb-2">Hospital Address</label>
                        <Field name="hospitalAddress" className="w-full p-2 border rounded" />
                        <ErrorMessage name="hospitalAddress" component="div" className="text-red-600" />
                      </div>
                       <div>
                        <label htmlFor="hospitalContact" className="block mb-2">Hospital Contact</label>
                        <Field name="hospitalContact" className="w-full p-2 border rounded" />
                        <ErrorMessage name="hospitalContact" component="div" className="text-red-600" />
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Donor Fields */}
                      <div>
                        <label htmlFor="fullName" className="block mb-2">Full Name</label>
                        <Field name="fullName" className="w-full p-2 border rounded" />
                        <ErrorMessage name="fullName" component="div" className="text-red-600" />
                      </div>
                      <div>
                        <label htmlFor="email" className="block mb-2">Email</label>
                        <Field name="email" type="email" className="w-full p-2 border rounded" />
                        <ErrorMessage name="email" component="div" className="text-red-600" />
                      </div>
                       <div>
                        <label htmlFor="bloodType" className="block mb-2">Blood Type</label>
                        <Field as="select" name="bloodType" className="w-full p-2 border rounded">
                            <option value="">Select Blood Type</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </Field>
                        <ErrorMessage name="bloodType" component="div" className="text-red-600" />
                      </div>
                       <div>
                        <label htmlFor="location" className="block mb-2">Location</label>
                        <Field name="location" className="w-full p-2 border rounded" />
                        <ErrorMessage name="location" component="div" className="text-red-600" />
                      </div>
                    </>
                  )}
                  <div>
                    <label htmlFor="password">Password</label>
                    <Field name="password" type="password" className="w-full p-2 border rounded" />
                    <ErrorMessage name="password" component="div" className="text-red-600" />
                  </div>
                  <div className="mt-6">
                    <Button type="submit" disabled={isSubmitting} className="w-full text-white">
                      {isSubmitting ? "Registering..." : "Register"}
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
};

export default Register;