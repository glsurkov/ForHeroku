import React, {useContext, useState} from 'react';
import cl from "../airports/Airport.module.css";
import axios from "axios";
import {AuthContext} from "../../context";
import ModalWindow from "../modalWindow/ModalWindow";
import cl2 from "../signForm/SignForm.css";
import Button from "../intro/Button";
import {useAuth0} from "@auth0/auth0-react";


const Country = (props) => {

    const {getAccessTokenSilently} = useAuth0()
    const {admin} = useContext(AuthContext);
    const [modal,setModal] = useState(false);
    const [country,setCountry] = useState(props.country.country_name)
    const [population,setPopulation] = useState(props.country.population)
    const [city,setCity] = useState(props.country.capital_city)

    async function updateCountry(event){
        try{
            const token = await getAccessTokenSilently();
            event.preventDefault()
            const response = await axios.put('/countries',{
                country_name:country,
                population:population,
                capital_city:city
            },{
                headers:{"Authorization":`Bearer ${token}`},
            })
            console.log(response);
        }catch(e)
        {
            console.log(e);
            setCountry(props.country.country_name);
            setPopulation(props.country.population);
            setCity(props.country.capital_city)
        }
    }

    async function deleteCountry(event,name){
        try{
            const token = await getAccessTokenSilently();
            event.preventDefault();
            const response = await axios.delete('/countries',{
                headers:{"Authorization":`Bearer ${token}`},
                params:{
                    country_name:name
                }
            });
            console.log(response);
        }catch(e)
        {
            console.log(e);
        }
    }

    const showModal = (state) =>
    {
        setModal(state);
    }

    return (
        <div>
            <div className = {cl.airport}>
                <strong className={cl.company}>
                    Название : {props.country.country_name}
                </strong>
                <div className={cl.card}>
                    <div>
                        Численность населения :
                        {props.country.population}
                    </div>
                    <div>
                        Столица :
                        {props.country.capital_city}
                    </div>
                </div>
                {admin
                    ?
                    <div>
                        <p onClick = {(e) => {deleteCountry(e,props.country.country_name);props.fetchCountries(e)}} className = {cl.delete}/>
                        <p onClick ={() => {showModal(true)}} className = {cl.update}/>
                        <ModalWindow visible={modal} setVisible={setModal}>
                            <div className = {cl2.SignForm}>
                                <input className = {cl2.Input} value = {country} onChange = {(e) => {setCountry(e.target.value)}}/>
                                <input className = {cl2.Input} value = {population} onChange = {(e) => {setPopulation(e.target.value)}}/>
                                <input className = {cl2.Input} value = {city} onChange = {(e) => {setCity(e.target.value)}}/>
                                <div onClick = {(e) => {updateCountry(e);props.fetchCountries()}}>
                                    <Button button = {{title:"Submit", class:"btn btn3", click: ()=>{}, showText:()=>{}}}/>
                                </div>
                            </div>
                        </ModalWindow>
                    </div>
                    : null}
            </div>
        </div>
    );
};

export default Country;