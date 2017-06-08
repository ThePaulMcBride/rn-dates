# RN Dates

__A calendar based date and daterange picker for react-native__

## API

| prop | type | default | optional | descritpion |
|---------------|-------------------------|-------------------|----------|----------------------------------------------------------------------------|
| range | boolean | false | true | Determine if the calendar is to be used as a range picker or a single date |
| date | moment | null | true | If the calendar is a single date picker, this is the highligthed date |
| startDate | moment | null | true | The first highlighted date of a range calendar |
| endDate | moment | null | true | The last highlighted date of a range picker |
| focusedInput | `startDate` | `endDate` | startDate | true | The dat which should be selected first on a range calendar |
| onDatesChange | function | `() => undefined` | false | The function called when any date changes |
| isDateBlocked | function | `() => undefined` | false | The function used to determine if a date is selectable |
