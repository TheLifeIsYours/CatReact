import React, { Component } from 'react';

class Points extends Component {
    render() {
        return (
            <strong>{this.props.points}</strong>
        );
    }
}

export default Points;