import React, { Component } from 'react';

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
				mutation: LOG_ERROR_MUTATION, // Define the GraphQL mutation
				variables: {
					message: error.message,
					level: 'error', // or another appropriate log level
					stacktrace: error.stack,
				},
			})
			.then(() => {
				// Handle success if needed
			})
			.catch((mutationError) => {
				// Handle error if the logError mutation fails
			});
	}

	render() {
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return <h1>Something went wrong.</h1>;
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
