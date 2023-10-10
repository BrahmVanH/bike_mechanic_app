import React from 'react';
import { BrowserRouter as Router, Switch, Routes, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Contact from './components/Contact';

const client = new ApolloClient({
	uri: '/graphql',
	cache: new InMemoryCache(),
});

function App() {
	return (
		<ApolloProvider client={client}>
			<Router>
				<Navbar />
				<Routes>
					<Route path='/' element={<Home />} />
					{/* <Route path='/contact' element={<Contact />} /> */}
				</Routes>
			</Router>
		</ApolloProvider>
	);
}

export default App;
