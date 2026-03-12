import vest from './assets/vest.jpg'
import sleevevest from './assets/sleevevest.jpg'
import briefs from './assets/briefs.jpg'
import trunks from './assets/trunks.jpg'
import Home from './home.jsx'
import {useNavigate} from  'react-router-dom'
import Navbar from './navbar.jsx'


function Innercollectionlist(){

const navigate =useNavigate();

const ilist=[

{
        type:" SLEEVELESS VEST",
        image: vest,
        path:'/sleevelessvest'


},

{

        type:"VEST",
        image:sleevevest,
        path:'/vest'


},
{
        
        type:"BRIEFS",
        image:briefs,
        path:'/briefs'

},


{
        
        type:"TRUNKS",
        image:trunks,
        path:'/trunks'
},



]


//clist.sort((x,y)=>x.rate - y.rate)

//const vfmclist = clist.filter((types) =>types.rate>0)



const innercollectionlist =ilist.map((types) =>
< Home  type = {types.type}  image ={types.image} path={types.path} />


)

return(



<>

<Navbar/>
{innercollectionlist}
</>


);
}







export default Innercollectionlist