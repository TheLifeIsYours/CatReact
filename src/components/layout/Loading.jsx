import React from 'react'

import Styled from '../../styled/exports'

const Loading = () => {
    
    return (
        <Styled.Loading>
			<img src={`${process.env.PUBLIC_URL}/images/emoticon-cat.png`} alt="" />
			Loading ...
		</Styled.Loading>
    )
}

export default Loading