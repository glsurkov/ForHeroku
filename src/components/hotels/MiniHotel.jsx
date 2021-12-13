import React,{useState,useEffect} from 'react';
import cl from "../flights/miniFlight.module.css";
import axios from 'axios'
import ModalWindow from "../modalWindow/ModalWindow";
import Button from '../intro/Button'
import Images from "./Images";
import {useAuth0} from "@auth0/auth0-react";

const MiniHotel = (props) => {

    const {getAccessTokenSilently} = useAuth0();
    const [modal,setModal] = useState(false);
    const [file,setFile] = useState('');
    const [filePath,setFilepath] = useState('Choose File');
    const [images,setImages] = useState([])

    useEffect(() => {
            fetchImages()
    },[filePath]) // eslint-disable-line react-hooks/exhaustive-deps

    async function fetchImages(){
        try{
            const token = await getAccessTokenSilently();
            const response = await axios.get('/hotels/images',{
                headers:{
                    'Authorization':`Bearer ${token}`
                },
                params:{
                    hotel_id:props.hotel['hotels.hotel_id']
                }
            })
            setImages(response.data);
        }catch(e)
        {
            console.log(e);
        }
    }



    async function postPicture(e,hotel_id){
        const formData = new FormData();
        formData.append('hotelimage',file)
        try{
            const token = await getAccessTokenSilently();
          const response = await axios.post('/hotels/upload',formData,{
              headers:{
                  'Content-type':'multipart/form-data',
                  'Authorization':`Bearer ${token}`
              },
              params:{
                  hotel_id:hotel_id
              }
          })
            console.log(response);
            setFilepath(response.data.path);
        }catch(e)
        {
            console.log(e);
        }
    }


    async function getHotel(e,hotel_id){
        try{
            const token = await getAccessTokenSilently();
            e.preventDefault();
            const response = await axios.get('/hotels/',{
                headers: {'Authorization':`Bearer ${token}`},
                params:{
                    hotel_id:hotel_id
                }
            })
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
        <div className={cl.card}>
            <div className = {cl.company} onClick = {e => {getHotel(e,props.hotel['hotels.hotel_id']);showModal(true)}}>
                Компания : {props.hotel["hotels.hotel_name"]}
            </div>
            <div>
                Дата заезда :
                <br/>
                {props.hotel["hotels.users_hotel.arrival_date"].slice(0,10)}
            </div>
            <div>
                <div>
                    Дата выезда :
                    <br/>
                    {props.hotel["hotels.users_hotel.departure_date"].slice(0,10)}
                </div>
            </div>
            <ModalWindow visible ={modal} setVisible={setModal}>
                <h2>{props.hotel["hotels.hotel_name"]}</h2>
                <h2>Страна</h2>
                <div className = {cl.hotel}>
                    {props.hotel["hotels.hotel_country"]}
                </div>
                <h2>Город</h2>
                <div className = {cl.hotel}>
                    {props.hotel["hotels.hotel_city"]}
                </div>
                <h2>Фотографии</h2>
               {
                    filePath
                    ? <Images images={images} fetchImages = {fetchImages}/> : null
                }
                {props.hotel["hotels.users_hotel.active"] === 0 ? <div>
                    <h2>Прикрепите фото места отдыха:</h2>
                    <input type = "file" onChange = {e => {setFile(e.target.files[0])}}/>
                    <div onClick = {e => {postPicture(e,props.hotel['hotels.hotel_id']);/*fetchImages()*/}}>
                        <Button button = {{title:"Submit", class:"btn btn3", click: ()=>{}, showText:()=>{}}}/>
                    </div>
                </div> : null}

            </ModalWindow>
        </div>
    );
};

export default MiniHotel;