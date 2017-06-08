import React, { Component } from 'react';
import {
  StyleSheet
} from 'react-native';
import moment from 'moment';
import Calendar from './Components/Calendar.js';

const defaultStyles = StyleSheet.create({
  calendar: {
    backgroundColor: 'rgb(255, 255, 255)'
  },
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20
  },
  headingText: {
    color: 'rgb(0,0,0)'
  },
  week: {
    flexDirection: 'row'
  },
  dayName: {
    flexGrow: 1,
    flexBasis: 1,
    textAlign: 'center',
  },
  day: {
    flexGrow: 1,
    flexBasis: 1,
    alignItems: 'center',
    backgroundColor: 'rgb(245, 245, 245)',
    margin: 1,
    padding: 10
  },
  dayBlocked: {
    backgroundColor: 'rgb(255, 255, 255)'
  },
  daySelected: {
    backgroundColor: 'rgb(52,120,246)'
  },
  dayText: {
    color: 'rgb(0, 0, 0)',
    fontWeight: '600'
  },
  dayDisabledText: {
    color: 'gray',
    opacity: 0.5,
    fontWeight: '400'
  },
  daySelectedText: {
    color: 'rgb(252, 252, 252)'
  }
});

class Dates extends Component {
  state = {
    currentDate: moment(),
    focusedMonth: moment().startOf('month')
  }

  previousMonth = () => {
    this.setState({ focusedMonth: this.state.focusedMonth.add(-1, 'M') });
  };

  nextMonth = () => {
    this.setState({ focusedMonth: this.state.focusedMonth.add(1, 'M') });
  };

  render() {
    return (
      <Calendar
        currentDate={this.state.currentDate}
        focusedMonth={this.state.focusedMonth}
        defaultStyles={defaultStyles}
        previousMonth={this.previousMonth}
        nextMonth={this.nextMonth}
        {...this.props}
      />
    );
  }
}

export default Dates;
