import React, { Component } from 'react';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { LOG_ERROR } from '../../utils/mutations';

const client = new ApolloClient({
	uri: '/graphql',
	cache: new InMemoryCache(),
});

class ErrorBoundary extends Component {

	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}
	
	static getDerivedStateFromError(error) {
		// Update state so the next render will show the fallback UI.
		return { hasError: true };
	}

	componentDidCatch(error, info) {
		// Log the error to your GraphQL server using Apollo Client
		client
			.mutate({
				mutation: LOG_ERROR, // Define the GraphQL mutation
				variables: {
					message: error.message,
					level: 'error', // or another appropriate log level
					stacktrace: error.stack,
					info: info
				},
			})
			.then(() => {
				// Handle success if needed
			})
			.catch((mutationError) => {
				// Handle error if the logError mutation fails
				console.error("Error logging is unavailable at this time", mutationError);
			});
	}

	render() {
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return <h1>Something went wrong, please come back later.</h1>;
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
