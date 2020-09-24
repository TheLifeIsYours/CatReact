import React, { Fragment } from 'react';

const Button = (props) => {

    const handleClick = () => {
        if(props.onHandleClick != undefined) {
            props.onHandleClick()
        } 
    }

    return (
        <div onClick={handleClick}>{props.value}</div>
    );
}

export default Button;