import React,{useContext,useState} from 'react';
import cl from "../airports/Airport.module.css";
import {AuthContext} from "../../context";
import axios from "axios";
import ModalWindow from "../modalWindow/ModalWindow";
import cl2 from "../signForm/SignForm.css";
import Button from "../intro/Button";
import {useAuth0} from "@auth0/auth0-react";

const Aviacompany = (props) => {

    const {getAccessTokenSilently} = useAuth0()
    const {admin} = useContext(AuthContext);
    const [modal,setModal] = useState(false);
    const [name,setName] = useState(props.aviacompany.company_name);
    const [phone,setPhone] = useState(props.aviacompany.company_phone)

    async function updateAviacompany(event){
        try{
            const token = await getAccessTokenSilently();
            event.preventDefault()
            const response = await axios.put('/aviacompanies',{
                company_name:name,
                company_phone:phone,
            },{
                headers:{"Authorization":`Bearer ${token}`},
                params:{
                    company_id:props.aviacompany.company_id
                }
            })
            console.log(response);
        }catch(e)
        {
            console.log(e);
            setName(props.aviacompany.company_name);
            setPhone(props.aviacompany.company_phone);
        }
    }


    async function deleteAviacompany(event,id){
        try{
            const token = await getAccessTokenSilently();
            event.preventDefault();
            const response = await axios.delete('/aviacompanies',{
                headers:{"Authorization":`Bearer ${token}`},
                params:{
                    company_id:id
                }
            });
            console.log(response);
        }catch(e)
        {
            console.log(e);
        }
    }

    const showModal = () =>
    {
        setModal(true);
    }

    return (
        <div>
            <div className = {cl.airport}>
                <strong className={cl.company}>
                    Название : {props.aviacompany.company_name}
                </strong>
                <div className={cl.card}>
                    <div>
                        Телефон :
                        {props.aviacompany.company_phone}
                    </div>
                </div>
                {admin
                    ?
                    <div>
                        <p onClick = {(e) => {deleteAviacompany(e,props.aviacompany.company_id);props.fetchAviacompanies(e)}} className = {cl.delete}/>
                        <p onClick ={() => {showModal()}} className = {cl.update}/>
                        <ModalWindow visible={modal} setVisible={setModal}>
                            <div className = {cl2.SignForm}>
                                <input className = {cl2.Input} value = {name} onChange = {(e) => {setName(e.target.value)}}/>
                                <input className = {cl2.Input} value = {phone} onChange = {(e) => {setPhone(e.target.value)}}/>
                                <div onClick = {(e) => {updateAviacompany(e);props.fetchAviacompanies()}}>
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

export default Aviacompany;