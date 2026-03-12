import { createContext, useContext, useState } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);


  const removeFromWishlist = (image) => {
  setWishlist((prev) =>
    prev.filter((item) => item.image !== image)
  );
};


  const toggleLike = (product) => {
    setWishlist((prev) => {
      const exists = prev.some(
        (item) => item.image === product.image
      );

      if (exists) {
        return prev.filter(
          (item) => item.image !== product.image
        );
      } else {
        return [...prev, product];
      }
    });
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleLike, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
