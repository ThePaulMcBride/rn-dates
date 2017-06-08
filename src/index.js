import React, { Component, PropTypes } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import moment from 'moment';
import stylePropType from 'react-style-proptype';
import Month from './Month.js';

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

  render() {
    const previousMonth = () => {
      this.setState({ focusedMonth: this.state.focusedMonth.add(-1, 'M') });
    };

    const nextMonth = () => {
      this.setState({ focusedMonth: this.state.focusedMonth.add(1, 'M') });
    };

    const {
      styles,
      titleFormat
    } = this.props;

    return (
      <View style={[defaultStyles.calendar, styles.calendar]}>
        <View style={[defaultStyles.heading, styles.heading]}>
          <TouchableOpacity onPress={previousMonth}>
            <Text style={[defaultStyles.headingText, styles.headingText]}>{'< Prev'}</Text>
          </TouchableOpacity>
          <Text style={[defaultStyles.headingText, styles.headingText]}>
            {this.state.focusedMonth.format(titleFormat)}
          </Text>
          <TouchableOpacity onPress={nextMonth}>
            <Text style={[defaultStyles.headingText, styles.headingText]}>{'Next >'}</Text>
          </TouchableOpacity>
        </View>
        <Month
          currentDate={this.state.currentDate}
          focusedMonth={this.state.focusedMonth}
          defaultStyles={defaultStyles}
          styles={styles}
          {...this.props}
        />
      </View>
    );
  }
}

Dates.propTypes = {
  styles: PropTypes.objectOf(stylePropType),
  titleFormat: PropTypes.string.isRequired
};

Dates.defaultProps = {
  styles: {},
  titleFormat: 'MMMM'
};

export default Dates;
