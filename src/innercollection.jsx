import vest from './assets/vest.jpg'
import sleevevest from './assets/sleevevest.jpg'
import briefs from './assets/briefs.jpg'
import trunks from './assets/trunks.jpg'
import Home from './home.jsx'
import { useParams } from 'react-router-dom'
import Navbar from './navbar.jsx'
import Footer from './Footer.jsx';

function Innercollectionlist() {
  const { shopId } = useParams();

  const ilist = [
    { id: "sleeveless", type: "SLEEVELESS VEST", image: vest, path: '/sleevelessvest' },
    { id: "vest", type: "VEST", image: sleevevest, path: '/vest' },
    { id: "briefs", type: "BRIEFS", image: briefs, path: '/briefs' },
    { id: "trunks", type: "TRUNKS", image: trunks, path: '/trunks' },
  ];

  const innercollectionlist = ilist.map((types) =>
    <Home key={types.id} type={types.type} image={types.image} path={types.path} shopId={shopId} />
  );

  return (
    <>
      <Navbar />
      <div className="collection-page">
        <div className="collection-header">
          <span className="collection-subtitle">PREMIUM SELECTION</span>
          <h1>Innerwear Collection</h1>
          <p>Comfortable and premium innerwear designed for everyday wear with the finest fabric quality.</p>
        </div>
        <div className="collection-grid">
          {innercollectionlist}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Innercollectionlist;