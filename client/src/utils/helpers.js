//Helper Functions

export const listSupportedModelYears = (yearRange) => {
	if (typeof yearRange.latestYear !== 'number' || typeof yearRange.oldestYearMinusOne !== 'number') {
		throw new Error("Expected parameter 'yearRange' to contain two numbers");
	}
	const { latestYear, oldestYearMinusOne } = yearRange;
	let yearsSupported = [];
	for (let i = latestYear; i > oldestYearMinusOne; i--) {
		yearsSupported.push(`${i}`);
	}
	return yearsSupported;
};

export const checkSpringUpperTubeData = (springUpperTubeInfo) => {
	const { springUpperVolume, selectedSuspensionFork } = springUpperTubeInfo;

	if (springUpperVolume === null) {
		throw new Error('springUpperVolume has an unexpected value. Please refresh');
	}
	let springUpperVolumeUnits;
	let springUpperOilWtUnits;
	// Change the units for volume and presence of 'wt' based on type of lubricant in spring
	if (springUpperVolume === 'Grease' || springUpperVolume === 'grease' || springUpperVolume === '' || springUpperVolume === ' ') {
		springUpperOilWtUnits = '';
		springUpperVolumeUnits = '';
	} else if (selectedSuspensionFork?.selectedSuspensionFork.fork) {
		springUpperOilWtUnits = 'wt';
		springUpperVolumeUnits = 'mL';
	} else {
		springUpperOilWtUnits = '';
		springUpperVolumeUnits = 'mL';
	}

	return { springUpperVolumeUnits, springUpperOilWtUnits };
};

export const checkDamperUpperTubeData = (damperUpperVolume) => {
	let damperUpperVolumeUnits;
	if (damperUpperVolume === null) {
		throw new Error('damperUpperVolume has an unexpected value');
	}
	if (damperUpperVolume === `\n**\n` || damperUpperVolume.toLowerCase() === 'bleed' || damperUpperVolume === '') {
		damperUpperVolumeUnits = '';
	} else {
		damperUpperVolumeUnits = 'mL';
	}

	return damperUpperVolumeUnits;
};
