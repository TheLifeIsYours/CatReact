import React, { Component } from 'react';

import './style/button.module.css'

class Button extends Component {
    state = {
        active: false
    }

    handleClick = () => {
        this.props.onHandleClick();
    }

    toggleActive = () => {
        this.setState({active: !this.state.active});
    }

    render() {
        return (
            <button
                onClick={() => {
                    this.toggleActive();
                    this.handleClick();
                }}>
                
                {this.props.value}
            </button>
        );
    }
}

export default Button;