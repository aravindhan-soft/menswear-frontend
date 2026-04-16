import shirt from './assets/shirt.jpg'
import phant from './assets/phantjpg.webp'
import tshirt from './assets/tshirt.jpg'
import inner from './assets/inner.jpg'
import Home from './home.jsx'
import { useParams } from 'react-router-dom'
import Navbar from './navbar.jsx'
import Footer from './Footer.jsx';

function Collectionlist() {
  const { shopId } = useParams();

  const clist = [
    {
      type: "SHIRT",
      image: shirt,
      path: '/shirts',
    },
    {
      type: "PANT",
      image: phant,
      path: '/pants',
    },
    {
      type: "TSHIRT",
      image: tshirt,
      path: '/tshirts',
    },
    {
      type: "INNERWEAR",
      image: inner,
      path: '/innerwear',
    },
  ];

  const collectionlist = clist.map((types, index) =>
    <Home key={index} type={types.type} image={types.image} path={types.path} shopId={shopId} />
  );

  return (
    <>
      <Navbar />

      <div className="collection-page">
        <div className="collection-header">
          <h1>Curated Collections</h1>
          <p>Explore our premium selection of men's wear, crafted for the modern man who values quality and sophistication.</p>
        </div>

        <div className="collection-grid">
          {collectionlist}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Collectionlist;