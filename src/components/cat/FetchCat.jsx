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
    
const buttonValues = ["Fetch Cat", "Adopt a Kitten", "Pspspsps", "Put out a bowl of milk", ""];

const getRandomButtonValue = () => (buttonValues[Math.floor(Math.random() * buttonValues.length)])

const FetchCat = () => {
   
	//State handling
	const [cardList, setCardList] = useRecoilState(cardListState);
    const [addCard] = useMutation(ADD_CARD);
    
    const getCatUrl = async () => {
        let apiResponse = await fetch("https://api.thecatapi.com/v1/images/search?size=full");
        apiResponse = await apiResponse.json();

        console.log(apiResponse);

        return apiResponse[0]["url"];
    }

    const addCatToDb = (url) => {
        addCard({variables: {url: url}})
            .then((response) => {
                const data = response.data.insertOneCard;
    
                const newCard = <Card key={data._id} cardData={data} />
    
                setCardList([newCard, ...cardList]);
            }).catch(console.error)
    }

	const fetchCat = async () => {
        let urlExists = false;

		let catUrl = await getCatUrl();

        cardList.forEach((card) => {
            console.log();
            if(card.cardData.url == catUrl) {
                urlExists = true;
            }
        });

        if(urlExists) {
           return fetchCat(); 
        } else {
            addCatToDb(catUrl);
        }
    }

    return (
        <Styled.FetchCat onClick={() => {fetchCat()}} >
            <Button value={getRandomButtonValue()} />
        </Styled.FetchCat>
    )
}

export default FetchCat