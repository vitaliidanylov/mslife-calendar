import React, { Component } from 'react';
import { getDates } from '../utils/utils';
import '../css/styles.css';

export class MonthDates extends Component {

    constructor(props){
        super(props)
        this.addToDeliveryDates = this.props.addToDeliveryDates.bind(this)
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     // console.log(this.props);
    //     const { deliveryStart, deliveryEnd, year, month } = this.props;
    //     console.log(deliveryStart, deliveryEnd, year, month);
    //     // return true;
    //     if( nextProps.deliveryEnd != deliveryEnd || 
    //         nextProps.deliveryStart != deliveryStart ||
    //         nextProps.month != month ||
    //         nextProps.year != year){                
    //             if(nextProps.deliveryEnd, deliveryStart){
    //                 const datesRange = getDates(deliveryStart, nextProps.deliveryEnd);
    //                 this.addToDeliveryDates(datesRange);
    //             }
    //             return true;
    //     } else {
    //         return false;
    //     }
    // }
    

    render() {
        const { firstOfMonth, year, daysInMonth, month, selectDeliveryDate, deliveryStart, deliveryEnd,  } = this.props;
        let haystack,
            day,
            d,
            isDate,
            className,
            weekStack = Array.apply(null, { length: 7 }).map(Number.call, Number),
            startDay = firstOfMonth.getUTCDay(),
            first = firstOfMonth.getDay(),
            // janOne = new Date(year, 0, 1),
            rows = 5;

        if (startDay === 5 && daysInMonth === 31 || startDay === 6 && daysInMonth > 29) {
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
                                    let s;
                                    if(deliveryEnd && deliveryStart){
                                        let temp = new Date(year,month,d);
                                        s = deliveryStart.getTime() <= temp.getTime() && temp.getTime() <= deliveryEnd.getTime()
                                    } else {
                                        s = false;
                                    }
                                    return <button onClick={selectDeliveryDate.bind(this, d)} key={item+i} className={s ? 'r-cell r-date blue':'r-cell r-date'}>{d}</button>
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