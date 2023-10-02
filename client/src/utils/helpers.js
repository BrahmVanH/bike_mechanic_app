//Helper Functions

import { number } from "prop-types";

const listSupportedModelYears = (yearRange) => {
  if (yearRange.latestYear !== Number || yearRange.oldestYear !== Number ) {
    throw new Error("Expected parameter 'yearRange' to contain two numbers")
  }
  const {latestYear, oldestYear} = yearRange;
	const yearsSupported = [];
	for (let i = latestYear; i >= oldestYear; i--) {
		yearsSupported.push(`${i}`);
	}
	return yearsSupported;
};

module.export = { listSupportedModelYears };
