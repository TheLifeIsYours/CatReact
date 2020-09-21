import React from 'react'
import {compose, flatten, pluck} from 'ramda'
import styled from 'styled-components'

const Wrapper = styled.main`
    width: 100%;
    max-width: 800px;
    height: auto;
    margin: 0 auto;
    background: #2f3136;
    box-sizing: border-box;

    padding: 30px 50px 30px 50px;

    @media(max-width:680px;) {
	    padding: 30px 25px 30px 25px;
    }

    img {
        border: 0px;
        width: 100%;
        height: auto;
        margin: 0 0 10px 0;
        padding: 0;
    }
`;

const Header = styled.header`
    #mobile {
        display: none;
    }

    #desktop {
        display: block;
    }

    @media(max-width:680px) {
        #mobile {
            display: block;
        }

        #desktop {
            display: none;
        }
    }

    padding: 10px;

    & img {
        border:0px;
        width: 100%;
        height: auto;
        margin: 0 0 10px 0;
        box-sizing: border-box;
    }
`

const Footer = styled.footer`
	width: 100%
	height: auto;
	text-align: center;
    color: #c66df9;
    
    & a {
        color: white;
    }
`

const Card = styled.div`
	padding: 15px;
	margin-bottom: 30px;
	background: #3b3e45;
	border-radius: 4px;
	box-shadow: 0px 3px 7px #202225;
`

const Controls = styled.div`
    padding: 15px;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
`

const Button = styled.button`
    cursor: pointer;
    padding: 15px 20px 15px 20px;
    margin-top: -12px;
    background: none;
    border: none;
    border-radius: none;

    & img {
        width: 100%;
        height: auto;
        border-radius: none;
    }
`

const ControlButton = styled.button`
    height:52px;
    width: 60px;
    padding: 0;
`

const Upvote = styled.button`
    float: left;
`

const Downvote = styled.button`
    float: right;
`

const FetchCat = styled.button`
    width: 100%;
    margin: 0 0 20px 0;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 27px;
    background: #c66df9;
    color: #ffffff;
    border-radius: 4px;
    text-align: center;
    box-sizing:border-box;
    
    :hover {
        color: #c66df9;
        background: #ffffff;
    }
`

const Points = styled.div`
    max-width: 10em;
    overflow: hidden;
`

const StyledComponents = styled(styled.div``)``;

const Styled = ({children, ...rest}) => (
    <StyledComponents {...rest}>{children}</StyledComponents>
);

const merge = (...nodes) => {
	const rules = compose(
		flatten,
		pluck("rules"),
		pluck("componentStyle")
	)(nodes);
	return styled.div`
		${rules}
	`;
};

Styled.Wrapper = Wrapper;
Styled.Header = Header;
Styled.Footer = Footer;

Styled.Card = Card;
Styled.Controls = Controls;

Styled.Button = Button;
Styled.FetchCat = merge(Button, FetchCat);

Styled.Upvote = merge(Button, ControlButton, Upvote)
Styled.Downvote = merge(Button, ControlButton, Downvote)

Styled.Points = Points;

export default Styled