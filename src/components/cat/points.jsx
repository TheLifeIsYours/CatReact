import React from 'react';

import FlipNumbers from 'react-flip-numbers'

import { cardItemState } from './cardState'
import { useRecoilValue } from 'recoil';
import Styled from '../../styled/exports';

const Points = ({id}) => {
    const card = useRecoilValue(cardItemState(id));

    const pointStyleColor = {
        color: ["#f10033", "#fff", "#28c120"][card.vote + 1]
    }

    const pointStyleChar = {
        transform: "scale(1.5)",
        color: pointStyleColor.color
    }

    return (
        <Styled.Points>
            <FlipNumbers nonNumberStyle={pointStyleChar} numberStyle={pointStyleColor} height={28} width={14} numbers={card.points.toString()} play />
        </Styled.Points>
    );
}

export default Points;