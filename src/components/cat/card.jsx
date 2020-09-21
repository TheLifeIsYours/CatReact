import React, { useEffect } from 'react';

import { cardItemState } from './cardState'
import { useRecoilState } from 'recoil';

//Components
import Image from './image';
import { Controls } from './controls';

const Card = ({cardData}) => {
    const [card, setCard] = useRecoilState(cardItemState(cardData._id));
    
    useEffect(() => {
        setCard({...card,
            id: cardData._id,
            url: cardData.url,
            points: cardData.points,
            vote: 0
        });
    }, [])

    return (
        <div>
            <Image url={cardData.url} />
            <Controls id={card.id} />
        </div>  
    );
}

export default Card;