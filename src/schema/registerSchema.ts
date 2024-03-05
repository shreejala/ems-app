import * as yup from "yup";
import {emailRegexp, passwordRegexp} from "../utils/regex";

const registerSchema = yup.object().shape({
  email: yup
    .string()
    .required("This field is required")
    .matches(emailRegexp, "Invalid email address"),
  password: yup
    .string()
    .required("This field is required")
    .matches(
      passwordRegexp,
      "Invalid Password(8-15 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character)",
    ),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "The password does not match"),
  username: yup.string().required("This field is required"),
  name: yup.string().required("This field is required"),
});

export default registerSchema;
