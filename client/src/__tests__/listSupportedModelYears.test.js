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
	it("should return the strings, '' and '', in response to an upper volume of 'grease'", () => {
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
	// Positive Test
	it("should return two strings 'wt and 'mL' if the selectedForkObject has a value ...fork", () => {
		const springUpperTubeInfo = {
			springUpperVolume: '10',
			selectedSuspensionFork: {
				selectedSuspensionFork: {
					fork: '35 Gold',
				},
			},
		};

		const expectedUnits = {
			springUpperOilWtUnits: 'wt',
			springUpperVolumeUnits: 'mL',
		};

		const upperSpringUnitsRockshox = checkSpringUpperTubeData(springUpperTubeInfo);
		expect(upperSpringUnitsRockshox).toEqual(expectedUnits);
	});

	// Positive Test
	it("should return the strings '' and 'mL' if there is no ...fork property and springUpperVolume has a value other than blank or grease", () => {
		const springUpperTubeInfo = {
			springUpperVolume: '10',
		};

		const expectedUnits = {
			springUpperOilWtUnits: '',
			springUpperVolumeUnits: 'mL',
		};

		const upperSpringUnitsFox = checkSpringUpperTubeData(springUpperTubeInfo);
		expect(upperSpringUnitsFox).toEqual(expectedUnits);
	});

	// Exception test
	it('should throw an error if springUpperVolume is undefined', () => {
		const springUpperTubeInfo = {
			springUpperVolume: null,
			selectedSuspensionFork: {
				selectedSuspensionFork: {
					fork: '35 Gold',
				},
			},
		};

		const err = new Error('springUpperVolume has an unexpected value. Please refresh');

		const checkSpringUpperTubeDataCb = () => {
			checkSpringUpperTubeData(springUpperTubeInfo);
		};

		expect(checkSpringUpperTubeDataCb).toThrowError(err);
	});
});

describe('checkUpperDamperTubeData', () => {
	// Positive Test
	it('should return a string of "" if damperUpperVolume is equal to "bleed"', () => {
		const damperUpperVolume = `Bleed`;
		const expectedDamperUnit = '';

		const upperDamperUnit = checkDamperUpperTubeData(damperUpperVolume);

		expect(upperDamperUnit).toEqual(expectedDamperUnit);
	});
	// Positive Test
	it('should return a string of "" if damperUpperVolume is equal to ""', () => {
		const damperUpperVolume = ``;
		const expectedDamperUnit = '';

		const upperDamperUnit = checkDamperUpperTubeData(damperUpperVolume);

		expect(upperDamperUnit).toEqual(expectedDamperUnit);
	});
	// Positive Test
	it('should return a string of "" if damperUpperVolume "\n**\n"', () => {
		const damperUpperVolume = `\n**\n`;
		const expectedDamperUnit = '';

		const upperDamperUnit = checkDamperUpperTubeData(damperUpperVolume);

		expect(upperDamperUnit).toEqual(expectedDamperUnit);
	});
	it('should return a string of "mL" if damperUpperVolume is not null and does not equal "bleed", `\n**\n`, or an empty string ', () => {
		const damperUpperVolume = `10`;
		const expectedDamperUnit = 'mL';

		const upperDamperUnit = checkDamperUpperTubeData(damperUpperVolume);

		expect(upperDamperUnit).toEqual(expectedDamperUnit);
	});
	
	// Exception Test
	it('Should throw an error if damperUpperVolume is null', () => {
		const damperUpperVolume = null;
		const expectedErrorMessage = new Error('damperUpperVolume has an unexpected value');
		const checkDamperUpperTubeDataCb = () => {
			checkDamperUpperTubeData(damperUpperVolume);
		};
		expect(checkDamperUpperTubeDataCb).toThrowError(expectedErrorMessage);
	});
});
