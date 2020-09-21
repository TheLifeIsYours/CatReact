import React from 'react';
import ReactDOM from 'react-dom';

import ErrorBoundary from './ErrorBoundary'
import { RecoilRoot } from 'recoil';
import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink } from '@apollo/client';

import App from './App';
import './App.css';
import './index.css';

import * as serviceWorker from './serviceWorker';
import * as Realm from "realm-web";

const APP_ID = "catreact-lkwiu";
const app = new Realm.App(APP_ID);

async function getValidAccessToken() {
	if (!app.currentUser) {
		await app.logIn(Realm.Credentials.anonymous());
	} else {
		await app.currentUser.refreshCustomData();
	}

	return app.currentUser.accessToken;
}

const apolloClient = new ApolloClient({
	link: new HttpLink({
		uri: `https://realm.mongodb.com/api/client/v2.0/app/${APP_ID}/graphql`,

		fetch: async (uri, options) => {
			const accessToken = await getValidAccessToken();
			options.headers.Authorization = `Bearer ${accessToken}`;
			return fetch(uri, options);
		},
	}),

	cache: new InMemoryCache({
		typePolicies: {
			Cards: {
				keyFields: ["_id", "url", "points"]
			}
		}
	})
});

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