import React, { PropTypes } from 'react';
import {
  View,
  Text
} from 'react-native';
import momentPropTypes from 'react-moment-proptypes';
import stylePropType from 'react-style-proptype';
import moment from 'moment';
import Week from './Week.js';

const Month = (props) => {
  const {
    currentDate,
    focusedMonth,
    styles,
    defaultStyles
  } = props;

  const dayNames = [];
  const weeks = [];
  const startOfMonth = focusedMonth.clone().startOf('month').startOf('isoweek');
  const endOfMonth = focusedMonth.clone().endOf('month');
  const weekRange = moment.range(currentDate.clone().startOf('isoweek'), currentDate.clone().endOf('isoweek'));

  weekRange.by('days', (day: moment) => {
    dayNames.push(
      <Text key={day.date()} style={[defaultStyles.dayName, styles.dayName]}>
        {day.format('ddd')}
      </Text>
    );
  });

  moment.range(startOfMonth, endOfMonth).by('weeks', (week) => {
    weeks.push(
      <Week
        key={week}
        currentDate={currentDate}
        focusedMonth={focusedMonth}
        startOfWeek={week}
        styles={styles}
        {...props}
      />
    );
  });

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
