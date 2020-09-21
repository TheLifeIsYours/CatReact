import React from 'react'
import { gql, useMutation } from '@apollo/client';
import { useRecoilState } from 'recoil';

import Button from '../buttons/button';
import Card from './card';

import { cardListState } from './cardState';

import Styled from '../../styled/exports'

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

const FetchCat = () => {
   
	//State handling
	const [cardList, setCardList] = useRecoilState(cardListState);
	const [addCard] = useMutation(ADD_CARD);

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

    return (
        <Styled.FetchCat>
            <Button onHandleClick={fetchCat} value="Fetch Cat" />
        </Styled.FetchCat>
    )
}

export default FetchCat