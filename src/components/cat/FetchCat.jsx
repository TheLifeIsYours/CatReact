import React from 'react'
import { gql, useMutation } from '@apollo/client';
import { useRecoilState } from 'recoil';

import Button from '../buttons/button';
import Card from './card';

import { cardListState } from './cardState';

import Styled from '../../styled/exports'

const ADD_CARD = gql`
mutation AddCard($url: String!, $timestamp: DateTime!) {
	insertOneCard(
		data: {
			url: $url,
			points: 0,
            timestamp: $timestamp,
		}
	) {
		_id
		url
		points
        timestamp
	}
}`;
    
const buttonValues = ["Fetch Cat", "Adopt a Kitten", "Pspspsps", "Put out a bowl of milk"];

const getRandomButtonValue = () => (buttonValues[Math.floor(Math.random() * buttonValues.length)])

const FetchCat = () => {
   
    const [isLoading, setIsLoading] = React.useState(false);
	const [cardList, setCardList] = useRecoilState(cardListState);
    const [addCard] = useMutation(ADD_CARD);
    
    const getCatUrl = async () => {
        let apiResponse = await fetch("https://api.thecatapi.com/v1/images/search?size=full");
        apiResponse = await apiResponse.json();

        console.log(apiResponse);

        return apiResponse[0]["url"];
    }

    const addCatToDb = (url) => {
        addCard({variables: {url: url, timestamp: new Date()}})
            .then((response) => {
                const data = response.data.insertOneCard;
    
                const newCard = <Card key={data._id} cardData={data} />
    
                setCardList([newCard, ...cardList]);
                
                setTimeout(() => {
                    setIsLoading(false);
                }, 700);

            }).catch(console.error)
    }

	const fetchCat = async () => {
        setIsLoading(true);

        let urlExists = false;

		let catUrl = await getCatUrl();

        console.log(cardList)

        cardList.forEach((card) => {
            console.log(card);
            
            if (card.props.cardData.url === catUrl) {
                urlExists = true;
            }
        });

        if(urlExists) {
           return fetchCat(); 
        } else {
            addCatToDb(catUrl);
        }
    }

    return (<>
        <Styled.FetchCat onClick={() => {fetchCat()}} >
            <Button value={getRandomButtonValue()} />
        </Styled.FetchCat>

        <Styled.LoadingImage loading={isLoading}>
            <img src={`${process.env.PUBLIC_URL}/images/emoticon-cat.png`} alt=""/>
        </Styled.LoadingImage>
    </>)
}

export default FetchCat