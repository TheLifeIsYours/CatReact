import React, { Component } from 'react'

import {Query} from 'react-apollo'
import gql from 'graphql-tag'

//Components
import Card from './card';

class Main extends Component {
    state = {
        cards: []
    }

    cardsQuery = gql`
        {
            cards {
                id
                url
                points
            }
        }
    `;
    
    fetchCat = async () => {
        let cardData = await fetch("https://api.thecatapi.com/v1/images/search?size=full");
        cardData = await cardData.json();
    
        let newCard = <Card url={cardData[0]["url"]} key={this.state.cards.length} />;
    
        this.setState({ cards: [newCard, ...this.state.cards]});
    }

    render() {
        return (
            <div>
                <Query query={this.cardsQuery}>
                    {(loading, error, data) => {
                        if(loading) return <div>Loading ...</div>
                        if(error) return <div>Error: </div>

                        return data.cards.map((id, url, points) => {
                            return <Card url={url} points={points} key={id} />
                        });
                    }}
                </Query>

                <div>{this.state.cards}</div>
                <button onClick={this.fetchCat}>Fetch cat</button>
            </div>
        );
    }
}

export default Main;