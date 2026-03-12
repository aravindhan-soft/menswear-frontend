import React, { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import Adminhomepage from "./adminhomepage";

function Availablestock() {
    const [stock, setStock] = useState([]);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        fetch("http://localhost:5000/getAvailableStock")
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setStock(data.data);
                }
            })
            .catch(err => console.error("Error loading stock:", err));
    }, []);

    const filteredStock = stock.filter(item => {
        const text = searchText.toLowerCase();

        return (
            (item.category || "").toLowerCase().includes(text) ||
            (item.variety || "").toLowerCase().includes(text) ||
            (item.color || "").toLowerCase().includes(text) ||
            item.sizes.some(s =>
            s.size.toLowerCase().includes(text)
            )
        );
    });

    return (
        <div>
            <Adminhomepage />

            {/* SEARCH BAR */}
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search category, variety, color, size..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <GoSearch className="search-icon" />
            </div>

            <br /><br />

            <table>
                <thead>
                    <tr>
                        <th>CATEGORY</th>
                        <th>VARIETY</th>
                        <th>COLOR</th>
                        <th>SIZES</th>
                        <th>QUANTITY</th>
                        <th>PRICE</th>
                        <th>IMAGE</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredStock.length === 0 ? (
                        <tr>
                            <td colSpan="7" style={{ textAlign: "center" }}>
                                No stock found
                            </td>
                        </tr>
                    ) : (
                        filteredStock.map((item, index) => (
                            <tr key={index}>

                                {/* FIX HERE – NULL HANDLING */}
                                <td>{item.category || "—"}</td>
                                <td>{item.variety || "—"}</td>
                                <td>{item.color || "—"}</td>

                                <td>
                                    {item.sizes.map((s, i) => (
                                        <div key={i}>{s.size}</div>
                                    ))}
                                </td>

                                <td>
                                    {item.sizes.map((s, i) => (
                                        <div key={i}>{s.quantity}</div>
                                    ))}
                                </td>

                                <td>
                                    {item.sizes.map((s, i) => (
                                        <div key={i}>₹{s.prize}</div>
                                    ))}
                                </td>

                                <td>
                                    {item.image ? (
                                        <img
                                            src={item.image}
                                            width="50"
                                            height="50"
                                            alt="product"
                                            style={{ borderRadius: "4px" }}
                                        />
                                    ) : "No Image"}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Availablestock;
