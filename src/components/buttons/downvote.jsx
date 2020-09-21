import React from 'react';

//Components
import Styled from '../../styled/exports'
import {Button} from './exports';

const DownVote = (props) => {
    return (
        <Styled.Downvote>
            <Button
                onHandleClick={props.onHandleClick}
                value={
                    <img src={`${process.env.PUBLIC_URL}/images/downvote-claw.png`} alt="" />
                }
            />
        </Styled.Downvote>
    );
}
export default DownVote;