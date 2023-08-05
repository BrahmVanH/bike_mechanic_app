import { gql } from '@apollo/client';

export const allRockshoxForkOilBathInfo = gql`
  query allRockshoxForkOilBathInfo {
    allRockshoxForkOilBathInfo {
      _id
      year
      fork
      model
      # damperType
      # springType
      # wheelSize
      # damperUpperVolume
      # damperUpperOilWt
      # damperLowerVolume
      # damperLowerOilWt
      # springUpperVolume
      # springUpperOilWt
      # springLowerVolume
      # springLowerOilWt
    }
  }
`;

export const rockshoxForkOilBathInfoByYear = gql`
	query rockshoxForkOilBathInfoByYear($year: String) {
		rockshoxForkOilBathInfoByYear(year: $year) {
			_id
			year
			fork
			model
			# damperType
			# springType
			# wheelSize
			# damperUpperVolume
			# damperUpperOilWt
			# damperLowerVolume
			# damperLowerOilWt
			# springUpperVolume
			# springUpperOilWt
			# springLowerVolume
			# springLowerOilWt
		}
	}
`;

export const allFoxForkOilBathInfo = gql`
  query allFoxForkOilBathInfo {
    allFoxForkOilBathInfo {
      _id
      year
      model
      damperType
      springType
      wheelSize
      damperUpperVolume
      damperUpperOilWt
      damperLowerVolume
      damperLowerOilWt
      springUpperVolume
      springUpperOilWt
      springLowerVolume
      springLowerOilWt
    }
  }
`;

export const foxForkOilBathInfoByYear = gql`
	query foxForkOilBathInfoByYear($year: String) {
		foxForkOilBathInfoByYear(year: $year) {
			_id
			year
			model
			damperType
			springType
			wheelSize
			damperUpperVolume
			damperUpperOilWt
			damperLowerVolume
			damperLowerOilWt
			springUpperVolume
			springUpperOilWt
			springLowerVolume
			springLowerOilWt
		}
	}
`;