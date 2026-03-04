const isDateAvailable = (start, end, bookings) => {
  return !bookings.some(
    b => start <= b.endDate && end >= b.startDate
  );
};

module.exports = { isDateAvailable };
