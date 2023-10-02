const listSupportedModelYears = require('../utils/helpers');

describe('listSupportedModelYears', () => {
  // Positive Test
  if("should output an array of number strings representing years", () => {

    const yearRange = {
      latestYear: 2021,
      oldestYear: 2019
    };

    const yearsArray = ["2019", "2020", "2021"];

    const supportedModelYearsArray = listSupportedModelYears(yearRange);

    expect(supportedModelYearsArray).toEqual(yearsArray);

  })
})