import React from 'react';
import TimeSlotPicker from './TimeSlotPicker'
import Calendar from 'react-calendar';
import './Calendar.css';
import './BookingApp.css';

class BookingApp extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      date: new Date(),
      isWeekend: null,
      duration: 0,
      days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      months: ['January', 'Frebruary', 'March', 'April', 'May', 'June', 'July', 'August', 'Spetember', 'October', 'November', 'December']
    }

    this.updateDuration = this.updateDuration.bind(this);
    this.updateSelectedDate = this.updateSelectedDate.bind(this);
  }

  updateDuration(duration)
  {
    this.setState({duration: duration});
  }

  // Update this component's state with the current selection duration and whether it is on a weekend
  updateSelectedDate(date)
  {
    this.setState({date: date, isWeekend: date.getDay() == 6 || date.getDay() == 0});
  }

  // Get the price of the current selection rounded to 2 decimal places
  // Price per hour (100 and 150) is hardcoded here for simplicity
  getPrice()
  {
    let hourDuration = this.state.duration / this.props.slotsPerHour;
    return (hourDuration * (this.state.isWeekend ? 150 : 100)).toFixed(2);
  }

  // Returns a component displaying the date and price of the current selection
  getDisplayInfo()
  {
    let date = this.state.date;
    let day = this.state.days[date.getDay()];
    let month = this.state.months[date.getMonth()];
    let number = date.getDate().toString();
    let year = date.getFullYear().toString();

    return (
      <>
        <b id={this.state.isWeekend ? "weekend" : "weekday"}>
          {day}
        </b>
        , {month} {number} {year}
      </>
    );
  }

  render()
  {
    return (
      <div class="backdrop">
        <div class="canvas centered">
          <div class="booking-info">
            <h1>
              <span id="dollar-sign">$</span> {this.getPrice()}
            </h1>
            {this.getDisplayInfo()}
          </div>
          <div class="booking-selector">
            <Calendar  minDate={new Date()} onClickDay={this.updateSelectedDate} />
            <div>
              <div id="time-slot-picker-text">
                Drag to select
              </div>
              <TimeSlotPicker 
                firstHour={this.props.firstHour}
                numHours={this.props.availableHours} 
                slotsPerHour={this.props.slotsPerHour} 
                onUpdateSelection={this.updateDuration} 
              />
            </div>
          </div>
          <div id="signature">
            By Liam Boog
          </div>
        </div>
      </div>
    );
  }
}

export default BookingApp;