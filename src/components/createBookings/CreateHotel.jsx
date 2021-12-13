import React, {useState} from 'react';
import "../signForm/SignForm.css";
import Button from "../intro/Button";
import axios from "axios";
import {useAuth0} from "@auth0/auth0-react";


const CreateHotel = () => {

    const {getAccessTokenSilently} = useAuth0();
    const [name,setName] = useState()
    const [country,setCountry] = useState()
    const [city,setCity] = useState()
    const [price,setPrice] = useState()
    const [numbers,setNumbers] = useState()


    async function addHotel(){
        try {
            const token = await getAccessTokenSilently();
            const response = await axios.post('/hotels',{
                hotel_country:`${country}`,
                room_price:price,
                rooms_in_stock:numbers,
                hotel_name:`${name}`,
                hotel_city:`${city}`
            },{headers:{"Authorization":`Bearer ${token}`}})
            console.log(response);
            setCity('');
            setName('');
            setCountry('');
            setNumbers('');
            setPrice('');
        }catch(e)
        {
            console.log(e);
        }
    }

    return (
        <div className='SignForm'>
            <input value = {name} onChange = {e => setName(e.target.value)} className = 'Input' placeholder="Название отеля"/>
            <input value = {country} onChange = {e => setCountry(e.target.value)} className = 'Input' placeholder="Страна"/>
            <input value = {city} onChange = {e => setCity(e.target.value)} className = 'Input' placeholder="Город"/>
            <input value = {price} onChange = {e => setPrice(e.target.value)} className = 'Input' placeholder="Цена номера"/>
            <input value = {numbers} onChange = {e => setNumbers(e.target.value)} className = 'Input' placeholder="Количество номеров"/>
            <div onClick = {addHotel}>
                <Button button = {{title:"Submit", class:"btn btn3", click: ()=>{}, showText:()=>{}}}/>
            </div>
        </div>
    );
};

export default CreateHotel;