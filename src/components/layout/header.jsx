import React from 'react'

import Styled from '../../styled/exports'

const Header = () => {
    return (
        <Styled.Header>
            <img id="desktop" src={process.env.PUBLIC_URL + "/images/cat-react-logo-emoji-DT.png"} />
            <img id="mobile" src={process.env.PUBLIC_URL + "/images/cat-react-logo-emoji-mobile.png"} />
        </Styled.Header>
    )
}

export default Header