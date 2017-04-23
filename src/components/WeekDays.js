import React, { Component } from 'react';
import '../css/styles.css';

export class WeekDays extends Component {
    render() {
        const { weekNumbers, dayNames, startDay } = this.props;
        const haystack = Array.apply(null, { length: 7 }).map(Number.call, Number);
        return (
            <div className="r-row r-weekdays">
                {weekNumbers && <div className="r-cell r-weeknum">{4}</div> }
                {haystack.map((item, i) => <div key={item+i} className="r-cell">{dayNames[(startDay+i)%7]}</div>)}
            </div>
        );
    }
}