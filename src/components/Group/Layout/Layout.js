import React from "react";
import style from "./Layout.module.css"

import Header from "../Header/Header";
import Body from "../Body/Body";

const Layout = (props) => {
    return (
        <div className={style.background}>
            <Header/>
            <div style={{paddingBottom:'200px'}}></div>
            <Body/>
        </div>
    );
};
export default Layout;