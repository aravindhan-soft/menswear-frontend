import React, { useState } from "react";
import Adminhomepage from "./adminhomepage";

function Uploadstock() {
const [product, setProduct] = useState("");
const [subType, setSubType] = useState("");
const [variety, setVariety] = useState("");
const [newType, setNewType] = useState("");

const [color, setColor] = useState("");
const [newColor, setNewColor] = useState("");

const [size, setSize] = useState("");
const [newSize, setNewSize] = useState("");

const [quantity, setQuantity] = useState("");
const [prize, setprize] = useState("");

const [bio, setBio] = useState("");

const [image, setImage] = useState(null);
const [imagePreview, setImagePreview] = useState("");
const handleSubmit = async () => {
    if (!product) return alert("Please select product!");
    if (!subType) return alert("Please select category!");

    const finalVariety = variety;
    const finalColor = color === "New" ? newColor : color;
    const finalSize = size === "New" ? newSize : size;

    // Variety REQUIRED only for Shirt/TShirt
    if ((product === "Shirt" || product === "TShirt") && !finalVariety) {
        return alert("Please select variety!");
    }

    if (!finalColor) return alert("Please enter color!");
    if (!finalSize) return alert("Please enter size!");
    if (!image) return alert("Please upload an image!");

    const formData = new FormData();
    formData.append("product", product);
    formData.append("category", subType);

    // Send variety only when required
    if (product === "Shirt" || product === "TShirt") {
        formData.append("variety", finalVariety);
    } else {
        formData.append("variety", "");
    }

    formData.append("color", finalColor);
    formData.append("size", finalSize);
    formData.append("prize", prize);
    formData.append("quantity", quantity);
    formData.append("bio", bio);
    formData.append("image", image);

    try {
        const res = await fetch("http://localhost:5000/api/upStock", {
            method: "POST",
            body: formData
        });

        const data = await res.json();
        if (data.success) {
            alert("Stock uploaded successfully!");
        } else {
            alert("Upload failed: " + (data.message || "Unknown error"));
        }
    } catch (err) {
        console.error("Upload error:", err);
        alert("Error uploading!");
    }
};




  // Product → Types
const [productOptions, setProductOptions] = useState({
    Shirt: ["Plain", "Checked", "Stripes", "Printed", "New"],
    TShirt: ["Polo", "Round Neck", "V Neck", "drop shoulder", "New"],
    Pant: ["Linen", "Formal", "Cargo", "Track Pant", "New"],
    Inner: ["Vest", "Sleeveless Vest", "Trunks", "Briefs", "New"],
});

  // Color Options
const [colorOptions, setColorOptions] = useState([
    "Black",
    "White",
    "Blue",
    "Grey",
    "New",
]);

  // Size Options
const [sizeOptions, setSizeOptions] = useState([
    "S",
    "M",
    "L",
    "XL",
    "XXL",
    "New",
]);

const varietyOptions = ["Full Hand", "Half Hand"];

  // Add New Type
const handleAddNewType = () => {
    if (!newType.trim()) {
    alert("Please enter valid new type!");
    return;
    }

    const updated = { ...productOptions };
    const list = [...updated[product]];

    const index = list.indexOf("New");
    list.splice(index, 0, newType.trim());

    updated[product] = list;

    setProductOptions(updated);
    setSubType(newType.trim());
    setNewType("");
    alert(`✔️ '${newType}' added successfully!`);
};

  // Add New Color
const handleAddNewColor = () => {
    if (!newColor.trim()) {
    alert("Enter valid color!");
    return;
    }

    const updated = [...colorOptions];
    const index = updated.indexOf("New");
    updated.splice(index, 0, newColor.trim());

    setColorOptions(updated);
    setColor(newColor.trim());
    setNewColor("");
    alert(`🎨 '${newColor}' color added!`);
};

  // Add New Size
const handleAddNewSize = () => {
    if (!newSize.trim()) {
    alert("Enter valid size!");
    return;
    }

    const updated = [...sizeOptions];
    const index = updated.indexOf("New");
    updated.splice(index, 0, newSize.trim());

    setSizeOptions(updated);
    setSize(newSize.trim());
    setNewSize("");
    alert(`📏 '${newSize}' size added!`);
};

  // Image Upload
const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);

    const url = URL.createObjectURL(file);
    setImagePreview(url);
};

return (








    <div style={{ textAlign: "center", marginTop: "40px" }}>
        <Adminhomepage/>
    <h2>UPLOAD STOCK</h2>

    {/* MAIN CONTAINER */}
    <div
        style={{
        width: "400px",
        margin: "20px auto",
        padding: "20px",
        border: "1px solid #cccccc",
        borderRadius: "10px",
        textAlign: "left",
        background: "#f8f8f8",
        }}
    >
        {/* PRODUCT */}
        <div style={{ marginBottom: "15px" }}>
        <label style={{ fontWeight: "bold" }}>SELECT PRODUCT: </label>
        <select
            value={product}
            onChange={(e) => {
            setProduct(e.target.value);
            setSubType("");
            setVariety("");
            setColor("");
            setSize("");
            }}
         style={{
width:"100%",
marginTop:"5px",
padding:"8px",
borderRadius:"5px",
border:"1px solid #ccc"
}}

        >
            <option value="">-- Select Product --</option>
            {Object.keys(productOptions).map((p) => (
            <option key={p} value={p}>
                {p}
            </option>
            ))}
        </select>
        </div>

        {/* SHOW BELOW ONLY IF PRODUCT SELECTED */}
        {product && (
        <>
            {/* TYPE */}
            <div style={{ marginBottom: "15px" }}>
            <label style={{ fontWeight: "bold" }}>SELECT CATEGORY: </label>
            <select
                value={subType}
                onChange={(e) => setSubType(e.target.value)}
                style={{
width:"100%",
marginTop:"5px",
padding:"8px",
borderRadius:"5px",
border:"1px solid #ccc"
}}

            >
                <option value="">-- Select Type --</option>
                {productOptions[product].map((type) => (
                <option key={type} value={type}>
                    {type}
                </option>
                ))}
            </select>
            </div>

            {/* New Type Input */}
            {subType === "New" && (
            <div style={{ marginBottom: "15px" }}>
                <label style={{ fontWeight: "bold" }}>ENTER NEW TYPE: </label>
                <div style={{ display: "flex", marginTop: "5px" }}>
                <input
                    value={newType}
                    onChange={(e) => setNewType(e.target.value)}
                    placeholder="Enter new type"
                    style={{
width:"100%",
marginTop:"5px",
padding:"8px",
borderRadius:"5px",
border:"1px solid #ccc"
}}

                />
                <button
                    onClick={handleAddNewType}
                    style={{
                    marginLeft: "10px",
                    padding: "5px 10px",
                    color: "white",
                    backgroundColor: "green",
                    border: "none",
                    borderRadius: "5px",
                    }}
                >
                    Add
                </button>
                </div>
            </div>
            )}

            {/* VARIETY */}
            {(product === "Shirt" || product === "TShirt") &&
            subType !== "New" &&
            subType && (
                <div style={{ marginBottom: "15px" }}>
                <label style={{ fontWeight: "bold" }}>SELECT VARIETY: </label>
                <select
                    value={variety}
                    onChange={(e) => setVariety(e.target.value)}
                    style={{
width:"100%",
marginTop:"5px",
padding:"8px",
borderRadius:"5px",
border:"1px solid #ccc"
}}

                >
                    <option value="">-- Select Variety --</option>
                    {varietyOptions.map((v) => (
                    <option key={v} value={v}>
                        {v}
                    </option>
                    ))}
                </select>
                </div>
            )}

            {/* COLOR */}
            <div style={{ marginBottom: "15px" }}>
            <label style={{ fontWeight: "bold" }}>SELECT COLOR: </label>
            <select
                value={color}
                onChange={(e) => setColor(e.target.value)}
              style={{
width:"100%",
marginTop:"5px",
padding:"8px",
borderRadius:"5px",
border:"1px solid #ccc"
}}

            >
                <option value="">-- Select Color --</option>
                {colorOptions.map((c) => (
                <option key={c} value={c}>
                    {c}
                </option>
                ))}
            </select>
            </div>

            {/* New Color */}
            {color === "New" && (
            <div style={{ marginBottom: "15px" }}>
                <label style={{ fontWeight: "bold" }}>ENTER NEW COLOR: </label>
                <div style={{ display: "flex", marginTop: "5px" }}>
                <input
                    value={newColor}
                    onChange={(e) => setNewColor(e.target.value)}
                    placeholder="Enter new color"
                    style={{ flex: 1 }}
                />
                <button
                    onClick={handleAddNewColor}
                    style={{
                    marginLeft: "10px",
                    padding: "5px 10px",
                    color: "white",
                    backgroundColor: "green",
                    border: "none",
                    borderRadius: "5px",
                    }}
                >
                    Add
                </button>
                </div>
            </div>
            )}

            {/* SIZE */}
            <div style={{ marginBottom: "15px" }}>
            <label style={{ fontWeight: "bold" }}>SELECT SIZE: </label>
            <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
              style={{
width:"100%",
marginTop:"5px",
padding:"8px",
borderRadius:"5px",
border:"1px solid #ccc"
}}

            >
                <option value="">-- Select Size --</option>
                {sizeOptions.map((s) => (
                <option key={s} value={s}>
                    {s}
                </option>
                ))}
            </select>
            </div>

            {/* New Size */}
            {size === "New" && (
            <div style={{ marginBottom: "15px" }}>
                <label style={{ fontWeight: "bold" }}>ENTER NEW SIZE: </label>
                <div style={{ display: "flex", marginTop: "5px" }}>
                <input
                    value={newSize}
                    onChange={(e) => setNewSize(e.target.value)}
                    placeholder="Enter new size"
                    style={{ flex: 1 }}
                />
                <button
                    onClick={handleAddNewSize}
                    style={{
                    marginLeft: "10px",
                    padding: "5px 10px",
                    color: "white",
                    backgroundColor: "green",
                    border: "none",
                    borderRadius: "5px",
                    }}
                >
                    Add
                </button>
                </div>
            </div>
            )}

            {/* PRIZE */}
            <div style={{ marginBottom: "15px" }}>
            <label style={{ fontWeight: "bold" }}>PRIZE: </label>
            <input
                type="number"
                value={prize}
                onChange={(e) => setprize(e.target.value)}
                placeholder="Enter prize"
 style={{
width:"96%",
marginTop:"5px",
padding:"8px",
borderRadius:"5px",
border:"1px solid #ccc"
}}

            />
            </div>


            {/* QUANTITY */}
            <div style={{ marginBottom: "15px" }}>
            <label style={{ fontWeight: "bold" }}>QUANTITY: </label>
            <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Enter quantity"
style={{
width:"96%",
marginTop:"5px",
padding:"8px",
borderRadius:"5px",
border:"1px solid #ccc"
}}

            />
            </div>

            {/* BIO */}
<div style={{ marginBottom: "15px" }}>
<label style={{ fontWeight: "bold" }}>BIO:</label>

<input
value={bio}
onChange={(e) => setBio(e.target.value)}
placeholder=" product description"
           style={{
width:"96%",
marginTop:"5px",
padding:"8px",
borderRadius:"5px",
border:"1px solid #ccc"
}}
/>

</div>




            {/* IMAGE UPLOAD */}
            <div style={{ marginBottom: "15px" }}>
            <label style={{ fontWeight: "bold" }}>UPLOAD IMAGE: </label>
            <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
           style={{
width:"96%",
marginTop:"5px",
padding:"8px",
borderRadius:"5px",
border:"1px solid #ccc"
}}

            />
            </div>

            {/* IMAGE PREVIEW */}
            {imagePreview && (
            <div style={{ textAlign: "center" }}>
                <img
                src={imagePreview}
                alt="Preview"
                style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "10px",
                    marginTop: "10px",
                }}
                />
            </div>
            )}
{/* SUBMIT / UPLOAD BUTTON */}
<button
style={{
    width: "100%",
    padding: "10px",
    marginTop: "15px",
    backgroundColor: "green",
    color: "white",
    fontWeight: "bold",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
}}
onClick={() => {
    if (!product) return alert("Please select product!");
    if (!subType) return alert("Please select category!");
    if ((product === "Shirt" || product === "TShirt") && !variety)
    return alert("Please select variety!");
    if (!color) return alert("Please select color!");
    if (!size) return alert("Please select size!");
    if (!quantity) return alert("Please enter quantity!");
    if (!prize) return alert("Please enter prize!");
    if (!bio) return alert("Please enter bio!");
    if (!image) return alert("Please upload an image!");
handleSubmit();
    alert("Stock Uploaded Successfully!");
}}
>
UPLOAD STOCK
</button>




        </>
        )}
    </div>
    </div>



);
}

export default Uploadstock;
