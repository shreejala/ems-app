export const getDateOnly = timestamp => {
  if (!timestamp || !timestamp.seconds) {
    console.error("Invalid timestamp provided");
    return null;
  }

  const seconds = timestamp.seconds;
  const date = new Date(seconds * 1000); // Convert seconds to milliseconds
  const formattedDate = date.toISOString().split("T")[0]; // Get only the date part

  //   console.log("getDate", formattedDate);

  return formattedDate;
};
