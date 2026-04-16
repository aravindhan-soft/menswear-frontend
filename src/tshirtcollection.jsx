import Home from './home.jsx'
import tshirt from './assets/tshirt.jpg'
import vtshirt from './assets/vneck.jpg'
import dtshirt from './assets/dtshirt.jpg'
import potshirt from './assets/potshirt.webp'
import { useParams } from 'react-router-dom'
import Navbar from './navbar.jsx'
import Footer from './Footer.jsx';

function Tshirtcollection() {
  const { shopId } = useParams();

  const tslist = [
    { id: "roundneck", type: "ROUND NECK TSHIRT", image: tshirt, path: '/roundnecktshirt' },
    { id: "vneck", type: "V NECK TSHIRT", image: vtshirt, path: '/vnecktshirt' },
    { id: "drop", type: "DROP SHOULDER TSHIRT", image: dtshirt, path: '/dropshouldertshirt' },
    { id: "polo", type: "POLO TSHIRT", image: potshirt, path: '/polotshirt' },
  ];

  const tshirtlist = tslist.map((types) =>
    <Home key={types.id} type={types.type} image={types.image} path={types.path} shopId={shopId} />
  );

  return (
    <>
      <Navbar />
      <div className="collection-page">
        <div className="collection-header">
          <span className="collection-subtitle">PREMIUM SELECTION</span>
          <h1>Our T-Shirt Collection</h1>
          <p>Discover our range of meticulously crafted T-shirts, from classic rounds to contemporary drop-shoulders, tailored for the perfect fit and comfort.</p>
        </div>
        <div className="collection-grid">
          {tshirtlist}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Tshirtcollection;