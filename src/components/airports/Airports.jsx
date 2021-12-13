import React, {useState, useEffect} from 'react';
import cl from "./Airports.module.css";
import Airport from './Airport'
import axios from "axios";
import {useAuth0} from "@auth0/auth0-react";


const Airports = (props) => {

    const {getAccessTokenSilently} = useAuth0();
    const[airports,setAirports] = useState([]);

    async function fetchAirports(){
        try{
            const token = await getAccessTokenSilently();
            const response = await axios.get('/airports',{
                headers:{"Authorization":`Bearer ${token}`},
            });
            setAirports(response.data)
        }catch(e){
            console.log(e);
        }
    }

    useEffect(() =>{
        async function fetchAirports(){
            try{
                const token = await getAccessTokenSilently();
                const response = await axios.get('/airports',{
                    headers:{"Authorization":`Bearer ${token}`},
                });
                setAirports(response.data)
            }catch(e){
                console.log(e);
            }
        }
        fetchAirports()
    },[props.airport]) // eslint-disable-line react-hooks/exhaustive-deps



    return (
        <div className = {cl.container}>
            {airports.map((airport) =>
                <Airport airport = {airport} fetchAirports = {fetchAirports} key={airport.airport_id}/>
            )}
        </div>
    );
};

export default Airports;