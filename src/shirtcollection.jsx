import Home from './home.jsx'
import pshirt from'./assets/pshirt.webp'
import cshirt from './assets/cshirt.webp'
import prshirt from './assets/prshirt.jpg'
import stshirt from './assets/stshirt.jpg'
import {useNavigate} from  'react-router-dom'
import Navbar from './navbar.jsx'
import Footer from './Footer.jsx';

function Shirtcollection (){

const navigate = useNavigate();

const slist=[

  {
    id: "plain",
    type: "PLAIN SHIRT",
    image: pshirt,
    path: "/plainshirt"
  },
  {
    id: "checked",
    type: "CHECKED SHIRT",
    image: cshirt,
    path: "/checkedshirt"
  },
  {
    id: "printed",
    type: "PRINTED SHIRT",
    image: prshirt,
    path: "/printedshirt"
  },
  {
    id: "stripes",
    type: "STRIPES SHIRT",
    image: stshirt,
    path: "/stripesshirt"
  }
];




const Shirtlist =slist.map((types) =>

    < Home  type={ types.type }
            key={types.id}
            image={ types.image }
            path={types.path}/>


)
  return (
    <>
      <Navbar />

      <div className="collection-page">
        <div className="collection-header">
          <span className="collection-subtitle">PREMIUM SELECTION</span>
          <h1>Our Shirt Collection</h1>
          <p>Discover our range of meticulously crafted shirts, from timeless solids to contemporary patterns, designed to elevate your everyday style.</p>
        </div>

        <div className="collection-grid">
          {Shirtlist}
        </div>
      </div>

      <Footer />
    </>
  );
}
export default Shirtcollection