import React, { PropTypes } from 'react';
import {
  View,
  TouchableOpacity,
  Text
} from 'react-native';
import moment from 'moment';
import momentPropTypes from 'react-moment-proptypes';
import stylePropType from 'react-style-proptype';
import dates from './dates.js';

const Week = (props) => {
  const {
    range,
    date,
    startDate,
    endDate,
    focusedInput,
    startOfWeek,
    onDatesChange,
    isDateBlocked,
    onDisableClicked,
    defaultStyles,
    styles
  } = props;

  const days = [];
  const endOfWeek = startOfWeek.clone().endOf('isoweek');

  moment.range(startOfWeek, endOfWeek).by('days', (day) => {
    const onPress = () => {
      if (isDateBlocked(day)) {
        onDisableClicked(day);
      } else if (range) {
        let isPeriodBlocked = false;
        const start = focusedInput === 'startDate' ? day : startDate;
        const end = focusedInput === 'endDate' ? day : endDate;
        if (start && end) {
          moment.range(start, end).by('days', (dayPeriod: moment) => {
            if (isDateBlocked(dayPeriod)) isPeriodBlocked = true;
          });
        }
        onDatesChange(isPeriodBlocked ?
          dates(end, null, 'startDate') :
          dates(start, end, focusedInput));
      } else {
        onDatesChange({ date: day });
      }
    };

    const isDateSelected = () => {
      if (range) {
        if (startDate && endDate) {
          return day.isSameOrAfter(startDate) && day.isSameOrBefore(endDate);
        }
        return (startDate && day.isSame(startDate)) || (endDate && day.isSame(endDate));
      }
      return date && day.isSame(date);
    };

    const isBlocked = isDateBlocked(day);
    const isSelected = isDateSelected();

    const dayStyles = () => {
      if (isBlocked) {
        return [
          defaultStyles.day,
          styles.day,
          defaultStyles.dayBlocked,
          styles.dayBlocked
        ];
      }

      if (isSelected) {
        return [
          defaultStyles.day,
          styles.day,
          defaultStyles.daySelected,
          styles.daySelected
        ];
      }

      return [defaultStyles.day, styles.day];
    };

    const styleText = () => {
      if (isBlocked) {
        return [
          defaultStyles.dayText,
          styles.dayText,
          defaultStyles.dayDisabledText,
          styles.dayDisabledText
        ];
      }

      if (isSelected) {
        return [
          defaultStyles.dayText,
          styles.dayText,
          defaultStyles.daySelectedText,
          styles.daySelectedText
        ];
      }

      return [defaultStyles.dayText, styles.dayText];
    };

    days.push(
      <TouchableOpacity
        key={day.date()}
        style={dayStyles()}
        onPress={onPress}
        disabled={isBlocked && !onDisableClicked}
      >
        <Text style={styleText()}>{day.date()}</Text>
      </TouchableOpacity>
    );
  });

  return (
    <View style={[defaultStyles.week, styles.week]}>{days}</View>
  );
};

Week.propTypes = {
  range: PropTypes.bool,
  date: momentPropTypes.momentObj,
  startDate: momentPropTypes.momentObj,
  endDate: momentPropTypes.momentObj,
  focusedInput: PropTypes.oneOf(['startDate', 'endDate']),
  startOfWeek: momentPropTypes.momentObj.isRequired,
  onDatesChange: PropTypes.func.isRequired,
  isDateBlocked: PropTypes.func.isRequired,
  onDisableClicked: PropTypes.func.isRequired,
  styles: PropTypes.objectOf(stylePropType),
  defaultStyles: PropTypes.objectOf(stylePropType).isRequired
};

Week.defaultProps = {
  range: false,
  date: undefined,
  startDate: undefined,
  endDate: undefined,
  focusedInput: 'startDate',
  styles: {}
};

export default Week;
