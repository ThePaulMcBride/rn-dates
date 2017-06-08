export default (startDate, endDate, focusOnStartDate) => {
  if (focusOnStartDate) {
    if (startDate && endDate) {
      return ({ startDate, endDate: null });
    }
    return ({ startDate, endDate });
  }

  if (endDate && startDate && endDate.isBefore(startDate)) {
    return ({ startDate: endDate, endDate: null });
  }
  return ({ startDate, endDate });
};
