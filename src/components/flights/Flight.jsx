import React, {useContext,useState} from 'react';
import cl from "./Flight.module.css"
import axios from "axios";
import {AuthContext} from "../../context";
import ModalWindow from "../modalWindow/ModalWindow";
import cl2 from "../signForm/SignForm.css";
import Button from "../intro/Button";
import cl3 from "../airports/Airport.module.css";
import {useAuth0} from "@auth0/auth0-react";

const Flight = (props) => {

    const {getAccessTokenSilently,user} = useAuth0()
    const {admin} = useContext(AuthContext);
    const [modal,setModal] = useState(false);
    const [company,setCompany] = useState(props.flight.aviacompany.company_name);
    const [dep_date,setDep_date] = useState(props.flight.departure_date);
    const [dep_time,setDep_time] = useState(props.flight.departure_time);
    const [dep_airport,setDep_airport] = useState(props.flight.departure_airport.airport_name);
    const [arr_date,setArr_date] = useState(props.flight.arrival_date);
    const [arr_time,setArr_time] = useState(props.flight.arrival_time)
    const [arr_airport,setArr_airport] = useState(props.flight.arrival_airport.airport_name);
    const [price,setPrice] = useState(props.flight.ticket_price);
    const [tickets,setTickets] = useState(props.flight.tickets_in_stock)


    async function updateFlight(event){
        try{
            const token = await getAccessTokenSilently();
            event.preventDefault()
            const response = await axios.put('/flights',{
                company_name:company,
                departure_date:dep_date,
                departure_time:dep_time,
                departure_airport:dep_airport,
                arrival_date:arr_date,
                arrival_time:arr_time,
                arrival_airport:arr_airport,
                ticket_price:price,
                tickets_in_stock:tickets
            },{
                headers:{"Authorization":`Bearer ${token}`},
                params:{
                    flight_id:props.flight.flight_id
                }
            })
            console.log(response);
        }catch(e)
        {
            console.log(e);
            setCompany(props.flight.aviacompany.company_name);
            setDep_date(props.flight.departure_date);
            setDep_time(props.flight.departure_time);
            setDep_airport(props.flight.departure_airport.airport_name);
            setArr_date(props.flight.arrival_date);
            setArr_time(props.flight.arrival_time);
            setArr_airport(props.flight.arrival_airport.airport_name);
            setPrice(props.flight.ticket_price);
            setTickets(props.flight.tickets_in_stock)
        }
    }


    async function bookFlight(event,id,price){
        try{
            const token = await getAccessTokenSilently();
            event.preventDefault();
            const response = await axios.post('/bookings/flight',{
                ticket_price: price,
                flight_id: id,
            },
                {
                headers:{'Authorization':`Bearer ${token}`},
                    params:{
                        email:user.email
                    }
            });
            console.log(response);
        }catch(e)
        {
            console.log(e);
        }
    }



    async function deleteFlight(event,id){
        try{
            const token = await getAccessTokenSilently();
            event.preventDefault();
            const response = await axios.delete('/flights',{
                headers:{"Authorization":`Bearer ${token}`},
                params:{
                    flight_id:id
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
                <div className={cl.flight}>
                    <strong className={cl.company}>
                        Компания : {props.flight.aviacompany.company_name}
                        {props.flight.tickets_in_stock === 0 ? <h2>БИЛЕТОВ НЕТ</h2> : null}
                    </strong>
                    <div className={cl.card}>
                        <div>
                            Дата и время вылета :
                            <br/>
                            {props.flight.departure_date.slice(0, 10)} {props.flight.departure_time.slice(0, 5)}
                        </div>
                        <div>
                            Вылет из : {props.flight.departure_airport.airport_name}
                        </div>
                    </div>
                    <div className={cl.card}>
                        <div>
                            Дата и время прилета:
                            <br/>
                            {props.flight.arrival_date.slice(0, 10)} {props.flight.arrival_time.slice(0, 5)}
                        </div>
                        <div>
                            Прилет в : {props.flight.arrival_airport.airport_name}
                        </div>
                    </div>
                    <div className={cl.card}>
                        Цена билета : {props.flight.ticket_price}
                    </div>
                    {admin
                        ?
                        <div>
                            <p onClick={(e) => {
                                deleteFlight(e, props.flight.flight_id);
                                props.fetchFlights(e)
                            }} className={cl.delete}/>
                            <p onClick ={() => {showModal(true)}} className = {cl3.update}/>
                            <ModalWindow visible={modal} setVisible={setModal}>
                                <div className = {cl2.SignForm}>
                                    <input className = {cl2.Input} value = {company} onChange = {(e) => {setCompany(e.target.value)}}/>
                                    <input className = {cl2.Input} value = {dep_date} onChange = {(e) => {setDep_date(e.target.value)}}/>
                                    <input className = {cl2.Input} value = {dep_time} onChange = {(e) => {setDep_time(e.target.value)}}/>
                                    <input className = {cl2.Input} value = {dep_airport} onChange = {(e) => {setDep_airport(e.target.value)}}/>
                                    <input className = {cl2.Input} value = {arr_date} onChange = {(e) => {setArr_date(e.target.value)}}/>
                                    <input className = {cl2.Input} value = {arr_time} onChange = {(e) => {setArr_time(e.target.value)}}/>
                                    <input className = {cl2.Input} value = {arr_airport} onChange = {(e) => {setArr_airport(e.target.value)}}/>
                                    <input className = {cl2.Input} value = {price} onChange = {(e) => {setPrice(e.target.value)}}/>
                                    <input className = {cl2.Input} value = {tickets} onChange = {(e) => {setTickets(e.target.value)}}/>
                                    <div onClick = {(e) => {updateFlight(e);props.fetchFlights()}}>
                                        <Button button = {{title:"Submit", class:"btn btn3", click: ()=>{}, showText:()=>{}}}/>
                                    </div>
                                </div>
                            </ModalWindow>
                        </div>
                        : null}
                    <p onClick={(e) => {
                        bookFlight(e, props.flight.flight_id, props.flight.ticket_price)
                    }} className={cl.buy}> BUY </p>
                </div>
            </div>
        );
};

export default Flight;