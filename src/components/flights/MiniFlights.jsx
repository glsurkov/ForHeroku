import React,{useEffect} from 'react';
import cl from "./miniFlights.module.css";
import MiniFlight from './MiniFlight'


const MiniFlights = (props) => {
    useEffect(()=>console.log("rerender"),
        [props.flights])
    return (
        <div className = {cl.container}>
            {props.flights.map((flight) =>
                <MiniFlight flight = {flight} key={flight["flights.users_flight.flight_order"]}/>
            )}
        </div>
    );
};

export default MiniFlights;