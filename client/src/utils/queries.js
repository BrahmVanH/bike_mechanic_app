import { gql } from '@apollo/client';

export const allRockshoxForkOilBathInfo = gql`
	query allRockshoxForkOilBathInfo {
		allRockshoxForkOilBathInfo {
			_id
			year
			fork
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

export const rockshoxProductsByYear = gql`
	query rockshoxProductsByYear($year: String) {
		rockshoxProductsByYear(year: $year) {
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

export const foxProductsByYear = gql`
	query foxProductsByYear($year: String) {
		foxProductsByYear(year: $year) {
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
