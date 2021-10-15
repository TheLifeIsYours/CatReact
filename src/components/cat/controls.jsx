import React from 'react'
import { gql, useMutation, useQuery } from '@apollo/client';

import { cardItemState } from './cardState'
import { useRecoilState } from 'recoil';

//Components
import Styled from '../../styled/exports'

import {UpVote, DownVote} from '../buttons/exports'
import Points from './points'

const GET_ONE_CARD = gql`
query Card($_id: ObjectId!) {
    card (query:{_id: $_id}) {
        _id
        points
    }
}`;

const UPDATE_ONE_CARD = gql`
mutation ($id: ObjectId, $points: Int!){
    updateOneCard(
        query: {_id: $id}
        set: {points: $points}
    ) {
        points
    }
}`;

const useImperativeQuery = (query) => {
    const { refetch } = useQuery(query, {skip: true});
      
    const imperativelyCallQuery = ({variables}) => {
      return refetch(variables);
    }
      
    return imperativelyCallQuery;
}

export const Controls = ({id}) => {
    const [updatePoints] = useMutation(UPDATE_ONE_CARD);
    const getPoints = useImperativeQuery(GET_ONE_CARD);

    const [cardState, setCard] = useRecoilState(cardItemState(id));

    const vote = (upvote) => {
        new Promise(async (resolve, reject) => {
            const {data: {card: {points}}} = await getPoints({variables: {"_id": id}});
            
            switch(cardState.vote) {
                case(0): {
                    // If vote = 0, and upvote = 1, we want to increment with one.
                    // Else if vote = 0 and upvote = 0, we want to decrement with one.
                    return resolve(upvote ? {points: points + 1, vote: 1} : {points: points - 1, vote: -1});
                }

                case(1): {
                    // If vote = 1, and upvote = 1, we want to decrement with one.
                    // Else if vote = 1 and upvote = 0, we want to decrement with two.
                    return resolve(upvote ? {points: points - 1, vote: 0} : {points: points - 2, vote: -1});
                }

                case(-1): {
                    // If vote = -1, and upvote = 1, we want to increment with two.
                    // Else if vote = -1 and upvote = 0, we want to increment with one.
                    return resolve(upvote ? {points: points + 2, vote: 1} : {points: points + 1, vote: 0});
                }

                default: {
                    return reject("Unable to vote");
                }
            }
        })
        .then(({points, vote}) => {
            setCard({...cardState, points, vote});
            updatePoints({variables: {"id": cardState.id, "points": points}});
        })
        .catch(console.error);
    }

    return (
        <Styled.Controls>
            <UpVote onHandleClick={() => {
                vote(1);
            }} />
            
            <Points id={id} />

            <DownVote onHandleClick={() => {
                vote(0);
            }} />
        </Styled.Controls>
    );
}