import React, { Component } from 'react';

//Components
import Image from './image';
import Controls from './controls';

class Card extends Component {
    render() {
        return (
            <div>
                <Image src={this.props.url} />
                <Controls />
            </div>  
        );
    }
}

export default Card;