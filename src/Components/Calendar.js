import React, { PropTypes } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import stylePropType from 'react-style-proptype';
import momentPropTypes from 'react-moment-proptypes';
import Month from './Month.js';

const Calendar = (props) => {
  const {
    currentDate,
    focusedMonth,
    styles,
    titleFormat,
    defaultStyles,
    previousMonth,
    nextMonth,
    ...monthProps
  } = props;

  return (
    <View style={[defaultStyles.calendar, styles.calendar]}>
      <View style={[defaultStyles.heading, styles.heading]}>
        <TouchableOpacity onPress={previousMonth}>
          <Text style={[defaultStyles.headingText, styles.headingText]}>{'< Prev'}</Text>
        </TouchableOpacity>
        <Text style={[defaultStyles.headingText, styles.headingText]}>
          {focusedMonth.format(titleFormat)}
        </Text>
        <TouchableOpacity onPress={nextMonth}>
          <Text style={[defaultStyles.headingText, styles.headingText]}>{'Next >'}</Text>
        </TouchableOpacity>
      </View>
      <Month
        currentDate={currentDate}
        focusedMonth={focusedMonth}
        defaultStyles={defaultStyles}
        styles={styles}
        {...monthProps}
      />
    </View>
  );
};

Calendar.propTypes = {
  styles: PropTypes.objectOf(stylePropType),
  currentDate: momentPropTypes.momentObj.isRequired,
  focusedMonth: momentPropTypes.momentObj.isRequired,
  defaultStyles: PropTypes.objectOf(stylePropType).isRequired,
  titleFormat: PropTypes.string.isRequired,
  previousMonth: PropTypes.func.isRequired,
  nextMonth: PropTypes.func.isRequired
};

Calendar.defaultProps = {
  styles: {},
  titleFormat: 'MMMM YYYY'
};

export default Calendar;
