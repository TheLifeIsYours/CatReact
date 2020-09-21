import React, { useEffect } from 'react';

import { cardItemState } from './cardState'
import { useRecoilValue } from 'recoil';

const Points = ({id}) => {
    const card = useRecoilValue(cardItemState(id));

    const pointStyle = {
        color: ["red", "black", "green"][card.vote + 1]
    }

    return (
        <strong style={pointStyle}>{card.points}</strong>
    );
}

export default Points;