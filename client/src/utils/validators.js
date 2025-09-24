import * as Yup from "yup";

export const donorRegisterSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Too short!"),
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
  bloodGroup: Yup.string()
    .required("Select blood group"),
  address: Yup.string()
    .required("Address is required")
    .min(5, "Address is too short"),
});


export const hospitalRegisterSchema = Yup.object({
  hospitalName: Yup.string()
    .required("Hospital name is required"),
  adminName: Yup.string()
    .required("Admin name is required"),
  adminEmail: Yup.string()
    .email("Invalid email")
    .required("Admin email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
  location: Yup.string()
    .required("Hospital location is required")
    .min(3, "Enter a valid location"),
});


export const loginSchema = Yup.object({
  emailOrUsername: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});
