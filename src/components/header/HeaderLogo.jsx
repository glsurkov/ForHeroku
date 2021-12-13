import React from 'react';

const HeaderLogo = (props) => {
    return (
        <div className = "header_logo">
            {props.logo.text}
            <div>
                <img alt="LOGO" className="logo_img" src={props.logo.img}/>
            </div>
        </div>
    );
};

export default HeaderLogo;