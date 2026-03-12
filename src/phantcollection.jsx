import Home from './home.jsx'
import phant from'./assets/phantjpg.webp'
import lphant from './assets/lphant.webp'
import cphant from './assets/cphant.webp'
import tphant from './assets/tphant.webp'
import {useNavigate} from  'react-router-dom'
import Navbar from './navbar.jsx'

function Phantcollection (){

const navigate =useNavigate();

const phlist=[
    {
    type :"FORMAL PANT",
    image : phant,
    path:'/formalpant'
},

{
    type:"LINEN PANT",
    image :lphant,
    path:'/linenpant'
},

{
    type :"CARGO PANT",
    image :cphant,
    path:'/cargopant'
},

{

    type :"TRACK PANT",
    image :tphant,
    path:'/trackpant'

},




]

const phantlist =phlist.map((types) =>
    < Home  type={ types.type }
            image={ types.image }
            path={types.path}/>


)
return(


<div>

<Navbar/>

{phantlist}

</div>
    );
}
export default Phantcollection;