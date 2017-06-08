import React, { PropTypes } from 'react';
import {
  View,
  Text
} from 'react-native';
import momentPropTypes from 'react-moment-proptypes';
import stylePropType from 'react-style-proptype';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import Week from './Week.js';

const moment = extendMoment(Moment);

const Month = (props) => {
  const {
    currentDate,
    focusedMonth,
    styles,
    defaultStyles
  } = props;

  const startOfMonth = focusedMonth.clone().startOf('month').startOf('isoweek');
  const endOfMonth = focusedMonth.clone().endOf('month');
  const weekRange = moment.range(currentDate.clone().startOf('isoweek'), currentDate.clone().endOf('isoweek'));
  const monthRange = moment.range(startOfMonth, endOfMonth);

  const dayNames = Array.from(weekRange.by('days'))
    .map(day => (
      <Text key={day.date()} style={[defaultStyles.dayName, styles.dayName]}>
        {day.format('ddd')}
      </Text>
    ));

  const weeks = Array.from(monthRange.by('weeks'))
    .map(week => (
      <Week
        key={week}
        currentDate={currentDate}
        focusedMonth={focusedMonth}
        startOfWeek={week}
        styles={styles}
        {...props}
      />
    ));

  return (
    <View style={[defaultStyles.month, styles.month]}>
      <View style={[defaultStyles.week, styles.week]}>
        {dayNames}
      </View>
      {weeks}
    </View>
  );
};

Month.propTypes = {
  currentDate: momentPropTypes.momentObj.isRequired,
  focusedMonth: momentPropTypes.momentObj.isRequired,
  styles: PropTypes.objectOf(stylePropType),
  defaultStyles: PropTypes.objectOf(stylePropType).isRequired
};

Month.defaultProps = {
  styles: {}
};

export default Month;
