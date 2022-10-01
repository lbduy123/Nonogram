import { Outlet } from "react-router-dom"

import Header from "../components/Header/Header";

export const  HeaderTemplate = (props) => {
   
        return <>
            <Header/>
            <Outlet />

        </>
 
}