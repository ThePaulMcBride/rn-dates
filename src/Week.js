import React, { PropTypes } from 'react';
import {
  View,
  TouchableOpacity,
  Text
} from 'react-native';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import momentPropTypes from 'react-moment-proptypes';
import stylePropType from 'react-style-proptype';
import dates from './dates.js';

const moment = extendMoment(Moment);

const Week = (props) => {
  const {
    range,
    date,
    startDate,
    endDate,
    startOfWeek,
    onDatesChange,
    isDateBlocked,
    onDisableClicked,
    defaultStyles,
    styles
  } = props;

  const endOfWeek = startOfWeek.clone().endOf('isoweek');

  const datesInMonth = Array.from(moment.range(startOfWeek, endOfWeek).by('days'));

  const days = datesInMonth
    .map((day) => {
      const onPress = () => {
        if (isDateBlocked(day)) {
          return onDisableClicked(day);
        }

        if (range) {
          const focusOnStartDate = !startDate || endDate;
          const start = focusOnStartDate ? day : startDate;
          const end = !focusOnStartDate ? day : endDate;

          if (start && end) {
            const isValid = Array.from(moment.range(start, end).by('days'))
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
  styles: {}
};

export default Week;
