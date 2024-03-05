import * as yup from "yup";

const ProfileContentSchema = yup.object().shape({
  description: yup
    .string()
    .required("This field is required")
    .min(30, "Description must be at least 30 characters"),
});

export default ProfileContentSchema;
