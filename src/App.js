import React from 'react'
import { gql, useQuery, useMutation } from '@apollo/client';
import { useRecoilState, useSetRecoilState } from 'recoil';

//Components
import Card from './components/cat/card'
import { cardListState, selectedCardIdState } from './components/cat/cardState'

const GET_CARDS = gql`
query GetCards {
	cards {
		_id
		url
		points
	}
}`;

const ADD_CARD = gql`
mutation AddCard($url: String!) {
	insertOneCard(
		data: {
			url: $url,
			points: 0
		}
	) {
		_id
		url
		points
	}
}`;



function App() {
	const [addCard, {addedCardData}] = useMutation(ADD_CARD);
	const {loading, error, data} = useQuery(GET_CARDS)

	//State handling
	const [cardList, setCardList] = useRecoilState(cardListState);

	const fetchCat = async () => {
		let catData = await fetch("https://api.thecatapi.com/v1/images/search?size=full");
		catData = await catData.json();

		addCard({variables: {url: catData[0]["url"]}})
		.then((response) => {
			const data = response.data.insertOneCard;

			const newCard = <Card key={data._id} cardData={data} />
			setCardList([newCard, ...cardList]);
		}).catch(console.error)
	}

	if(loading) return <div>Loading ...</div>
	if(error) return <div>Error: {error.message}</div>

	return (
		<div>
			<button onClick={fetchCat}>Fetch cat</button>

			<div>{cardList}</div>
			{
				data.cards.map((cardData) => {
					console.log(cardData);
					return <Card key={cardData._id} cardData={cardData} />
				}).reverse()
			}
		</div>
	)
}

export default App;