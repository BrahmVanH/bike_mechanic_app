
	// useEffect(() => {
	// 	if (rockshoxQueryResults?.data) {
	// 		console.log(rockshoxQueryResults);
	// 		setInitialQueryResponse(rockshoxQueryResults.data.allRockshoxForkOilBathInfo);
	// 		console.log(initialQueryResponse);
	// 	} else if (foxQueryResults.data) {
	// 		console.log(foxQueryResults);
	// 		setInitialQueryResponse(foxQueryResults.data.allFoxForkOilBathInfo);
	// 		console.log(initialQueryResponse);
	// 	}
	// }, [rockshoxQueryResults, foxQueryResults]);

	// // ** Map through intialQueryReponse and grab all years, filter through years and remove repeats
	// // ** set yearDropdownOptions state
	// // ** Year options dropdown appears

	// // When manufacturer is selected, map through all products in query response and grab the product years that are available
	// useEffect(() => {
	// 	if (selectedManufacturer !== '') {
	// 		console.log(`selected manufacturer: ${selectedManufacturer}, grabbing year options`);
	// 		const yearOptions = [];
	// 		initialQueryResponse?.map((product) => {
	// 			yearOptions.push(product.year);
	// 		});
	// 		const yearOptionsWithoutRepeats = removeRepeatingItemsFromList(yearOptions);
	// 		setYearDropdownOptions(yearOptionsWithoutRepeats);
	// 	} else {
	// 		console.log('no manufacturer selected yet...');
	// 	}
	// }, [selectedManufacturer]);
// ** User selects model
// ** set selectedModel state
// ** Filter initialQueryResponse by year and model (or year, model, and fork) for wheelSize options if !== null
// ** set wheelSizeDropdownOptions

// If a model has been selected,
// useEffect(() => {
// 	if (selectedModel !== '') {
// 		const wheelSizeOptions = [];
// 		const wheelSizes = initialQueryResponse?.filter((product) => product.year === selectedYear && product.model === selectedModel);
// 		wheelSizes.map((product) => {
// 			wheelSizeOptions.push(product.wheelSize);
// 		});
// 		const wheelSizeOptionsWithoutRepeats = removeRepeatingItemsFromList(wheelSizeOptions);
// 		setWheelSizeDropdownOptions(wheelSizeOptionsWithoutRepeats);
// 	} else {
// 		console.log('no model has been selected yet...');
// 	}
// }, [selectedModel, selectedYear, selectedManufacturer, selectedRockshoxFork]);

// ** User selects wheelSize
// ** set selectedWheelSize state
// ** filter initialQueryResponse by year, model/fork, wheelSize
// ** set selectedProduct state
// ** pass selectedProduct object into product information component

// useEffect(() => {
// 	if (selectedWheelSize !== '') {
// 		const matchingProduct = initialQueryResponse?.filter((product) => product.year === selectedYear && product.model === selectedModel && product.wheelSize === selectedWheelSize);
// 		console.log(matchingProduct);
// 	} else {
// 		console.log('wheelSize has not been selected yet...');
// 	}
// }, [selectedWheelSize]);
{
	/* {wheelSizeDropdownOptions.length > 0 ? (
						<Form.Group>
							<Form.Select style={{ userSelect: 'all' }} type='text' size='sm' name='wheelSize' value={selectedWheelSize} onChange={(event) => handleWheelSizeSelect(event.target.value)}>
								{wheelSizeDropdownOptions.map((fork) => (
									<option key={fork} value={fork}>
										{fork}
									</option>
								))}
							</Form.Select>
						</Form.Group>
					) : (
						<></>
					)} */
}
