import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

interface ProductsProps {
  id: string;
  image: string[];
  name: string;
  price: number;
}

const ProductItem: React.FC<ProductsProps> = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext) as { currency: string };

  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <Link
      to={`/product/${id}`}
      className="text-gray-700 cursor-pointer"
      onClick={handleClick}>
      <div className="overflow-hidden">
        <div>
          <img
            src={image[0]}
            alt={name}
            className="hover:scale-110 transition ease-in-out"
          />
        </div>
        <div>
          <p className="pt-3 pb-1 text-sm">{name}</p>
          <p className="font-medium text-sm">
            {currency}
            {price}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
