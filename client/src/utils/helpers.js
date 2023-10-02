//Helper Functions

import { number } from "prop-types";


export const listSupportedModelYears = (yearRange) => {
  console.log(yearRange);
  if (typeof yearRange.latestYear !== 'number' || typeof yearRange.oldestYearMinusOne !== 'number' ) {
    throw new Error("Expected parameter 'yearRange' to contain two numbers")
  }
  const {latestYear, oldestYearMinusOne} = yearRange;
	let yearsSupported = [];
	for (let i = latestYear; i > oldestYearMinusOne; i--) {
		yearsSupported.push(`${i}`);
	}
  console.log(yearsSupported);
	return yearsSupported;
};

