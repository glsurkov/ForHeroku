import React, {useContext,useState} from 'react';
import cl from "../flights/Flight.module.css"
import axios from "axios";
import {AuthContext} from "../../context";
import ModalWindow from "../modalWindow/ModalWindow";
import Button from "../intro/Button";
import cl2 from "../signForm/SignForm.css";
import  cl3 from "../airports/Airport.module.css"
import {useAuth0} from "@auth0/auth0-react";

const Hotel = (props) => {

    const {admin} = useContext(AuthContext);
    const {getAccessTokenSilently,user} = useAuth0()

    const [modal,setModal] = useState(false);
    const [modal2,setModal2] = useState(false);
    const [inp1,setInp1] = useState('');
    const [inp2,setInp2] = useState('');
    const [country,setCountry] = useState(props.hotel.hotel_country);
    const [price,setPrice] = useState(props.hotel.room_price);
    const [rooms,setRooms] = useState(props.hotel.rooms_in_stock);
    const [name,setName] = useState(props.hotel.hotel_name);
    const [city,setCity] = useState(props.hotel.hotel_city);


    async function updateHotel(event)
    {
        const token = await getAccessTokenSilently();
        try{
            event.preventDefault()
            const response = await axios.put('/hotels',{
                hotel_name:name,
                room_price:price,
                rooms_in_stock:rooms,
                hotel_city:city,
                hotel_country:country
            },{
                headers:{"Authorization":`Bearer ${token}`},
                params:{
                    hotel_id:props.hotel.hotel_id
                }
            })
            console.log(response);
        }catch(e)
        {
            console.log(e);
            setName(props.hotel.hotel_name);
            setPrice(props.hotel.room_price);
            setRooms(props.hotel.rooms_in_stock);
            setCity(props.hotel.hotel_city);
            setCountry(props.hotel.hotel_country);
        }
    }

    async function bookHotel(event,id,price,inp1,inp2){
        try{
            const token = await getAccessTokenSilently();
            event.preventDefault();
            const response = await axios.post('/bookings/hotel',{
                    room_price: price,
                    hotel_id: id,
                    arrival_date:inp1,
                    departure_date:inp2,
                },
                {
                    headers:{'Authorization':`Bearer ${token}`},
                    params:{
                        email:user.email
                    }
                });
            console.log(response);
            setInp1('');
            setInp2('');
        }catch(e)
        {
            console.log(e);
        }
    }


    async function deleteHotel(event,id){
        try{
            const token = await getAccessTokenSilently();
            event.preventDefault();
            const response = await axios.delete('/hotels',{
                headers:{"Authorization":`Bearer ${token}`},
                params:{
                    hotel_id:id
                }
            });
            console.log(response);
        }catch(e)
        {
            console.log(e);
        }
    }

    const showModal = (state) => {
        setModal(state);
    }

    const showModal2 = (state) => {
        setModal2(state);
    }

    return (
        <div>
            <div className = {cl.flight}>
                <strong className={cl.company}>
                    Отель - {props.hotel.hotel_name}
                </strong>
                <div className={cl.card}>
                    <div>
                         Страна: {props.hotel.hotel_country}
                    </div>
                    <div>
                        Город: {props.hotel.hotel_city}
                    </div>
                </div>
                <div className={cl.card}>
                    <div>
                        Цена:  {props.hotel.room_price}
                    </div>
                    <div>

                    </div>
                </div>
                {admin
                    ?
                    <div>
                        <p onClick = {(e) => {deleteHotel(e,props.hotel.hotel_id);props.fetchHotels(e)}} className = {cl.delete}/>
                        <p onClick ={() => {showModal2(true)}} className = {cl3.update}/>
                        <ModalWindow visible={modal2} setVisible={setModal2}>
                            <div className = {cl2.SignForm}>
                                <input className = {cl2.Input} value = {name} onChange = {(e) => {setName(e.target.value)}}/>
                                <input className = {cl2.Input} value = {country} onChange = {(e) => {setCountry(e.target.value)}}/>
                                <input className = {cl2.Input} value = {city} onChange = {(e) => {setCity(e.target.value)}}/>
                                <input className = {cl2.Input} value = {price} onChange = {(e) => {setPrice(e.target.value)}}/>
                                <input className = {cl2.Input} value = {rooms} onChange = {(e) => {setRooms(e.target.value)}}/>
                                <div onClick = {(e) => {updateHotel(e);props.fetchHotels(e)}}>
                                    <Button button = {{title:"Submit", class:"btn btn3", click: ()=>{}, showText:()=>{}}}/>
                                </div>
                            </div>
                        </ModalWindow>
                    </div>
                    : null}
                <ModalWindow visible={modal} setVisible={setModal}>
                    <h3>Дата заезда</h3>
                    <input value = {inp1} onChange = {(e) => setInp1(e.target.value)} type='date'/>
                    <h3>Дата выезда</h3>
                    <input value = {inp2} onChange = {(e) => setInp2(e.target.value)} type='date'/>
                    <div onClick = {(e) => {bookHotel(e,props.hotel.hotel_id,props.hotel.room_price,inp1,inp2)}}>
                        <Button button = {{title:"Submit", class:"btn btn3", click: ()=>{}, showText:()=>{}}}/>
                    </div>
                </ModalWindow>
                <p onClick = {() => showModal(true)} className = {cl.buy}> BUY </p>
            </div>
        </div>
    );
};

export default Hotel;