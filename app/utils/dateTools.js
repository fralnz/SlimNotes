export const getCurrentDate=()=>{
    let newDate = new Date()
    const currentDate={
        day: newDate.getDate(),
        month: newDate.getMonth() + 1,
        year: newDate.getFullYear(),
    }
    return currentDate;
}

export const dateToString = ({ date }) => {
    const {day, month, year} = date;
    return `${day}-${month}-${year}`
};