import React, { Component } from 'react';

class Image extends Component {

    imageStyle = {
        height: '20em'
    }

    render() {
        return (
            <img style={this.imageStyle} src={this.props.src} alt="" />
        );
    }
}

export default Image;