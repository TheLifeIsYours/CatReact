import React from 'react';

import FlipNumbers from 'react-flip-numbers'

import { cardItemState } from './cardState'
import { useRecoilValue } from 'recoil';
import Styled from '../../styled/exports';

const Points = ({id}) => {
    const card = useRecoilValue(cardItemState(id));

    const pointStyle = {
        color: ["#f10033", "#fff", "#28c120"][card.vote + 1]
    }

    return (
        <Styled.Points>
            <FlipNumbers numberStyle={pointStyle} height={28} width={14} color="" numbers={card.points.toString()} play />
        </Styled.Points>
    );
}

export default Points;