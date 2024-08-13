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

export const checkIfDate = (dateString) => {
  // Split the input date string into an array
  const dateParts = dateString.split("-");

  // Check if there are exactly three parts
  if (dateParts.length !== 3) {
    return false;
  }

  // Extract the year, month, and day from the array
  const [year, month, day] = dateParts;

  // Check if year, month, and day are numbers
  if (isNaN(year) || isNaN(month) || isNaN(day)) {
    return false;
  }

  // Optionally, you can add more checks here to validate the date further
  // Example: Check if month is between 1 and 12 and day is between 1 and 31
  const monthNum = parseInt(month, 10);
  const dayNum = parseInt(day, 10);

  if (monthNum < 1 || monthNum > 12 || dayNum < 1 || dayNum > 31) {
    return false;
  }

  // If all checks pass, return true
  return true;
};

export const transformDate = (dateString, format) => {
  // Split the input date string into an array
  const dateParts = dateString.split("-");

  // Extract the year, month, and day from the array
  const year = dateParts[0];
  const month = dateParts[1];
  const day = dateParts[2];

  // Format the date based on the specified format
  if (format === "DD-MM-YYYY" || !format) {
    return `${day}-${month}-${year}`;
  } else if (format === "MM-DD-YYYY") {
    return `${month}-${day}-${year}`;
  } else if (format === "YYYY-MM-DD") {
    return `${year}-${month}-${day}`;
  } else {
    throw new Error(
      'Invalid format specified. Use "DD-MM-YYYY", "MM-DD-YYYY" or "YYYY-MM-DD".',
    );
  }
};

export const sortDates = (arr) => {
  // Initialize arrays for valid and invalid dates
  const validDates = [];
  const invalidDates = [];

  // Process each element in the input array
  arr.forEach((dateStr) => {
    // Exclude elements that start with '@'
    if (dateStr.startsWith("@")) {
      return; // Skip this iteration
    }

    // Use a regex pattern to match YYYY-MM-DD format
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      // Try creating a Date object from the string
      const dateObj = new Date(dateStr);
      // Check if the Date object is valid
      if (!isNaN(dateObj.getTime())) {
        validDates.push(dateStr);
      } else {
        invalidDates.push(dateStr);
      }
    } else {
      invalidDates.push(dateStr);
    }
  });

  // Sort the valid date strings
  validDates.sort((dateStr1, dateStr2) => {
    const date1 = new Date(dateStr1);
    const date2 = new Date(dateStr2);
    return date1 - date2;
  });

  // Return an object with valid dates and invalid dates
  return {
    validDates,
    invalidDates,
  };
};

export const getPreviousDay = (dateString) => {
  let date = new Date(dateString);
  date.setDate(date.getDate() - 1);
  return date.toISOString().split("T")[0];
};

export const getNextDay = (dateString) => {
  let date = new Date(dateString);
  date.setDate(date.getDate() + 1);
  return date.toISOString().split("T")[0];
};
