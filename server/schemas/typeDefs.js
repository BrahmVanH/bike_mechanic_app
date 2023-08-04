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
    springLowerOilWt: String
  }

  type FoxForkOilBath {
    _id: ID!
    year: String
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
    springLowerOilWt: String
  }

  type MarzocchiForkOilBath {
    _id: ID!
    year: String
    forkModelAndOilType: String!
    measurement: String
    locationOne: String
    volumeOne: String
    locationTwo: String
    volumeTwo: String
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
    rockshoxForkOilBathInfoByYear(year: String!): [RockshoxForkOilBath]
    # rockshoxFOBIByYearFork(year: String!, fork: String!): [RockshoxForkOilBath]
    # rockshoxFOBIByYearForkModel(year: String, fork: String, model: String): [RockshoxForkOilBath]
    # rockshoxFOBIByYearForkModelDamper(year: String, fork: String, model: String, damperType: String): [RockshoxForkOilBath]
    # rockshoxFOBIByYearForkModelDamperSpring(year: String, fork: String, model: String, damperType: String, springType: String): [RockshoxForkOilBath]
    # rockshoxFOBIByYearForkModelDamperSpringWheelSize(year: String, fork: String, model: String, damperType: String, springType: String, wheelSize: String): [RockshoxForkOilBath]
    allFoxForkOilBathInfo: [FoxForkOilBath]
    foxForkOilBathInfoByYear(year: String!): [FoxForkOilBath]
    # foxFOBIByYearModel(year: String, model: String): [FoxForkOilBath]
    # foxFOBIByYearModelDamper(year: String, model: String, damperType: String): [FoxForkOilBath]
    # foxFOBIByYearModelDamperSpring(year: String, model: String, damperType: String, springType: String): [FoxForkOilBath]
    # foxFOBIByYearModelDamperSpringWheelSize(year: String, model: String, damperType: String, springType: String, wheelSize: String): [FoxForkOilBath]
    allMarzocchiForkOilBathInfo: [MarzocchiForkOilBath]
  }
`;

module.exports = typeDefs;
