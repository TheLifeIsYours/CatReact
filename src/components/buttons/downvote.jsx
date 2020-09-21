import React, { Component } from 'react';

//Components
import {Button} from './exports';

class DownVote extends Component {
    state = {
        active: false,
        icon: ""
    }

    render() {
        return (
            <Button onHandleClick={this.props.onHandleClick} value="Down Vote" />
        );
    }
}
export default DownVote;