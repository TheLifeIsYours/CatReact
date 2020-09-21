import React, { Component } from 'react';

//Components
import {Button} from './exports';

class Button_UpVote extends Component {
    state = {
        active: false,
        icon: ""
    }

    render() {
        return (
            <Button onHandleClick={this.props.onHandleClick} value="Up Vote" />
        );
    }
}

export default Button_UpVote;