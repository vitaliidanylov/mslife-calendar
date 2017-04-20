import React, { Component } from 'react';

export class WeekDays extends Component {
    render() {
        const { weekNumbers, dayNames, startDay } = this.props;
        const haystack = Array.apply(null, { length: 7 }).map(Number.call, Number);
        return (
            <div className="r-row r-weekdays">
                {weekNumbers && <div className="r-cell r-weeknum">wn</div> }
                {haystack.map((item, i) => dayNames[startDay+i]%7)}
            </div>
        );
    }
}