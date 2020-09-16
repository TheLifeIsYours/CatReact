import React, { Component } from 'react';

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