import React from 'react'
import { gql, useMutation } from '@apollo/client';

import { cardItemState } from './cardState'
import { useRecoilState } from 'recoil';

//Components
import {UpVote, DownVote} from '../buttons/buttons'
import Points from './points'

const UPDATE_ONE_CARD = gql`
mutation ($id: ObjectId!, $points: Int!){
    updateOneCard(
        query: {_id: $id}
        set: {points: $points}
    ) {
        points
    }
}`;


function Controls({id}) {
    const [updatePoints, {data}] = useMutation(UPDATE_ONE_CARD);

    const [card, setCard] = useRecoilState(cardItemState(id));

    const vote = (upvote) => {
        new Promise((resolve, reject) => {
            switch(card.vote) {
                case(0): {
                    upvote ? 
                        resolve({points: card.points + 1, vote: 1}) :
                        resolve({points: card.points - 1, vote: -1});
                    break;
                }

                case(1): {
                    upvote ?
                        resolve({points: card.points - 1, vote: 0}) :
                        resolve({points: card.points - 2, vote: -1});
                    break;
                }

                case(-1): {
                    upvote ?
                        resolve({points: card.points + 2, vote: 1}) :
                        resolve({points: card.points + 1, vote: 0});

                    break;
                }
                default: {
                    reject("Unable to vote");
                }
            }
        })
        .then(({points, vote}) => {
            setCard({...card, points, vote});
            updatePoints({variables: {"id": card.id, "points": points}});
        }).catch(console.error);
    }

    const controlStyle = {
        display: 'flex',
        flexFlow: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center',
        width: '20em'
    }

    const pointStyle = {
        color: ["red", "black", "green"][card.vote + 1]
    }

    return (
        <div style={controlStyle}>
            <UpVote onHandleClick={() => {
                vote(1);
            }} />
            <strong style={pointStyle}>{card.points}</strong>
            <DownVote onHandleClick={() => {
                vote(0);
            }} />
        </div>
    );
}

export default Controls;