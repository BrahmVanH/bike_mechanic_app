const { gql } = require('apollo-server-express');

const typeDefs = gql`

	type suspension {
		_id: ID!
		suspensionComponentType: String
		year: String
		manufacturer: String
		modelName: String
		modelNumber: String
		damper: String
		spring: String
		oilVolumes: [oilVolumes]
		serviceKitNumbers: String
		serviceInterval: String
	}

	type suspensionFluid {
		_id: ID!
		manufacturer: String
		modelName: String
		modelNumber: String
		weight: String
	}

	type oilVolumes {
		damperSide: Boolean
		springSide: Boolean
		upperTube: Boolean
		lowerLeg: Boolean
		volume: String
		oilType: [suspensionFluid]
		weight: String


	}


	type Query {}
	type Mutation {}
`;

module.exports = typeDefs;
