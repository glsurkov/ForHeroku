import React from 'react';
import '../../styles/style.css'

const Button = (props) => {
    return (
        <button onClick = {() => {props.button.click(true); props.button.showText(props.button.title)}} className={props.button.class}>{props.button.title}</button>
    );
};

export default Button;