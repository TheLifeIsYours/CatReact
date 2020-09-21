import React, { useEffect } from 'react';

import { selectedCardState, selectedCardIdState } from './cardState'
import { useRecoilValue, useSetRecoilState } from 'recoil';


const Points = () => {
    
    useEffect(() => {
        // setSelectedCardState(id)
    })

    const card = useRecoilValue(selectedCardState) || {};

    const pointStyle = {
        color: ["red", "black", "green"][card.vote + 1]
    }

    return (
        <strong style={pointStyle}>{card.points}</strong>
    );
}

export default Points;