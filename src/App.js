import React, { useState } from 'react'
import { gql, useQuery } from '@apollo/client';
import { useRecoilState, atom } from 'recoil';

//Components
import Styled from './styled/exports'

import Card from './components/cat/card'

import {Header, Footer, Loading} from './components/layout/exports'
import { cardListState } from './components/cat/cardState'
import { Select } from './components/select/exports'
import FetchCat from './components/cat/FetchCat';


const GET_CARDS = gql`
query GetCards($limit: Int, $offset: Int) {
	cardsPaginated(input: {limit: $limit, offset: $offset}) {
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
	//State handling
	const [cardList, setCardList] = useRecoilState(cardListState);
	const [cardOffset, setCardOffset] = useState(0);
	const [cardLimit, setCardLimit] = useState(20);

	const [sortBy, setSortBy] = useRecoilState(sortByState);
	const {loading, data, fetchMore} = useQuery(GET_CARDS, {
		variables: {
			limit: cardLimit,
			offset: cardOffset
		}
	});

	const loadMoreCards = () => {
		setCardOffset(cardOffset + cardLimit);
		
		fetchMore({
			variables: {
				offset: cardOffset
			}
		})
	}

	const loadFromStart = () => {
		setCardOffset(0);

		fetchMore({
			variables: {
				offset: 0
			}
		})
	}

	return (<>
		{loading && <Loading />}
		{!loading && 
			<Styled.Wrapper>
				<Header />
				<FetchCat />

				{/* <div>
					<span>Sort by </span>
					<Select value={sortBy.selected} onHandleChange={(event) => {
						console.log(event);
						// setSortBy(sortBy.selected)
					}} options={sortBy.options}/>
				</div>

				<h1>Ordered by {sortBy.selected}</h1> */}
				{data && data.cardsPaginated &&
					<div>
						{cardList}
						{
							(() => {
								switch(sortBy.selected) {
									case(sortBy.options[0]): {
										return data.cardsPaginated.map((cardData) => {
											console.log(cardData);
											return <Card key={cardData._id} cardData={cardData} />
										}).sort((card_a, card_b) => {
											console.log(card_a, card_b);
										})
									}
									
									case(sortBy.options[1]): {
										return data.cardsPaginated.map((cardData) => {
											console.log(cardData);
											return <Card key={cardData._id} cardData={cardData} />
										}).reverse()
									}
										
									default: {
										console.log(data);
										return data.cardsPaginated.map((cardData) => {
											console.log(cardData);
											return <Card key={cardData._id} cardData={cardData} />
										})
									}
								}
							})()
						}
					</div>
				}

				{(data && data.cardsPaginated && data.cardsPaginated.length < cardLimit) ?
					<Styled.FetchCat onClick={loadFromStart}>Back to Start</Styled.FetchCat>
				:
					<Styled.FetchCat onClick={loadMoreCards}>Load more</Styled.FetchCat>
				}
				<Footer />
			</Styled.Wrapper>
		}
	</>)

	
}

export default App;