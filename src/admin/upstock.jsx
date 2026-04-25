import React, { useState } from "react";
import Adminhomepage from "./adminhomepage";

function Uploadstock() {
  const [product, setProduct] = useState("");
  const [subType, setSubType] = useState("");
  const [variety, setVariety] = useState("");
  const [newType, setNewType] = useState("");

  const [color, setColor] = useState("");
  const [newColor, setNewColor] = useState("");

  const [sizeList, setSizeList] = useState([]);
  const [currentSize, setCurrentSize] = useState("");
  const [newSize, setNewSize] = useState("");

  const [currentQuantity, setCurrentQuantity] = useState("");
  const [currentPrize, setCurrentPrize] = useState("");

  const [bio, setBio] = useState("");

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const handleSubmit = async () => {

    if (!product) return alert("Please select product!");
    if (!subType) return alert("Please select category!");

    const finalVariety = variety;
    const finalColor = color === "New" ? newColor : color;

    if ((product === "Shirt" || product === "TShirt") && !finalVariety)
      return alert("Please select variety!");

    if (!finalColor) return alert("Please enter color!");
    if (sizeList.length === 0) return alert("Please add at least one size variant with quantity and price!");
    if (!image) return alert("Please upload an image!");

    const shopid = localStorage.getItem("shopId");

    try {
      for (const item of sizeList) {
        const { size: finalSize, quantity, prize } = item;
        const formData = new FormData();

        formData.append("shopid", shopid);
        formData.append("product", product);
        formData.append("category", subType);
        formData.append("variety", finalVariety || "");
        formData.append("color", finalColor);
        formData.append("size", finalSize);
        formData.append("prize", prize);
        formData.append("quantity", quantity);
        formData.append("bio", bio);
        formData.append("image", image);

        const res = await fetch("https://menswear-backend-production.up.railway.app/api/upStock", {
          method: "POST",
          body: formData
        });

        const data = await res.json();
        if (!data.success) {
          console.warn("Issue uploading size variant:", finalSize, data.message);
        }
      }

      alert("Stock uploaded successfully for all selected sizes!");
      setSizeList([]);
    } catch (err) {
      console.log(err);
      alert("Upload failed!");
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
  const handleAddNewSizeOption = () => {
    if (!newSize.trim()) {
      alert("Enter valid size!");
      return;
    }

    const updated = [...sizeOptions];
    const index = updated.indexOf("New");
    updated.splice(index, 0, newSize.trim());

    setSizeOptions(updated);
    setCurrentSize(newSize.trim());
    setNewSize("");
    alert(`📏 '${newSize}' size option added!`);
  };

  const handleAddSizeVariant = () => {
    const finalSize = currentSize === "New" ? newSize : currentSize;
    if (!finalSize) return alert("Select or enter a size!");
    if (!currentQuantity || currentQuantity <= 0) return alert("Enter valid quantity!");
    if (!currentPrize || currentPrize <= 0) return alert("Enter valid price!");

    // Check if size already exists in the list
    if (sizeList.some((item) => item.size === finalSize)) {
      return alert("This size is already added!");
    }

    setSizeList([...sizeList, {
      size: finalSize,
      quantity: currentQuantity,
      prize: currentPrize
    }]);

    setCurrentSize("");
    setNewSize("");
    setCurrentQuantity("");
    setCurrentPrize("");
  };

  const handleRemoveSizeVariant = (indexToRemove) => {
    setSizeList(sizeList.filter((_, index) => index !== indexToRemove));
  };

  // Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);

    const url = URL.createObjectURL(file);
    setImagePreview(url);
  };

  return (
    <div className="v10-loft-wrapper">
      <Adminhomepage />

      <div className="v10-container">
        <header className="v10-header">
          <div>
            <h1>Asset Registry</h1>
            <p>Curating the permanent inventory collection</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#94a3b8' }}>ADMINISTRATIVE ACCESS</div>
            <div style={{ fontSize: '1rem', fontWeight: 600 }}>HQ-CONTROL-01</div>
          </div>
        </header>

        <div className="v10-main-grid">
          {/* FORM AREA */}
          <div className="v10-card">
            <div className="v10-section-heading">01 / Foundation</div>

            <div className="v10-row">
              <div className="v10-input-group">
                <label className="v10-label">Primary Category</label>
                <select
                  className="v10-input"
                  value={product}
                  onChange={(e) => {
                    setProduct(e.target.value);
                    setSubType("");
                    setVariety("");
                    setColor("");
                    setCurrentSize("");
                    setSizeList([]);
                  }}
                >
                  <option value="">-- Select Category --</option>
                  {Object.keys(productOptions).map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              {product && (
                <div className="v10-input-group">
                  <label className="v10-label">Collection Line</label>
                  <select
                    className="v10-input"
                    value={subType}
                    onChange={(e) => setSubType(e.target.value)}
                  >
                    <option value="">-- Select Line --</option>
                    {productOptions[product].map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {subType === "New" && (
              <div className="v10-input-group">
                <label className="v10-label">Define New Registry Entry</label>
                <div style={{ display: 'flex', gap: '20px' }}>
                  <input
                    className="v10-input"
                    value={newType}
                    onChange={(e) => setNewType(e.target.value)}
                    placeholder="e.g. Heritage Slim"
                  />
                  <button className="btn-add" style={{ margin: 0, padding: '0 30px' }} onClick={handleAddNewType}>Add</button>
                </div>
              </div>
            )}

            <div className="v10-section-heading">02 / Specifications</div>

            <div className="v10-row">
              {(product === "Shirt" || product === "TShirt") && subType !== "New" && subType && (
                <div className="v10-input-group">
                  <label className="v10-label">Sleeve Archetype</label>
                  <select
                    className="v10-input"
                    value={variety}
                    onChange={(e) => setVariety(e.target.value)}
                  >
                    <option value="">-- Choose Type --</option>
                    {varietyOptions.map((v) => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                </div>
              )}

              {product && subType && (
                <div className="v10-input-group">
                  <label className="v10-label">Color Identity</label>
                  <select
                    className="v10-input"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                  >
                    <option value="">-- Select Color --</option>
                    {colorOptions.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {color === "New" && (
              <div className="v10-input-group">
                <label className="v10-label">Register Custom Color</label>
                <div style={{ display: 'flex', gap: '20px' }}>
                  <input
                    className="v10-input"
                    value={newColor}
                    onChange={(e) => setNewColor(e.target.value)}
                    placeholder="e.g. Oxford Blue"
                  />
                  <button className="btn-add" style={{ margin: 0, padding: '0 30px' }} onClick={handleAddNewColor}>Add</button>
                </div>
              </div>
            )}

            <div className="v10-section-heading">03 / Size, Valuation & Inventory (Multiple Variants)</div>
            {product && subType && (
              <div style={{ background: '#1e293b', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
                <div className="v10-row" style={{ alignItems: 'flex-end', marginBottom: '15px' }}>
                  <div className="v10-input-group" style={{ marginBottom: 0 }}>
                    <label className="v10-label">Size Metric</label>
                    <select
                      className="v10-input"
                      value={currentSize}
                      onChange={(e) => setCurrentSize(e.target.value)}
                    >
                      <option value="">-- Choose Metric --</option>
                      {sizeOptions.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div className="v10-input-group" style={{ marginBottom: 0 }}>
                    <label className="v10-label">Market Valuation (₹)</label>
                    <input
                      className="v10-input"
                      type="number"
                      value={currentPrize}
                      onChange={(e) => setCurrentPrize(e.target.value)}
                      placeholder="0.00"
                    />
                  </div>

                  <div className="v10-input-group" style={{ marginBottom: 0 }}>
                    <label className="v10-label">Inventory Volume</label>
                    <input
                      className="v10-input"
                      type="number"
                      value={currentQuantity}
                      onChange={(e) => setCurrentQuantity(e.target.value)}
                      placeholder="Count Units"
                    />
                  </div>

                  <button className="btn-add" style={{ margin: 0, padding: '0 20px', height: '48px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }} onClick={handleAddSizeVariant}>Add Size</button>
                </div>

                {currentSize === "New" && (
                  <div className="v10-input-group" style={{ marginTop: '15px' }}>
                    <label className="v10-label">Custom Sizing Protocol</label>
                    <div style={{ display: 'flex', gap: '20px' }}>
                      <input
                        className="v10-input"
                        value={newSize}
                        onChange={(e) => setNewSize(e.target.value)}
                        placeholder="e.g. Tailored Fit"
                      />
                      <button className="btn-add" style={{ margin: 0, padding: '0 30px' }} onClick={handleAddNewSizeOption}>Add Opt</button>
                    </div>
                  </div>
                )}

                {sizeList.length > 0 && (
                  <div style={{ marginTop: '20px' }}>
                    <label className="v10-label">Added Size Variants</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                      {sizeList.map((item, index) => (
                        <div key={index} style={{ background: '#334155', padding: '10px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '15px', color: '#fff' }}>
                          <span style={{ fontWeight: 'bold' }}>{item.size}</span>
                          <span>₹{item.prize}</span>
                          <span>Qty: {item.quantity}</span>
                          <button onClick={() => handleRemoveSizeVariant(index)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '1.2rem', fontWeight: 'bold', lineHeight: 1 }}>×</button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="v10-section-heading">04 / Narrative</div>

            <div className="v10-input-group">
              <label className="v10-label">Product Narrative</label>
              <textarea
                className="v10-input"
                style={{ minHeight: '120px', resize: 'none' }}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Compose the professional biography of this asset..."
              />
            </div>

            <div className="v10-section-heading">04 / Visual Asset</div>
            <div className="v10-upload-zone" onClick={() => document.getElementById('v10-file').click()}>
              <input
                id="v10-file"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
              {imagePreview ? (
                <img src={imagePreview} alt="Asset" style={{ width: '100%', maxHeight: '400px', objectFit: 'contain' }} />
              ) : (
                <div style={{ color: '#64748b' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '10px' }}>⊕</div>
                  <div>Upload High-Resolution Product Visual</div>
                </div>
              )}
            </div>
          </div>

          {/* PREVIEW AREA */}
          <aside>
            <div className="v10-preview-card">
              <div className="v10-section-heading" style={{ color: '#94a3b8', marginBottom: '20px' }}>Ledger Preview</div>

              <div className="v10-preview-img-container">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="v10-preview-img" />
                ) : (
                  <span style={{ color: '#475569', fontSize: '0.9rem' }}>IMAGE REQUIRED</span>
                )}
              </div>

              <div className="v10-preview-title">{subType && subType !== "New" ? subType : (newType || "Untitled Selection")}</div>

              <div className="v10-preview-meta">
                <span>{product || 'General'}</span>
                <span>•</span>
                <span>{color || 'Natural'}</span>
                <span>•</span>
                <span>{sizeList.length > 0 ? `${sizeList.length} Sizes Added` : 'No Sizes'}</span>
              </div>

              <div style={{ opacity: 0.7, fontSize: '0.85rem', marginBottom: '30px', fontFamily: 'Inter, sans-serif', lineHeight: '1.6' }}>
                {bio || "The product narrative will be rendered here for final validation before publishing."}
              </div>

              <div style={{ borderTop: '1px solid #334155', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>VALUATION</div>
                  <div className="v10-preview-price">
                    ₹{sizeList.length > 0 ? Math.min(...sizeList.map(s => Number(s.prize))) + (sizeList.length > 1 ? ` - ₹${Math.max(...sizeList.map(s => Number(s.prize)))}` : '') : '0'}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>TOTAL ON HAND</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>
                    {sizeList.reduce((acc, curr) => acc + parseInt(curr.quantity || 0), 0)}
                  </div>
                </div>
              </div>

              <button
                className="v10-btn-submit"
                onClick={() => {
                  if (!product) return alert("Select product category.");
                  if (!subType) return alert("Select style line.");
                  handleSubmit();
                }}
              >
                Register Asset
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default Uploadstock;

