import Home from './home.jsx'
import tshirt from'./assets/tshirt.jpg'
import vtshirt from './assets/vneck.jpg'
import dtshirt from './assets/dtshirt.jpg'
import potshirt from './assets/potshirt.webp'
import {useNavigate} from  'react-router-dom'
import Navbar from './navbar.jsx'

function Tshirtcollection (){

const navigate =useNavigate();

const tslist=[
    {
    
    type:"ROUND NECK TSHIRT",
    image:tshirt,
    path:'/roundnecktshirt'
},

{
    type:"V NECK TSHIRT",
    image :vtshirt,
    path:'/vnecktshirt'
},

{
    type :"DROP SHOULDER TSHIRT",
    image :dtshirt,
    path:'/dropshouldertshirt'
},

{

    type :"POLO TSHIRT",
    image :potshirt,
    path:'/polotshirt'

},

]

const tshirtlist =tslist.map((types) =>
    < Home  type={ types.type }
            image={ types.image }
            path={types.path}  />


)
return(


<div>

<Navbar/>

{tshirtlist}

</div>
    );
}
export default Tshirtcollection;