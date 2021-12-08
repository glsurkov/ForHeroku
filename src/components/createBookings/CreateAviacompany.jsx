import React, {useContext, useState} from 'react';
import cl from "../signForm/SignForm.module.css";
import Button from "../intro/Button";
import {AuthContext} from "../../context";
import axios from "axios";

const CreateAviacompany = () => {

    const [name,setName] = useState()
    const [phone,setPhone] = useState()
    const [raiting,setRaiting] = useState()

    const {token} = useContext(AuthContext)

    async function addAviacompany(){
        try {
            const response = await axios.post('/aviacompanies',{
                company_name:`${name}`,
                company_phone:`${phone}`,
                company_raiting:raiting
            },{headers:{"Authorization":`Bearer ${token}`}})
            console.log(response);
            setName('');
            setPhone('');
            setRaiting('');
        }catch(e)
        {
            console.log(e);
        }
    }

    return (
        <div className={cl.SignForm}>
            <input value = {name} onChange = {e => setName(e.target.value)} className = {cl.Input} placeholder="Название авиакомпании"/>
            <input value = {phone} onChange = {e => setPhone(e.target.value)} className = {cl.Input} placeholder="Номер телефона"/>
            <input value = {raiting} onChange = {e => setRaiting(e.target.value)} className = {cl.Input} placeholder="Рейтинг компании"/>
            <div onClick = {addAviacompany}>
                <Button button = {{title:"Submit", class:"btn btn3", click: ()=>{}, showText:()=>{}}}/>
            </div>
        </div>
    );
};

export default CreateAviacompany;