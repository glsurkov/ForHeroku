import './styles/style.css';
import React,{useState} from "react";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/UI/AppRouter";
import {AuthContext} from "./context";


function App() {

    const [created,setCreated] = useState(false)
    const [admin,setIsAdmin] = useState(false);

  return (
    <AuthContext.Provider value = {
            {
                admin,
                setIsAdmin,
                created,
                setCreated
            }
         }>
        <BrowserRouter>
            <AppRouter/>
        </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
