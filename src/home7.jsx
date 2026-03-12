import React from "react";
import { useNavigate } from "react-router-dom";




function Home7 (props){


    return(

        <>


        <div className="tcard" >
                <img className="home6img" src={props.image} alt="preview" />
                <p className="home6orderid">{props.orderid}</p>
                <p className="home6size">{props.size}</p>
                <p className="home6rate">{props.rate}</p>
                <p className="home6name">{props.name}</p>
                <p className="home6address">{props.address}</p>
                <p className="home6phonenum">{props.phonenum}</p>
                <p className="home6orderdate">{props.orderdate}</p>
                <p className="home6delivereddate">{props.delivereddate}</p>
                <p className="home6paymenttype">{props.paymenttype}</p>
    </div>
    </>
    );
}
export default Home7