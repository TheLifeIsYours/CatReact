import React from 'react'
import { gql, useQuery } from '@apollo/client';
import { useRecoilState, atom } from 'recoil';

//Components
import Styled from './styled/exports'

import Card from './components/cat/card'

import {Header, Footer} from './components/layout/exports'
import { cardListState } from './components/cat/cardState'
import { Select } from './components/select/exports'
import FetchCat from './components/cat/FetchCat';


const GET_CARDS = gql`
query GetCards {
	cards {
		_id
		url
		points
	}
}`;

const sortByState = new atom({
	key: 'sortBy',
	default: {
		"selected": '',
		"options": [
			"highest scoring",
			"newest"
		]
	}
});


function App() {
	const [sortBy, setSortBy] = useRecoilState(sortByState);
	const {loading, error, data} = useQuery(GET_CARDS)

	//State handling
	const [cardList, setCardList] = useRecoilState(cardListState);

	if(loading) return <div>Loading ...</div>
	if(error) return <div>Error: {error.message}</div>

	return (
		<Styled.Wrapper>
			<Header />
			<FetchCat />

			<div>
				<span>Sort by </span>
				<Select value={sortBy.selected} onHandleChange={(event) => {
					console.log(event);
					// setSortBy(sortBy.selected)
				}} options={sortBy.options}/>
			</div>

			<h1>Ordered by {sortBy.selected}</h1>
			
			<div>
				{cardList}
				{
					(() => {
						switch(sortBy.selected) {
							case(sortBy.options[0]): {
								return data.cards.map((cardData) => {
									console.log(cardData);
									return <Card key={cardData._id} cardData={cardData} />
								}).sort((card_a, card_b) => {
									console.log(card_a, card_b);
								})
							}
							
							case(sortBy.options[1]): {
								return data.cards.map((cardData) => {
									console.log(cardData);
									return <Card key={cardData._id} cardData={cardData} />
								}).reverse()
							}
								
							default: {
								return data.cards.map((cardData) => {
									console.log(cardData);
									return <Card key={cardData._id} cardData={cardData} />
								}).reverse()
							}
						}
					})()
				}
			</div>
			<Footer />
		</Styled.Wrapper>
	)

	
}

export default App;