import React, { Component } from 'react';
import '../css/Calendar.css';

export class Calendar extends Component {

    constructor(props){
        super(props);
        let currentDate = new Date();
        this.state = {
            year: currentDate.getFullYear(),
            month: currentDate.getMonth(),
            selectedYear: currentDate.getFullYear(),
            selectedMonth: currentDate.getMonth(),
            selectedDate: currentDate.getDate(),
            selectedDt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()),
            startDay: 1,
            weekNumbers: false,
            minDate: this.props.minDate ? this.props.minDate : null,
            disablePast: this.props.disablePast ? this.props.disablePast : false,
            dayNames: ['Niedz', 'Pn', 'Wt', 'Sr', 'Czw', 'Pt', 'Sob'],
            monthNames: ["Sty", "Lut", "Mar", "Kwi", "Maj", "Cze", "Lip", "Sie", "Wrz", "Paż", "Lis", "Gru"],
            monthNamesFull: ['Styczeń', 'Luty','Marzec','Kwiecień','Maj','Czerwiec','Lipiec','Sierpień','Wrzesień','Październik','Listopad','Grudzień'],
            firstOfMonth: null,
            daysInMonth: null
        }
    }

    selectDate = (year, month, date, element) => {
        const { selectedElement } = this.state;
        if(selectedElement){
            selectedElement.classList.remove('r-selected');
        }
        element.target.classList.add('r-selected');
        this.setState({
            selectedYear: year,
            selectedMonth: month,
            selectedDate: date,
            selectedDt: new Date(year, month, date),
            selectedElement: element.target
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
            daysInMonth: new Date(year, month, 1).getDate()
        }
    }

    componentWillMount() {
        this.setState(this.estimateDate.call(null, this.state.year, this.state.month));
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
        return (
            <div className="r-calendar">
                <div className="r-inner">

                </div>
            </div>
        );
    }
}

export const Header = ({onNext, onPrevious, monthNames, month}) => {
    return(
        <div className="r-row r-head">
            <div className="r-cell r-prev">
                <button className="r-cell r-title" onClick={onNext.bind(this)}></button>
                <div className="r-cell r-title">
                    {monthNames[month]}
                </div>
                <button className="r-cell r-next" onClick={onPrevious.bind(this)}></button>
            </div>
        </div>
    )
}