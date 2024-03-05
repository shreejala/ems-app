export const getErrorMessage = code => {
  switch (code) {
    case "auth/invalid-credential":
      return {
        text2: "Invalid Credentials",
      };
    case "auth/invalid-email":
      return {
        text2: "Invalid Email",
      };
    case "auth/email-already-in-use":
      return {
        text2: "Email Already Exists",
      };
    case "auth/insufficient-permission":
      return {
        text2: "Insufficient Permission",
      };
    case "auth/internal-error":
      return {
        text2: "Internal Error",
      };
    case "auth/user-not-found":
      return {
        text2: "User not Found",
      };
    case "auth/invalid-email-verified":
      return {
        text2: "Invalid Email Verified",
      };
    case "auth/invalid-password":
      return {
        text2: "Invalid Password",
      };
    case "auth/too-many-requests":
      return {
        text2: "Too Many Requests",
      };
    default:
      return {
        text2: "Error Ocurred",
      };
  }
};
