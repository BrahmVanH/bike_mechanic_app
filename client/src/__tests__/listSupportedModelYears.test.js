import { listSupportedModelYears, checkSpringUpperTubeData, checkDamperUpperTubeData } from '../utils/helpers';

describe('listSupportedModelYears', () => {
	// Positive Test
	it('should output an array of number strings representing years given a two integers denoting year range', () => {
		const yearRange = {
			latestYear: 2021,
			oldestYearMinusOne: 2018,
		};

		const expectedYearsArray = ['2021', '2020', '2019'];

		const supportedModelYearsArray = listSupportedModelYears(yearRange);

		expect(supportedModelYearsArray).toEqual(expectedYearsArray);
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

describe('checkSpringUpperTubeData', () => {
	// Positive Test
	it('should take a string representing a volume and an object containing a particular property and output two strings representing units of mesurement.', () => {
		const springUpperTubeInfo = {
			springUpperVolume: 'Grease',
			selectedSuspensionFork: {
				selectedSuspensionFork: {
					fork: '35 Gold',
				},
			},
		};

		const expectedUnits = {
			springUpperOilWtUnits: '',
			springUpperVolumeUnits: '',
		};

		const upperSpringUnitsGrease = checkSpringUpperTubeData(springUpperTubeInfo);

		expect(upperSpringUnitsGrease).toEqual(expectedUnits);
	});
});
