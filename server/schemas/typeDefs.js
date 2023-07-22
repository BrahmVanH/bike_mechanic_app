const { gql } = require('apollo-server-express');

const typeDefs = gql`

	type suspension {
		suspensionComponentType: String
		manufacturer: String
		modelName: String
		modelNumber: String
		oilType: String
		alternatives: String
		oilVolume: String
		serviceKitNumbers: String
		serviceInterval: String
	}

	type suspensionFluid {
		manufacturer: String
		modelName: String
		modelNumber: String
		weight: String
	}

	
	type Query {}
	type Mutation {}
`;

module.exports = typeDefs;
