export function getDates(startDate, stopDate) {
    let days = [];
    for (var d = startDate; d <= stopDate; d.setDate(d.getDate() + 1)) {
        days.push(new Date(d));
    }
    return days;
}