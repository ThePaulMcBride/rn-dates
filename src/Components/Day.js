import React, { PropTypes } from 'react';
import {
  TouchableOpacity,
  Text
} from 'react-native';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import momentPropTypes from 'react-moment-proptypes';
import stylePropType from 'react-style-proptype';
import dates from '../dates.js';

const moment = extendMoment(Moment);

const Week = (props) => {
  const {
    day,
    startDate,
    endDate,
    isDateBlocked,
    onDisableClicked,
    range,
    onDatesChange,
    styles,
    defaultStyles
  } = props;

  const onPress = () => {
    if (isDateBlocked(day)) {
      return onDisableClicked(day);
    }

    if (range) {
      const focusOnStartDate = !startDate || endDate;
      const start = focusOnStartDate ? day : startDate;
      const end = !focusOnStartDate ? day : endDate;

      if (start && end) {
        const isValid = Array.from(moment.range(start, end)
          .by('days'))
          .reduce((valid, dayPeriod) => {
            if (isDateBlocked(dayPeriod) || !valid) return false;
            return true;
          }, true);

        if (isValid) {
          return onDatesChange(dates(start, end, focusOnStartDate));
        }
        return onDatesChange(dates(end, null, true));
      }

      return onDatesChange(dates(start, end, focusOnStartDate));
    }

    return onDatesChange({ date: day });
  };

  const isDateSelected = () => {
    if (range) {
      if (startDate && endDate) {
        return day.isSameOrAfter(startDate) && day.isSameOrBefore(endDate);
      }
      return (startDate && day.isSame(startDate)) || (endDate && day.isSame(endDate));
    }
    return day && day.isSame(day);
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

  return (
    <TouchableOpacity
      key={day.date()}
      style={dayStyles()}
      onPress={onPress}
      disabled={isBlocked && !onDisableClicked}
    >
      <Text style={styleText()}>{day.date()}</Text>
    </TouchableOpacity>
  );
};

Week.propTypes = {
  range: PropTypes.bool,
  day: momentPropTypes.momentObj.isRequired,
  startDate: momentPropTypes.momentObj,
  endDate: momentPropTypes.momentObj,
  onDatesChange: PropTypes.func.isRequired,
  isDateBlocked: PropTypes.func,
  onDisableClicked: PropTypes.func,
  styles: PropTypes.objectOf(stylePropType),
  defaultStyles: PropTypes.objectOf(stylePropType).isRequired
};

Week.defaultProps = {
  range: false,
  date: undefined,
  startDate: undefined,
  endDate: undefined,
  isDateBlocked: () => false,
  onDisableClicked: () => null,
  styles: {}
};

export default Week;
