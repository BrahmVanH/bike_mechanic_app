import React from 'react';
import { BrowserRouter as Router, Switch, Routes, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Navbar from './components/Navbar';
import HomeRedo from './pages/HomeRedo'

const client = new ApolloClient({
	uri: 'http://localhost:3001/graphql',
	cache: new InMemoryCache(),
});

function App() {
	return (
		<ApolloProvider client={client}>
			<Router>
			<Navbar />
				{/* Navbar component should be rendered here */}
				<Routes>
					<Route path='/' element={<HomeRedo />} />
					</Routes>
			</Router>
		</ApolloProvider>
	);
}

export default App;
