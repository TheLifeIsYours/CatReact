import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
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

export const apolloClient = new ApolloClient({
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