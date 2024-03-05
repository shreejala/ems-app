import * as yup from "yup";
import {emailRegexp, passwordRegexp} from "../utils/regex";

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required("This field is required")
    .matches(emailRegexp, "Invalid email address"),
  password: yup.string().required("This field is required"),
});

export default loginSchema;
