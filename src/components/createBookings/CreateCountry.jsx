import React, {useState} from 'react';
import Button from "../intro/Button";
import axios from "axios";
import {useAuth0} from "@auth0/auth0-react";


const CreateCountry = () => {

    const {getAccessTokenSilently} = useAuth0()
    const [name,setName] = useState('')
    const [population,setPopulation] = useState('')
    const [city,setCity] = useState('')


    async function addCountry(){
        try {
            const token = await getAccessTokenSilently();
            const response = await axios.post('/countries',{
                country_name:`${name}`,
                population:population,
                capital_city:`${city}`
            },{headers:{"Authorization":`Bearer ${token}`}})
            console.log(response);
            setCity('');
            setName('');
            setPopulation('');
        }catch(e)
        {
            console.log(e);
        }
    }


    return (
        <div className='SignForm'>
            <input value = {name} onChange={e => setName(e.target.value)} className = 'Input' placeholder="Страна"/>
            <input value = {population} onChange={e => setPopulation(e.target.value)} className = 'Input' placeholder="Насленение"/>
            <input value = {city} onChange={e => setCity(e.target.value)} className = 'Input' placeholder="Столица"/>
            <div onClick = {addCountry}>
                <Button button = {{title:"Submit", class:"btn btn3", click: ()=>{}, showText:()=>{}}}/>
            </div>
        </div>
    );
}


export default CreateCountry;