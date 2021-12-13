import React, { useEffect, useState} from 'react';
import cl from "../airports/Airports.module.css";
import Country from "./Country";
import axios from "axios";
import {useAuth0} from "@auth0/auth0-react";

const Countries = (props) => {

    const {getAccessTokenSilently} = useAuth0()
    const[countries,setCountries] = useState([]);

    useEffect(() => {
        fetchCountries();
    },[props.country]); // eslint-disable-line react-hooks/exhaustive-deps

    async function fetchCountries(){
        try{
            const token = await getAccessTokenSilently();
            const response = await axios.get('/countries',{
                headers:{"Authorization":`Bearer ${token}`},
            });
            setCountries(response.data)
        }catch(e)
            {
                console.log(e);
            }
        }

            return (
        <div className = {cl.container}>
            {countries.map((country) =>
                <Country country = {country} fetchCountries = {fetchCountries} key={country.country_name}/>
            )}
        </div>
    );
};

export default Countries;