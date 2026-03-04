const calculatePrice = (start, end, pricePerDay) => {
  const days =
    (new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24) + 1;

  return days * pricePerDay;
};

module.exports = calculatePrice;
