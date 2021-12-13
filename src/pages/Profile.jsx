import React,{useState,useEffect} from 'react';
import axios from "axios";
import User from "../components/userinfo/User";
import {Link} from "react-router-dom"
import Button from "../components/intro/Button";
import {useAuth0} from "@auth0/auth0-react";

const Profile = () => {

    const {getAccessTokenSilently,user} = useAuth0();
    const [user1,setUser1] = useState({});

    async function fetchUser()
    {
        const token = await getAccessTokenSilently();
        try {
            const response = await axios.get('/auth/user', {
                headers: {"Authorization": `Bearer ${token}`},
                params:{
                    email:user.email
                }
            });
            setUser1(response.data);
        }catch(e)
        {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchUser()
    },[]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className = "intro2">
            <User user1={user1} fetchUser={fetchUser}/>
            <Link to = "/userpage"style = {{"text-decoration":"none"}}>
                <div className = "btn_container back_btn">
                    <Button button = {{title:"Back",class:"btn btn5 btn6", click:()=>{},showText:()=>{}}}/>
                </div>
            </Link>
        </div>
    );
};

export default Profile;