const getCurrentDate = (): string => {
  // Get the current date
  const timestamp = new Date();

  // Formatting options for the desired output "YYYY-MM-DD"
  const options = {year: "numeric", month: "2-digit", day: "2-digit"} as const;
  const formattedDate = timestamp.toLocaleDateString("fr-CA", options);

  // console.log("Leave Ko created Date", formattedDate);

  return formattedDate;
};

export default getCurrentDate;
