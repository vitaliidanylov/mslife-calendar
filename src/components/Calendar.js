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
            selectedDt: new Date(d.getFullYear(), d.getMonth(), d.getDate()),
            startDay: 1,
            selectedDate: null,
            deliveryStart: null,
            deliveryEnd: null,
            deliveryRange: null,
            firstOfMonth: null,
            daysInMonth: null
        }
    }

    addToDeliveryDates = (newDates) =>{
        console.log('BANG!');
        this.setState({
            deliveryRange: newDates
        })
    }

    selectDeliveryDate = (value) => {
        const { deliveryStart, deliveryEnd, year, month } = this.state;

        if(!deliveryStart){
            this.setState({
                deliveryStart: new Date(year, month, value),
            })
        } else if (deliveryStart){
            const newDate = new Date(year, month, value);
            const dates = getDates(newDate, deliveryStart);
            if(deliveryStart > newDate){
                this.setState({
                    deliveryEnd: deliveryStart,
                    deliveryStart: newDate
                })
                this.addToDeliveryDates(dates);                
            } else {
                this.setState({
                    deliveryEnd: newDate
                })
                this.addToDeliveryDates.bind(this, getDates(deliveryStart, newDate));                
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
        const { selectedElement, selectedMonth, selectedYear } = this.state;
        if(selectedElement){
            if(selectedMonth !== month || selectedYear !== year){
                selectedElement.classList.remove('r-selected')
            } else {
                selectedElement.classList.add('r-selected')
            }
        }
        
        return {
            firstOfMonth: new Date(year, month, 1),
            daysInMonth: new Date(year, month+1, 0).getDate()
        }
    }

    componentWillMount() {
        const { year, month } = this.state;
        this.setState({...this.estimateDate(year,month)})
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.onSelect && prevState.selectedDt !== this.state.selectedDt) {
            this.props.onSelect.call(this.getDOMNode(), this.state);
        }
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
    
    selectDate(year, month, date, element) {
        const { selectedElement } = this.state;
        if (selectedElement) {
            selectedElement.classList.remove('r-selected');
        }
        element.target.classList.add('r-selected');
        this.setState({
            selectedYear: year,
            selectedMonth: month,
            selectedDate: date,
            selectedDt: new Date(year, month, date),
            selectedElement: element.target
        });
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
                    <MonthDates addToDeliveryDates={this.addToDeliveryDates.bind(this)} deliveryStart={deliveryStart} deliveryEnd={deliveryEnd} selectDeliveryDate={this.selectDeliveryDate} month={month} year={year} daysInMonth={daysInMonth} firstOfMonth={firstOfMonth} startDay={startDay} onSelect={this.selectDate} weekNumbers={weekNumbers} minDate={this.state.minDate} />
                    {(deliveryStart && deliveryEnd) && <button onClick={this.resetDeliveryDate.bind(this)} className='reset-button'>❌</button>}
                </div>
            </div>
        );
    }
}

Calendar.defaultProps = {
    dayNames: ['Nz', 'Pn', 'Wt', 'Sr', 'Czw', 'Pt', 'Sob'],
    dayNamesFull: ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'],
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
