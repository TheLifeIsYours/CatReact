import React from 'react'

import Styled from '../../styled/exports'

const Footer = () => {
    return (
        <Styled.Footer>
            <span>Made with <span role="img" aria-label="Sparkling Heart">💖</span> by </span>
            <a href="https://thelifeisyours.no/" title="thelifeisyours.no/">TheLifeIsYours</a>
            <span> © {new Date().getFullYear()}</span>
        </Styled.Footer>
    )
}

export default Footer