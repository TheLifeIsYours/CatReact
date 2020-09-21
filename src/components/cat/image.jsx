import React, { useEffect } from 'react';

const Image = ({url}) => {
    const imageStyle = {
        height: '20em'
    }

    useEffect(() => {

    }, []);

    return (
        <img style={imageStyle} src={url} alt="" />
    );
}

export default Image;