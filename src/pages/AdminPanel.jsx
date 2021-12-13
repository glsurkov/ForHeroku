import React, {useState} from 'react';
import ModalWindow from "../components/modalWindow/ModalWindow";
import CreateFlight from "../components/createBookings/CreateFlight";
import CreateHotel from "../components/createBookings/CreateHotel";
import CreateCountry from "../components/createBookings/CreateCountry";
import CreateAviacompany from "../components/createBookings/CreateAviacompany";
import CreateAirport from "../components/createBookings/CreateAirport";
import Button from "../components/intro/Button";
import {Link} from 'react-router-dom'
import Flights from '../components/flights/Flights'
import Airports from '../components/airports/Airports'
import Hotels from '../components/hotels/Hotels'
import Countries from '../components/countries/Countries'
import axios from "axios";
import Aviacompanies from "../components/aviacompanies/Aviacompanies";
import {useAuth0} from "@auth0/auth0-react";


const AdminPanel = () => {

    const {getAccessTokenSilently} = useAuth0();
    const [flights,setFlights] = useState([]);
    const [hotels,setHotels] = useState([]);
    const [airportState,setAirportState] = useState(false);
    const [aviacompanyState,setAviacompanyState] = useState(false);
    const [countryState,setCountryState] = useState(false);

    async function fetchHotels(event) {
        try {
            const token = await getAccessTokenSilently();
            event.preventDefault();
            const response = await axios.get('/hotels',{
                headers:{"Authorization":`Bearer ${token}`}
            });
            setHotels(response.data);
            console.log(response.data);
        }catch(e)
        {
            console.log(e);
        }
    }


    async function fetchFlights(event) {
        try {
            const token = await getAccessTokenSilently();
            event.preventDefault();
            const response = await axios.get('/flights',{
                headers:{"Authorization":`Bearer ${token}`},
            });
            setFlights(response.data);
            console.log(response.data);
        }catch(e)
        {
            console.log(e);
        }
    }

    const [modal, setModal] = useState(false);
    const [modal2, setModal2] = useState(false);
    const [modal3, setModal3] = useState(false);
    const [modal4, setModal4] = useState(false);
    const [modal5, setModal5] = useState(false);
    const [modal6, setModal6] = useState(false);
    const [modal7,setModal7] = useState(false);
    const [modal8,setModal8] = useState(false);
    const [modal9,setModal9] = useState(false);
    const [modal10,setModal10] = useState(false);

    const showModal = (state) =>
    {
        setModal(state);
    }

    const showModal2 = (state) =>
    {
        setModal2(state);
    }

    const showModal3 = (state) =>
    {
        setModal3(state);
    }

    const showModal4 = (state) =>
    {
        setModal4(state);
    }

    const showModal5 = (state) => {
        setModal5(state);
    }

    const showModal6 = (state) => {
        setModal6(state);
    }

    const showModal7 = (state) =>
    {
        setModal7(state);
    }
    const showModal8 = (state) =>
    {
        setModal8(state);
    }
    const showModal9 = (state) =>
    {
        setModal9(state);
    }
    const showModal10 = (state) =>
    {
        setModal10(state);
    }
    return (
        <div className = "intro2">
            <ModalWindow visible = {modal10} setVisible = {setModal10}>
                <Countries country = {countryState}/>
            </ModalWindow>
            <ModalWindow visible = {modal9} setVisible = {setModal9}>
                <Aviacompanies aviacompany = {aviacompanyState}/>
            </ModalWindow>
            <ModalWindow visible = {modal8} setVisible = {setModal8}>
                <Hotels hotels = {hotels} fetchHotels = {fetchHotels}/>
            </ModalWindow>
            <ModalWindow visible = {modal7} setVisible = {setModal7}>
                <Airports airport = {airportState}/>
            </ModalWindow>
            <ModalWindow visible = {modal6} setVisible = {setModal6}>
                <Flights flights={flights} fetchFlights = {fetchFlights}/>
            </ModalWindow>
            <ModalWindow visible = {modal} setVisible = {setModal}>
                <CreateFlight/>
            </ModalWindow>
            <ModalWindow visible = {modal2} setVisible = {setModal2}>
                <CreateHotel/>
            </ModalWindow>
            <ModalWindow visible = {modal3} setVisible = {setModal3}>
                <CreateCountry/>
            </ModalWindow>
            <ModalWindow visible = {modal4} setVisible = {setModal4}>
                <CreateAviacompany/>
            </ModalWindow>
            <ModalWindow visible = {modal5} setVisible = {setModal5}>
                <CreateAirport/>
            </ModalWindow>
            <div className= "block_container">
                <div className = "btn_container" onClick ={ (e) => {showModal10(true);setCountryState(Math.random())}}>
                    <Button button = {{title:"All Countries",class:"btn btn5", click:()=>{},showText:()=>{}}}/>
                </div>
                <div className = "btn_container" onClick ={ (e) => {showModal9(true);setAviacompanyState(Math.random())}}>
                    <Button button = {{title:"All Aviacompanies",class:"btn btn5", click:()=>{},showText:()=>{}}}/>
                </div>
                <div className = "btn_container" onClick ={ (e) => {showModal6(true);fetchFlights(e)}}>
                    <Button button = {{title:"All Flights",class:"btn btn5", click:()=>{},showText:()=>{}}}/>
                </div>
                <div className = "btn_container" onClick ={ (e) => {showModal8(true);fetchHotels(e)}}>
                    <Button button = {{title:"All Hotels",class:"btn btn5", click:()=>{},showText:()=>{}}}/>
                </div>
                <div className = "btn_container" onClick ={ () => {showModal7(true);setAirportState(Math.random())}}>
                    <Button button = {{title:"All Airports",class:"btn btn5", click:()=>{},showText:()=>{}}}/>
                </div>
                </div>
                <div className = "block_container1">
                <div className = "btn_container" onClick ={ () => showModal5(true)}>
                    <Button button = {{title:"Create Airport",class:"btn btn5", click:()=>{},showText:()=>{}}}/>
                </div>
                <div className = "btn_container" onClick ={ () => showModal4(true)}>
                    <Button button = {{title:"Create Aviacompany",class:"btn btn5", click:()=>{},showText:()=>{}}}/>
                </div>
                <div className = "btn_container" onClick ={ () => showModal3(true)}>
                    <Button button = {{title:"Create Country",class:"btn btn5", click:()=>{},showText:()=>{}}}/>
                </div>
                <div className = "btn_container" onClick ={ () => showModal2(true)}>
                    <Button button = {{title:"Create Hotel",class:"btn btn5", click:()=>{},showText:()=>{}}}/>
                </div>
                <div className = "btn_container" onClick ={ () => showModal(true)}>
                    <Button button = {{title:"Create Flight",class:"btn btn5", click:()=>{},showText:()=>{}}}/>
                </div>
                <Link to = "/userpage"style = {{"text-decoration":"none"}}>
                <div className = "btn_container">
                    <Button button = {{title:"Back",class:"btn btn5 btn6", click:()=>{},showText:()=>{}}}/>
                </div>
                </Link>
            </div>
        </div>
    );
};

export default AdminPanel;