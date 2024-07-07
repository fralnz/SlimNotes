export const getCurrentDate = () => {
  let newDate = new Date();
  let day = newDate.getDate().toString().padStart(2, "0");
  let month = (newDate.getMonth() + 1).toString().padStart(2, "0");
  return {
    day: day,
    month: month,
    year: newDate.getFullYear(),
  };
};

export const dateToString = (date, option) => {
  const { day, month, year } = date;
  if (!option || option === 0) {
    return `${year}-${month}-${day}`;
  } else if (option === 1) {
    return `${month}-${day}-${year}`;
  } else if (option === 2) {
    return `${day}-${month}-${year}`;
  }
};

export const transformDate = (dateString, format) => {
  // Split the input date string into an array
  const dateParts = dateString.split("-");

  // Extract the year, month, and day from the array
  const year = dateParts[0];
  const month = dateParts[1];
  const day = dateParts[2];

  // Format the date based on the specified format
  if (format === "DD-MM-YYYY") {
    return `${day}-${month}-${year}`;
  } else if (format === "MM-DD-YYYY") {
    return `${month}-${day}-${year}`;
  } else {
    throw new Error(
      'Invalid format specified. Use "DD-MM-YYYY" or "MM-DD-YYYY".',
    );
  }
};
