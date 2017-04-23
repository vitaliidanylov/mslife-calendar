import React, { Component } from 'react';
import '../css/styles.css';

export class MonthDates extends Component {

    render() {
        const { firstOfMonth, year, daysInMonth, month, disablePast, minDate, today, weekNumbers } = this.props;
        let haystack,
            day,
            d,
            current,
            isDate,
            className,
            weekStack = Array.apply(null, { length: 7 }).map(Number.call, Number),
            startDay = firstOfMonth.getUTCDay(),
            first = firstOfMonth.getDay(),
            janOne = new Date(year, 0, 1),
            rows = 5;

        // console.log('first', firstOfMonth.getDay());
        // console.log('first', firstOfMonth.getUTCDay());
        if (startDay == 5 && daysInMonth == 31 || startDay == 6 && daysInMonth > 29) {
            rows = 6;
        }
        className = rows === 6 ? 'r-dates' : 'r-dates r-fix';
        haystack = Array.apply(null, { length: rows }).map(Number.call, Number);
        day = startDay + 1 - first;
        while (day > 1) {
            day -= 7;
        }
        day -= startDay;

        return (
            <div className={className}>
                {haystack.map((item,i)=>{
                    d = day + i * 7;
                    return (
                        <div key={item+i} className="r-row">
                            {weekStack.map((item,i)=>{
                                d += 1;
                                isDate = d > 0 && d <= daysInMonth;
                                if(isDate){
                                    className = new Date(year, month, d) != today ? 'r-cell r-date':'r-cell r-date r-today'                                   
                                    return <button key={item+i} className={className}>{d}</button>
                                }
                                return <button key={item+i} className='r-cell' />
                            })}
                        </div>
                    )
                })}
            </div>
        );
    }
}

MonthDates.defaultProps = {
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    date: new Date().getDate(),
    today: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
};