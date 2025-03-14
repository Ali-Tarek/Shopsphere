import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { type Product } from "../assets/assets";
import Title from "./Title";
import ProductItem from "./ProductItem";

interface RelatedProductsProps {
  category: string;
  subCategory: string;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({
  category,
  subCategory,
}) => {
  const { products } = useContext(ShopContext) as {
    products: Product[];
  };
  const [related, setRelated] = useState<Product[]>([]);

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice();
      productsCopy = productsCopy.filter((item) => {
        return item.category === category && item.subCategory === subCategory;
      });
      setRelated(productsCopy.slice(0, 5));
    }
  }, [category, products, subCategory]);

  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <Title text1="RELATED" text2="PRODUCTS" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 mg:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {related.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
