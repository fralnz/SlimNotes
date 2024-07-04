export const getCurrentDate = () => {
    let newDate = new Date()
    let day = newDate.getDate().toString().padStart(2, '0');
    let month = (newDate.getMonth() + 1).toString().padStart(2, '0');
    return {
        day: day,
        month: month,
        year: newDate.getFullYear(),
    };
}

export const dateToString = (date) => {
    const {day, month, year} = date;
    return `${day}-${month}-${year}`
};
