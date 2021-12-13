import React, {useContext, useState, useEffect} from 'react';
import {AuthContext} from "../context";
import Button from "../components/intro/Button";
import Flight_Hotels_NAV from "../components/flights/Flight_Hotels_NAV";
import '../styles/style.css';
import Flights from "../components/flights/Flights";
import axios from 'axios';
import Hotels from "../components/hotels/Hotels";
import FilterFlights from "../components/filter/FilterFlights";
import FilterHotels from "../components/filter/FilterHotels";
import {Link} from "react-router-dom";
import LogoutButton from "../components/intro/LogoutButton";
import {useAuth0} from "@auth0/auth0-react";

const UserPage = () => {

    const {isAuthenticated,user,getAccessTokenSilently} = useAuth0();


    const linkStyle = {
        'text-decoration':'none'
    }

    const {admin,setIsAdmin,created,setCreated} = useContext(AuthContext);

    async function loginAndCreate()
    {
        try {
            if (!created) {
                setCreated(true);
                const token = await getAccessTokenSilently();
                const response = await axios.post('/auth/create', {
                    email: user.email
                }, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
                console.log(response)
                const response2 = await axios.get('/auth/admin', {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
                if (response2.data.role === 'admin') {
                    console.log('fine');
                    setIsAdmin(true);
                    console.log(admin);

                }
            }
        }catch(e)
        {
            console.log(e);
        }
    }

    useEffect (()=>{
        if (isAuthenticated)
        {
            loginAndCreate();
        }
    },[]) // eslint-disable-line react-hooks/exhaustive-deps
/*    useEffect( () => {
        if(localStorage.getItem('admin'))
        {
            setIsAdmin(true);
        }
    },[])*/ // eslint-disable-line react-hooks/exhaustive-deps
    const [flights, setFlights] = useState([]);
    const [hotels,setHotels] = useState([]);
    const [flights_hotels,setFlights_Hotels] = useState(null);

    async function fetchHotels(event,inp1,inp2,inp10,inp12) {
        try {
            event.preventDefault();
            const token = await getAccessTokenSilently();
            const response = await axios.get('/hotels',{
                headers:{"Authorization":`Bearer ${token}`},
                params:{
                    hotel_name:inp1,
                    hotel_country:inp2,
                    hotel_city:inp10,
                    room_price:inp12,
                    available:1
                }
            });
            setHotels(response.data);
            setFlights_Hotels(true);
            console.log(response.data);
        }catch(e)
        {
            console.log(e);
        }
    }

    async function fetchFlights(event,inp1,inp2,inp3,inp4,inp5,inp7,inp8,inp10,inp12,inp13) {
        try {
            event.preventDefault();
            const token = await getAccessTokenSilently();
            const response = await axios.get('/flights',{
                headers:{"Authorization":`Bearer ${token}`},
                params:{
                    company_name:inp1,
                    departure_country:inp2,
                    arrival_country:inp3,
                    departure_date:inp4,
                    arrival_date:inp7,
                    departure_time:inp5,
                    arrival_time:inp8,
                    departure_airport:inp12,
                    arrival_airport:inp13,
                    ticket_price:inp10,
                    active:1
                }
            });
            setFlights(response.data);
            setFlights_Hotels(false);
            console.log(response.data);
        }catch(e)
        {
            console.log(e);
        }
    }


    return (
        <div className = "intro2">
            <div className= "block_container">
                <Link style = {linkStyle} to = '/profile'>
                    <div className = "btn_container">
                        <Button button = {{title:"Profile", class:"btn btn5", click: ()=>{}, showText:()=>{}}}/>
                    </div>
                </Link>
                {admin ? <Link style = {linkStyle} to = '/admin'>
                <div className = "btn_container">
                    <Button button = {{title:"Admin panel", class:"btn btn5", click: ()=>{}, showText:()=>{}}}/>
                </div>
                </Link> : null}
                <LogoutButton />
            </div>
            <Flight_Hotels_NAV fetchFlights = {fetchFlights} fetchHotels = {fetchHotels} />
            {!flights_hotels ? <Flights flights = {flights}/> : <Hotels hotels = {hotels}/>}
            {!flights_hotels ? <FilterFlights fetchFlights = {fetchFlights}/> : <FilterHotels fetchHotels = {fetchHotels}/>}

        </div>
    );
};

export default UserPage;