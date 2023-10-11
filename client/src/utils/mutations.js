import { gql } from '@apollo/client';

export const LOG_ERROR = gql`
	mutation logError($message: String!, $level: String!, $stacktrace: String!, $info: String!) {
		logError(message: $message, level: $level, stacktrace: $stacktrace, info: $info) {
			_id
			message
			level
			stacktrace
			info
		}
	}
`;
