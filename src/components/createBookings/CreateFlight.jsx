import React, { useState} from 'react';
import Button from "../intro/Button";
import axios from "axios";
import {useAuth0} from "@auth0/auth0-react";

const CreateFlight = () => {

    const {getAccessTokenSilently} = useAuth0();
    const [name,setName] = useState('')
    const [departure_date,setDeparture_date] = useState('')
    const [departure_time,setDeparture_time] = useState('')
    const [departure_airport_name,setDeparture_airport_name] = useState('')
    const [arrival_date,setArrival_date] = useState('')
    const [arrival_time,setArrival_time] = useState('')
    const [arrival_airport_name,setArrival_airport_name] = useState('')
    const [tickets_in_stock,setTickets_in_stock] = useState('')
    const [ticket_price,setTicket_price] = useState('')


    async function addFlight(){
        try {
            const token = await getAccessTokenSilently();
            const response = await axios.post('/flights',{
                company_name:`${name}`,
                departure_date:departure_date,
                departure_time:`${departure_time}`,
                departure_airport_name: `${departure_airport_name}`,
                arrival_date:arrival_date,
                arrival_time:`${arrival_time}`,
                arrival_airport_name:`${arrival_airport_name}`,
                tickets_in_stock:tickets_in_stock,
                ticket_price:ticket_price
            },{headers:{"Authorization":`Bearer ${token}`}})
            console.log(response);
            setTicket_price('');
            setName('');
            setTickets_in_stock('');
            setArrival_airport_name('');
            setDeparture_airport_name('');
            setArrival_date('');
            setArrival_time('');
            setDeparture_date('');
            setDeparture_time('');
        }catch(e)
        {
            console.log(e);
        }
    }


    return (
        <div className='SignForm'>
            <input value = {name} onChange = {e => setName(e.target.value)} className = 'Input' placeholder="Название авиакомпании"/>
            <input value = {departure_date} onChange = {e => setDeparture_date(e.target.value)} className = 'Input' placeholder="Дата вылета"/>
            <input value = {departure_time} onChange = {e => setDeparture_time(e.target.value)} className = 'Input' placeholder="Время вылета"/>
            <input value = {departure_airport_name} onChange = {e => setDeparture_airport_name(e.target.value)} className = 'Input' placeholder="Аэропорт вылета"/>
            <input value = {arrival_date} onChange = {e => setArrival_date(e.target.value)} className = 'Input' placeholder="Дата прилета"/>
            <input value = {arrival_time} onChange = {e => setArrival_time(e.target.value)} className = 'Input' placeholder="Время прилета"/>
            <input value = {arrival_airport_name} onChange = {e => setArrival_airport_name(e.target.value)} className = 'Input' placeholder="Аэропорт прилета"/>
            <input value = {tickets_in_stock} onChange = {e => setTickets_in_stock(e.target.value)} className = 'Input' placeholder="Количество билетов"/>
            <input value = {ticket_price} onChange = {e => setTicket_price(e.target.value)} className = 'Input' placeholder="Цена билета"/>
            <div onClick = {addFlight}>
                <Button button = {{title:"Submit", class:"btn btn3", click: ()=>{}, showText:()=>{}}}/>
            </div>
        </div>
    );
};

export default CreateFlight;