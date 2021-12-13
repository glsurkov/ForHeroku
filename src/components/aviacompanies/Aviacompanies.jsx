import React, {useEffect, useState} from 'react';
import cl from "../airports/Airports.module.css";
import Aviacompany from "./Aviacompany";

import axios from "axios";
import {useAuth0} from "@auth0/auth0-react";

const Aviacompanies = (props) => {

   const {getAccessTokenSilently} = useAuth0()
    const[aviacompanies,setAviacompanies] = useState([]);

    async function fetchAviacompanies(){
        try{
            const token = await getAccessTokenSilently();
            const response = await axios.get('/aviacompanies',{
                headers:{"Authorization":`Bearer ${token}`},
            });
            setAviacompanies(response.data)
        }catch(e){
            console.log(e);
        }
    }

    useEffect(() => {
        fetchAviacompanies()},[props.aviacompany]); // eslint-disable-line react-hooks/exhaustive-deps



    return (
        <div className = {cl.container}>
            {aviacompanies.map((aviacompany) =>
                <Aviacompany aviacompany = {aviacompany} fetchAviacompanies = {fetchAviacompanies} key={aviacompany.company_id}/>
            )}
        </div>
    );
};

export default Aviacompanies;