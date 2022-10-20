export const dateExtractor = (date) => {
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    const dateObject = new Date(date);
    const today = new Date();
    // const tomorrow = (today.getUTCDay() + 1) === (dateObject.getUTCDay() + 1) ? "Tomorrow" : null;
    
    let dates = days[dateObject.getUTCDay()]

    if (today.getUTCDay() === dateObject.getUTCDay()) dates =  "Today"
    
    // if (tomorrow) dates = "Tomorrow";

    return `${dates}`;
}

export const groupWeatherDates = (list = []) => {
    if (!list || !list.length) return {};
    const result = list.reduce((prev, current) => {
        const extractDate = dateExtractor(current.dt_txt);
        if (prev[extractDate]) {
            prev[extractDate].push(current)
        } else {
            prev[extractDate] = [current];
        }
        return prev;
    }, {})
    return result
}