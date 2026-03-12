import shirt from './assets/shirt.jpg'
import phant from './assets/phantjpg.webp'
import tshirt from './assets/tshirt.jpg'
import inner from './assets/inner.jpg'
import Home from './home.jsx'
import {useNavigate} from  'react-router-dom'
import Navbar from './navbar.jsx'


function Collectionlist()
{
const navigate =useNavigate();

const clist=[

{
        type:"SHIRT",
        image: shirt,
        path:'/shirts'

        
},

{
        
        type:"PANT",
        image:phant,
        path:'/phant'


},
{
        
        type:"TSHIRT",
        image:tshirt,
        path:'/tshirt'
},


{
        
        type:"INNERWEAR",
        image:inner,
        path:'/inner'
},



]


//clist.sort((x,y)=>x.rate - y.rate)

//const vfmclist = clist.filter((types) =>types.rate>0)



const collectionlist =clist.map((types,index) =>
< Home    key={index}       type = {types.type}  image ={types.image} path ={types.path} />


)

return(



<>
<Navbar/>

{collectionlist}
</>


);
}







export default Collectionlist