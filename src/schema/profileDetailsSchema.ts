import * as yup from "yup";

const ProfileDetailsSchema = yup.object().shape({
  username: yup.string().required("This field is required"),
  subtitle: yup.string().required("This field is required"),
  tel: yup
    .string()
    .required("This field is required")
    .matches(/^98\d{8}$/, "Must start with 98 and be 10 digits long"),
  linkedIn: yup
    .string()
    .required("This field is required")
    .matches(
      /^(https:\/\/www\.linkedin\.com\/|https:\/\/linkedin\.com\/)/,
      "Must start with https://linkedin.com or https://www.linkedin.com",
    ),
});

export default ProfileDetailsSchema;
