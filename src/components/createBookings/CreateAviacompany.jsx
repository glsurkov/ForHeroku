import React, {useState} from 'react';
import Button from "../intro/Button";
import axios from "axios";
import {useAuth0} from "@auth0/auth0-react";


const CreateAviacompany = () => {

    const {getAccessTokenSilently} = useAuth0();
    const [name,setName] = useState('')
    const [phone,setPhone] = useState('')

    async function addAviacompany(){
        try {
            const token = await getAccessTokenSilently();
            const response = await axios.post('/aviacompanies',{
                company_name:`${name}`,
                company_phone:`${phone}`,
            },{headers:{"Authorization":`Bearer ${token}`}})
            console.log(response);
            setName('');
            setPhone('');
        }catch(e)
        {
            console.log(e);
        }
    }

    return (
        <div className='SignForm'>
            <input value = {name} onChange = {e => setName(e.target.value)} className= 'Input' placeholder="Название авиакомпании"/>
            <input value = {phone} onChange = {e => setPhone(e.target.value)} className = 'Input' placeholder="Номер телефона"/>
            <div onClick = {addAviacompany}>
                <Button button = {{title:"Submit", class:"btn btn3", click: ()=>{}, showText:()=>{}}}/>
            </div>
        </div>
    );
};

export default CreateAviacompany;