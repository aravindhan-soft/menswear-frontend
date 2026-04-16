import Home from './home.jsx'
import phant from './assets/phantjpg.webp'
import lphant from './assets/lphant.webp'
import cphant from './assets/cphant.webp'
import tphant from './assets/tphant.webp'
import { useParams } from 'react-router-dom'
import Navbar from './navbar.jsx'
import Footer from './Footer.jsx';

function Phantcollection() {
  const { shopId } = useParams();

  const phlist = [
    { id: "formal", type: "FORMAL PANT", image: phant, path: '/formalpant' },
    { id: "linen", type: "LINEN PANT", image: lphant, path: '/linenpant' },
    { id: "cargo", type: "CARGO PANT", image: cphant, path: '/cargopant' },
    { id: "track", type: "TRACK PANT", image: tphant, path: '/trackpant' },
  ];

  const phantlist = phlist.map((types) =>
    <Home key={types.id} type={types.type} image={types.image} path={types.path} shopId={shopId} />
  );

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