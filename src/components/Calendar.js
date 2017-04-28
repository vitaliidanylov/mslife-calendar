import React, { Component } from 'react';
import { MonthDates } from './MonthDates';
import { WeekDays } from './WeekDays';
import { getDates } from '../utils/utils';
import '../css/styles.css';

export class Calendar extends Component {

    constructor(props){
        super(props);
        let d = new Date();
        this.state = {
            year: d.getFullYear(),
            month: d.getMonth(),
            selectedYear: d.getFullYear(),
            selectedMonth: d.getMonth(),
            startDay: 1,
            selectedDate: null,
            deliveryStart: null,
            deliveryEnd: null,
            firstOfMonth: null,
            daysInMonth: null,
            deliveryRange: []
        }
    }

    showState = () => {
        console.log(this.state);
    }

    removeDayOfTheWeek = (numberOfTheWeek) => {
        const { deliveryRange } = this.state;
        if(deliveryRange.length > 0){
            const newRange = []
        }
    }

    selectDeliveryDate = (deliveryStart, deliveryEnd, year, month, d) => {

        if(!deliveryStart){
            this.setState({
                deliveryStart: new Date(year, month, d),
            })
        } else if (deliveryStart && !deliveryEnd){
            const newDate = new Date(year, month, d);
            console.log('newDate >>>',newDate);
            if(deliveryStart.getTime() == newDate.getTime()){
                const deliveryRange = getDates(deliveryStart, newDate);
                this.setState({
                    deliveryEnd: newDate,
                    deliveryRange
                })
                console.log(deliveryRange);                
            }
            else if(deliveryStart.getTime() > newDate.getTime()){
                const deliveryRange = getDates(newDate, deliveryStart);
                this.setState({
                    deliveryStart: newDate,
                    deliveryEnd: deliveryStart,
                    deliveryRange
                })
                console.log(deliveryRange);                
            } else if(deliveryStart.getTime() < newDate.getTime()) {
                const deliveryRange = getDates(deliveryStart, newDate);                
                this.setState({
                    deliveryEnd: newDate,
                    deliveryRange
                })
                console.log(deliveryRange);
            }
        } else if (deliveryStart && deliveryEnd){
            const newDate = new Date(year, month, d);
            if(deliveryStart.getTime() <= deliveryEnd.getTime() && newDate.getTime() > deliveryEnd.getTime()){
                const deliveryRange = getDates(deliveryStart, newDate);
                this.setState({
                    deliveryEnd: newDate,
                    deliveryRange
                })
                console.log(deliveryRange);
            } else if(deliveryStart.getTime() <= deliveryEnd.getTime() && newDate.getTime() < deliveryStart.getTime()){
                const deliveryRange = getDates(newDate, deliveryEnd);
                this.setState({
                    deliveryStart: newDate,
                    deliveryRange
                })
                console.log(deliveryRange);
            } 
        }

    }

    resetDeliveryDate = () => {
        this.setState({
            deliveryEnd: null,
            deliveryStart: null
        })
    }

    estimateDate = (year, month) => {
        return {
            firstOfMonth: new Date(year, month, 1),
            daysInMonth: new Date(year, month+1, 0).getDate()
        }
    }

    componentWillMount() {
        const { year, month } = this.state;
        this.setState({...this.estimateDate(year,month)})
    }

    getPrev(){
        const { month, year } = this.state;
        let state = {};
        if(month > 0){
            state.month = month-1;
            state.year = year;
        } else {
            state.month = 11;
            state.year = year-1;
        }
        this.setState({...state, ...this.estimateDate.call(null, state.year, state.month)})
    }

    getNext(){
        const { month, year } = this.state;
        let state = {};
        if (month < 11) {
            state.month = month + 1;
            state.year = year;
        } else {
            state.month = 0;
            state.year = year + 1;
        }
        this.setState({...state, ...this.estimateDate.call(null, state.year, state.month)});
    }

    render() {
        const {  dayNames, dayNamesFull, monthNames, monthNamesFull } = this.props;
        const { month, year, firstOfMonth, daysInMonth, weekNumbers, startDay, deliveryStart, deliveryEnd } = this.state;
        return (
            <div className="r-calendar">
                <div className="r-inner">
                    <CurrentDateHeader dayNamesFull={dayNamesFull} monthNamesFull={monthNamesFull}  />
                    <Header monthNames={monthNamesFull} month={month} year={year} onPrevious={this.getPrev.bind(this)} onNext={this.getNext.bind(this)}/>
                    <WeekDays dayNames={dayNames} startDay={startDay} weekNumbers={weekNumbers} />
                    <MonthDates deliveryStart={deliveryStart} deliveryEnd={deliveryEnd} selectDeliveryDate={this.selectDeliveryDate.bind(this)} month={month} year={year} daysInMonth={daysInMonth} firstOfMonth={firstOfMonth} startDay={startDay} weekNumbers={weekNumbers} minDate={this.state.minDate} />
                    {(deliveryStart && deliveryEnd) && <button onClick={this.resetDeliveryDate.bind(this)} className='reset-button'>❌</button>}
                    <button onClick={this.showState}>showState</button>
                </div>
            </div>
        );
    }
}

Calendar.defaultProps = {
    dayNames: ['Nz', 'Pn', 'Wt', 'Sr', 'Czw', 'Pt', 'Sob'],
    dayNamesFull: ['Niedziela','Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'],
    monthNames: ["Sty", "Lut", "Mar", "Kwi", "Maj", "Cze", "Lip", "Sie", "Wrz", "Paż", "Lis", "Gru"],
    monthNamesFull: ['Styczeń', 'Luty','Marzec','Kwiecień','Maj','Czerwiec','Lipiec','Sierpień','Wrzesień','Październik','Listopad','Grudzień'],
}

export const Header = ({onNext, onPrevious, monthNames, year, month}) => {
    return(
        <div className="r-row r-head">
            <button className="r-cell r-prev nav-buttons" onClick={onPrevious.bind(this)} />
            <div className="r-cell r-title">
                {monthNames[month]+' '+year}
            </div>
            <button className="r-cell r-next nav-buttons" onClick={onNext.bind(this)} />
        </div>
    )
}


export const CurrentDateHeader = (props) => {
    const { dayNamesFull, monthNamesFull } = props;
    const date = new Date();
    const currDay = date.getDay();
    const currDate = date.getDate();
    const currMonth = date.getMonth();
    const currYear = date.getFullYear();
    return(
        <div>
            <h3>{dayNamesFull[currDay]}</h3>
            <h2>{currDate} {monthNamesFull[currMonth]} {currYear}</h2>
        </div>
    )
}
