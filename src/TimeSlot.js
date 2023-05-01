import React from 'react';
import './TimeSlot.css';

class TimeSlot extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      time: props.time,
      onStartSelection: (time) => props.onStartSelection(time),
      onExtendSelection: (time) => props.onExtendSelection(time),
      onEndSelectiton: () => props.onEndSelectiton()
    }

    this.startSelection = this.startSelection.bind(this);
    this.extendSelection = this.extendSelection.bind(this);
    this.endSelection = this.endSelection.bind(this);
  }

  startSelection(key)
  {
    this.state.onStartSelection(this.state.time);
  }

  extendSelection()
  {
    if (this.props.inDragMode)
    {
      this.state.onExtendSelection(this.state.time);
    }
  }

  endSelection()
  {
    this.state.onEndSelectiton()
  }

  // Get the appropriate class name for the TimeSlot based on its selection status
  getClassName()
  {
    let output = 'time-slot';
    if (this.props.isStartSlot)
    {
      if (this.props.isEndSlot)
      {
        // This occurs when the user has only seleted one TimeSlot
        output = output.concat(' selected');
      }
      else
      {
        output = output.concat(' selected start');
      }
    }
    else if(this.props.isEndSlot)
    {
      output = output.concat(' selected end');
    }
    else if (this.props.isMiddleSlot)
    {
      output = output.concat(' selected middle');
    }

    // This is for TimeSlots that aren't on the hour
    if (this.state.time % this.props.slotsPerHour != 0)
    {
      output = output.concat(' sub-slot');
    }

    return output;
  }

  // Get the human-readable time this TimeSlot represents
  getDispalyTime()
  {
    let normalizedTime = this.state.time / this.props.slotsPerHour;
    let hour = Math.trunc(normalizedTime);
    let minutes = Math.round((normalizedTime - hour) * 60);

    hour += this.props.firstHour;
    hour += hour >= 13 ? 1 : 0;
    hour = hour % 13;

    return hour.toString().concat(':', minutes.toString(), minutes == 0 ? '0' : '');
  }

  render()
  {
    return (
      <div 
        class={this.getClassName()}
        onMouseDown={this.startSelection}
        onMouseEnter={this.extendSelection}
        onMouseUp={this.endSelection}
      >
        {this.getDispalyTime()}
      </div>
    );
  }
}

export default TimeSlot;