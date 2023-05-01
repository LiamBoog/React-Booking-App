import React from 'react';
import TimeSlot from './TimeSlot'

class TimeSlotPicker extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      inDragMode: false,
      startTime: null,
      endTime: null,
      timeSlots: this.timeSlots(props.numHours, props.slotsPerHour),
      onUpdateSelection: (duration) => props.onUpdateSelection(duration)
    }

    this.startSelection = this.startSelection.bind(this);
    this.extendSelection = this.extendSelection.bind(this);
    this.endSelection = this.endSelection.bind(this);
  }

  // Returns an array mapping each TimeSlot time to an int
  timeSlots(numHours, slotsPerHour)
  {
    var timeSlots = [];
    for (let i = 0; i < numHours * slotsPerHour; i++)
    {
      timeSlots.push(i);
    }

    return timeSlots;
  }

  // Update this component's state to reflect a new selection and notify the parent component
  startSelection(time)
  {
    this.state.onUpdateSelection(1);
    this.setState(
      {
        inDragMode: true,
        startTime: time,
        endTime: time + 1
      });
    
  }

  // Called when the user drags over a TimeSlot other than the current selection's start time
  extendSelection(time)
  {
    let newStartTime;
    let newEndTime;

    if (time < this.state.startTime)
    {
      newStartTime = time;
      newEndTime = this.state.endTime;
    }
    else
    {
      newStartTime = this.state.startTime;
      newEndTime = time + 1; // Add 1 because the booking should finish at the end of the TimeSlot
    }

    this.state.onUpdateSelection(newEndTime - newStartTime);
    this.setState(
      {
        startTime: newStartTime,
        endTime: newEndTime
      });
  }

  endSelection()
  {
    this.setState({inDragMode: false});
  }

  render()
  {
    return (
      <div class='time-slot-picker'>
        {this.state.timeSlots.map(time => 
          <div key={time}>
            <TimeSlot
              time={time}
              firstHour={this.props.firstHour}
              slotsPerHour={this.props.slotsPerHour}
              inDragMode={this.state.inDragMode}
              onStartSelection={this.startSelection}
              onExtendSelection={this.extendSelection}
              onEndSelectiton={this.endSelection}
              isStartSlot={time == this.state.startTime}
              isEndSlot={time + 1 == this.state.endTime}
              isMiddleSlot={time > this.state.startTime && time + 1 < this.state.endTime}
            />
          </div>
        )}
      </div>
    );
  }
}

export default TimeSlotPicker;