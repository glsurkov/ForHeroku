import React, {useState} from 'react';
import Button from "../intro/Button";
import axios from "axios";
import {useAuth0} from "@auth0/auth0-react";

const CreateAirport = () => {

    const {getAccessTokenSilently} = useAuth0()
    const [name,setName] = useState('')
    const [country,setCountry] = useState('')
    const [city,setCity] = useState('')


    async function addAirport(){
        try {
            const token = await getAccessTokenSilently();
            const response = await axios.post('/airports',{
                airport_name:`${name}`,
                airport_country:`${country}`,
                airport_city:`${city}`
            },{headers:{"Authorization":`Bearer ${token}`}})
            console.log(response);
            setName('');
            setCountry('');
            setCity('');
        }catch(e)
        {
            console.log(e);
        }
    }


    return (
        <div className='SignForm'>
            <input value = {name} onChange = {e => setName(e.target.value)} className = 'Input' placeholder="Название аэропорта"/>
            <input value ={country} onChange = {e => setCountry(e.target.value)} className = 'Input' placeholder="Страна"/>
            <input value = {city} onChange = {e => setCity(e.target.value)} className = 'Input' placeholder="Город"/>
            <div onClick = {addAirport}>
                <Button button = {{title:"Submit", class:"btn btn3", click: ()=>{}, showText:()=>{}}}/>
            </div>
        </div>
    );
};

export default CreateAirport;