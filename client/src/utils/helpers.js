//Helper Functions

export const listSupportedModelYears = (yearRange) => {
  if (typeof yearRange.latestYear !== 'number' || typeof yearRange.oldestYearMinusOne !== 'number' ) {
    throw new Error("Expected parameter 'yearRange' to contain two numbers")
  }
  const {latestYear, oldestYearMinusOne} = yearRange;
	let yearsSupported = [];
	for (let i = latestYear; i > oldestYearMinusOne; i--) {
		yearsSupported.push(`${i}`);
	}
	return yearsSupported;
};


