import React, { Component } from 'react'

//Components
import {UpVote, DownVote} from '../buttons/buttons'
import Points from './points'


class Controls extends Component {
    state = {
        vote: 0,
        points: 0
    }

    upVote = () => {
        switch(this.state.vote) {
            case(0): {
                this.setState((state, props) => ({
                    points: state.points + 1
                }));

                this.setState({vote: 1});
                break;
            }

            case(1): {
                this.setState((state, props) => ({
                    points: state.points - 1
                }));
                
                this.setState({vote: 0});
                break;
            }

            case(-1): {
                this.setState((state, props) => ({
                    points: state.points + 2
                }));

                this.setState({vote: 1});
                break;
            }
            default: {

            }
        }
    }

    downVote = () => {
        switch(this.state.vote) {
            case(0): {
                this.setState((state, props) => ({
                    points: state.points - 1
                }));

                this.setState({vote: -1});
                break;
            }

            case(1): {
                this.setState((state, props) => ({
                    points: state.points - 2
                }));

                this.setState({vote: -1});
                break;
            }

            case(-1): {
                this.setState((state, props) => ({
                    points: state.points + 1
                }));

                this.setState({vote: 0});
                break;
            }
            default: {
                
            }
        }
    }

    controlStyle = {
        display: 'flex',
        flexFlow: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center',
        width: '20em'
    }

    render() {
        return (
            <div style={this.controlStyle}>
                <UpVote onHandleClick={this.upVote} />
                <Points points={this.state.points} />
                <DownVote onHandleClick={this.downVote} />
            </div>
        );
    }
}

export default Controls;