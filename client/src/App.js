import React from 'react';
import { BrowserRouter as Router, Switch, Routes, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Navbar from './components/Navbar';
const client = new ApolloClient({
	uri: '/graphql',
	cache: new InMemoryCache(),
});

function App() {
	return (
		<ApolloProvider client={client}>
			<Router>
			<Navbar />
				{/* Navbar component should be rendered here */}
				<Routes>{/* This will include routes to each endpoint */}</Routes>
			</Router>
		</ApolloProvider>
	);
}

export default App;
