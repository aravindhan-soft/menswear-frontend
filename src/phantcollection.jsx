import Home from './home.jsx'
import phant from'./assets/phantjpg.webp'
import lphant from './assets/lphant.webp'
import cphant from './assets/cphant.webp'
import tphant from './assets/tphant.webp'
import {useNavigate} from  'react-router-dom'
import Navbar from './navbar.jsx'
import Footer from './Footer.jsx';

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
  return (
    <>
      <Navbar />

      <div className="collection-page">
        <div className="collection-header">
          <span className="collection-subtitle">PREMIUM SELECTION</span>
          <h1>Our Pants Collection</h1>
          <p>Explore our premium collection of well-tailored pants, from sharp formals to relaxed cargos, crafted for style and enduring comfort.</p>
        </div>

        <div className="collection-grid">
          {phantlist}
        </div>
      </div>

      <Footer />
    </>
  );
}
export default Phantcollection;