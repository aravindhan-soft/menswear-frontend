import React from "react";
import { useNavigate } from "react-router-dom";




function Home (props){
const navigate=useNavigate();

    return(

        <>


        <div className="card"
    onClick={() => {
        if (props.path) {
        navigate(props.path);
        } else {
        console.log("No path found for:", props.type);
        }
    }}  >
                <img src={props.image} alt="preview" />
                <p>{props.type}</p>



    </div>
    </>
    );
}
export default Home