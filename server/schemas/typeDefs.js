const { gql } = require("apollo-server-express");

const typeDefs = gql`

	type RockshoxForkOilBath {
		_id: ID!
		year: String
		fork: String!
		model: String!
		damperType: String
		springType: String
		wheelSize: String
		damperUpperVolume: String
		damperUpperOilWt: String
		damperLowerVolume: String
		damperLowerOilWt: String
		springUpperVolume: String
		springUpperOilWt: String
		springLowerVolume: String
		springLowerWt: String
	}

	# type suspension {
	# 	_id: ID!
	# 	suspensionComponentType: String
	# 	year: String
	# 	manufacturer: String
	# 	modelName: String
	# 	modelNumber: String
	# 	damper: String
	# 	spring: String
	# 	oilVolumes: [oilVolumes]
	# 	serviceKitNumbers: String
	# 	serviceInterval: String
	# }

	# type suspensionFluid {
	# 	_id: ID!
	# 	manufacturer: String
	# 	modelName: String
	# 	modelNumber: String
	# 	weight: String
	# }

	# type oilVolumes {
	# 	damperSide: Boolean
	# 	springSide: Boolean
	# 	upperTube: Boolean
	# 	lowerLeg: Boolean
	# 	volume: String
	# 	oilType: [suspensionFluid]
	# 	weight: String


	# }


	type Query {
		allRockshoxForkOilBathInfo: [RockshoxForkOilBath]
	}
`;

module.exports = typeDefs;
