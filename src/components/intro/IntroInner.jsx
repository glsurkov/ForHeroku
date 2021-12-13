import React from 'react';
import '../../styles/style.css'
import Title from "./Title";
import LoginButton from "./LoginButton";

const IntroInner = () => {

    return (
        <div className = "intro_inner">
            <Title title = {"Let's fly with AirBook!"}/>
            <LoginButton />
        </div>
    );
};

export default IntroInner;