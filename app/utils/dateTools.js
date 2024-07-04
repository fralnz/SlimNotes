export const getCurrentDate=()=>{
    let newDate = new Date()
    return {
      day: newDate.getDate(),
      month: newDate.getMonth() + 1,
      year: newDate.getFullYear(),
    };
}

export const dateToString = (date) => {
    const {day, month, year} = date;
    return `${day}-${month}-${year}`
};