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

export const sortDates = (arr) => {
  // Filter out non-date elements and convert valid dates to Date objects
  const validDates = arr.filter((dateStr) => {
    // Use a regex pattern to match YYYY-MM-DD format
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      // Try creating a Date object from the string
      const dateObj = new Date(dateStr);
      // Check if the Date object is valid
      return !isNaN(dateObj.getTime());
    }
    return false;
  });

  // Sort the Date objects
  validDates.sort((dateStr1, dateStr2) => {
    const date1 = new Date(dateStr1);
    const date2 = new Date(dateStr2);
    return date1 - date2;
  });

  // Return sorted date strings in YYYY-MM-DD format
  return validDates;
};
