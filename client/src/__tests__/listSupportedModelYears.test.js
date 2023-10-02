import { listSupportedModelYears } from '../utils/helpers';

describe('listSupportedModelYears', () => {
	// Positive Test
	it('should output an array of number strings representing years', () => {
		const yearRange = {
			latestYear: 2021,
			oldestYearMinusOne: 2018,
		};

		const yearsArray = ['2021', '2020', '2019'];

		const supportedModelYearsArray = listSupportedModelYears(yearRange);

		expect(supportedModelYearsArray).toEqual(yearsArray);
	});

	// Exception test
	it("should throw an error if either of the properties of 'yearRange' isn't a number", () => {
		const yearRange = {
			latestYear: null,
			oldestYear: null,
		};

		const err = new Error("Expected parameter 'yearRange' to contain two numbers");

		const supportedModelYearsArrayCb = () => {
			listSupportedModelYears(yearRange);
		};

		expect(supportedModelYearsArrayCb).toThrowError(err);
	});
});
