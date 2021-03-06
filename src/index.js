import React from 'react';
import ReactDOM from 'react-dom';

import ErrorBoundary from './ErrorBoundary'

import { RecoilRoot } from 'recoil';

import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './graphql/link'

import App from './App';
import './App.css';
import './index.css';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
	// <React.StrictMode>
		<ErrorBoundary>
			<RecoilRoot>
				<ApolloProvider client={apolloClient}>
					<App />
				</ApolloProvider>
			</RecoilRoot>
		</ErrorBoundary>
	// </React.StrictMode>
	,
	document.getElementById('root')
);

serviceWorker.unregister();