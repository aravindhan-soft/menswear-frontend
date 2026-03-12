import Navbar from "./navbar.jsx";
import Home5 from "./home5.jsx";
import { useCart } from "./context/CartContext";

function Cartpage() {
const { cart, removeFromCart } = useCart();

return (
    <div>
    <Navbar />

    {cart.length === 0 ? (
        <h2 style={{ textAlign: "center" }}>Cart is Empty</h2>
    ) : (
        cart.map((item, index) => (
        <Home5
            key={index}
            item={item}
            onDelete={() => removeFromCart(item.image)}
        />
        ))
    )}
    </div>
);
}

export default Cartpage;
