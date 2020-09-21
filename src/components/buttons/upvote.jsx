import React, { Component } from 'react';

//Components
import Styled from '../../styled/exports'
import {Button} from './exports';

class Button_UpVote extends Component {
    state = {
        active: false,
        icon: ""
    }

    render() {
        return (
            <Styled.Upvote>
                <Button
                    onHandleClick={this.props.onHandleClick}
                    value={
                        <img src={`${process.env.PUBLIC_URL}/images/upvote-claw.png`} alt="" />
                    }
                />
            </Styled.Upvote>
        );
    }
}

export default Button_UpVote;