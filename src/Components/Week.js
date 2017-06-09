import React, { PropTypes } from 'react';
import {
  View,
} from 'react-native';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import momentPropTypes from 'react-moment-proptypes';
import stylePropType from 'react-style-proptype';
import Day from './Day.js';

const moment = extendMoment(Moment);

const Week = (props) => {
  const {
    startOfWeek,
    defaultStyles,
    styles
  } = props;

  const endOfWeek = startOfWeek.clone().endOf('isoweek');

  const datesInMonth = Array.from(moment.range(startOfWeek, endOfWeek).by('days'));

  const days = datesInMonth
    .map(day => (
      <Day
        key={day.date()}
        day={day}
        styles={styles}
        defaultStyles={defaultStyles}
        {...props}
      />
    ));

  return (
    <View style={[defaultStyles.week, styles.week]}>{days}</View>
  );
};

Week.propTypes = {
  startOfWeek: momentPropTypes.momentObj.isRequired,
  styles: PropTypes.objectOf(stylePropType),
  defaultStyles: PropTypes.objectOf(stylePropType).isRequired
};

Week.defaultProps = {
  styles: {}
};

export default Week;
