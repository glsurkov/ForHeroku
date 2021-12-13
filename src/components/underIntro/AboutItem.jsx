import React, {useRef} from 'react';

const AboutItem = (props) => {

    const clickRef = useRef();

    const active_drop_info = (e) =>
    {
        e.preventDefault();
        if (clickRef.current.lastChild.classList.contains("drop_info_active")) {
            clickRef.current.lastChild.classList.remove('drop_info_active');
            clickRef.current.lastChild.classList.add('drop_info');
        }
        else {
            clickRef.current.lastChild.classList.add('drop_info_active');
            clickRef.current.lastChild.classList.remove('drop_info');
        }
    }


    return (
        <div onClick = {active_drop_info} ref = {clickRef} className = "about_item">
            <div className="about_image">
                <img alt="item" src={props.item.img} />
            </div>
            <div className="about_text">
                {props.item.text}
            </div>
            <div className="drop_info">
                {props.item.info}
            </div>
        </div>
    );
};

export default AboutItem;