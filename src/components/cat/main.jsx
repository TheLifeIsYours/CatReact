import React, { Component } from 'react';

//Components
import Card from './card';

class Main extends Component {
    state = {
        cards: []
    }
    
    fetchCat = async () => {
        let cardData = await fetch("https://api.thecatapi.com/v1/images/search?size=full");
        cardData = await cardData.json();
    
        let newCard = <Card url={cardData[0]["url"]} key={this.state.cards.length} />;
    
        this.setState({ cards: [newCard, ...this.state.cards]});
    }

    render() {
        return (
            <div>
                <div>{this.state.cards}</div>
                <button onClick={this.fetchCat}>Fetch cat</button>
            </div>
        );
    }
}

export default Main;