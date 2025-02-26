import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets, Product } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

enum SortType {
  RELEVANT = "relevant",
  PRICE_LOW_TO_HIGH = "low-high",
  PRICE_HIGH_TO_LOW = "high-low",
}

const Collection: React.FC = () => {
  const { products, search, showSearch } = useContext(ShopContext) as {
    products: Product[];
    search: string;
    showSearch: boolean;
  };
  const [showFilter, setShowFilter] = useState<boolean>(true);
  const [filterProducts, setFilterProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<string[]>([]);
  const [subCategory, setSubCategory] = useState<string[]>([]);
  const [sortType, setSortType] = useState<SortType>(SortType.RELEVANT);

  const toggleCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (category.includes(e.target.value)) {
      setCategory(category.filter((item) => item !== e.target.value));
    } else {
      setCategory([...category, e.target.value]);
    }
  };

  const toggleSubCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(subCategory.filter((item) => item !== e.target.value));
    } else {
      setSubCategory([...subCategory, e.target.value]);
    }
  };

  const applyFilter = React.useCallback(() => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }
    setFilterProducts(productsCopy);
  }, [products, showSearch, search, category, subCategory]);

  const sortProducts = React.useCallback(() => {
    const filterProductsCopy = filterProducts.slice();
    switch (sortType) {
      case SortType.PRICE_LOW_TO_HIGH:
        setFilterProducts(filterProductsCopy.sort((a, b) => a.price - b.price));
        break;
      case SortType.PRICE_HIGH_TO_LOW:
        setFilterProducts(filterProductsCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        break;
    }
  }, [sortType, filterProducts, applyFilter]);

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products, applyFilter]);

  useEffect(() => {
    sortProducts();
  }, [sortType, sortProducts]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter options */}
      <div className="min-w-60">
        <p
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
          onClick={() => setShowFilter(!showFilter)}
        >
          FILTERS
          <img
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>

        {/* Category filter */}
        {["CATEGORIES", "TYPE"].map((filterType, index) => (
          <div
            key={index}
            className={`border border-gray-300 pl-5 py-3 mt-6 ${
              showFilter ? "" : "hidden"
            } sm:block`}
          >
            <p className="mb-3 text-sm font-medium">{filterType}</p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
              {filterType === "CATEGORIES" ? (
                <>
                  <p className="flex gap-2">
                    <input
                      type="checkbox"
                      className="w-3"
                      value={"Men"}
                      onChange={toggleCategory}
                    />{" "}
                    Men
                  </p>
                  <p className="flex gap-2">
                    <input
                      type="checkbox"
                      className="w-3"
                      value={"Women"}
                      onChange={toggleCategory}
                    />{" "}
                    Women
                  </p>
                  <p className="flex gap-2">
                    <input
                      type="checkbox"
                      className="w-3"
                      value={"Kids"}
                      onChange={toggleCategory}
                    />{" "}
                    Kids
                  </p>
                </>
              ) : (
                <>
                  <p className="flex gap-2">
                    <input
                      type="checkbox"
                      className="w-3"
                      value={"Topwear"}
                      onChange={toggleSubCategory}
                    />{" "}
                    Topwear
                  </p>
                  <p className="flex gap-2">
                    <input
                      type="checkbox"
                      className="w-3"
                      value={"Bottomwear"}
                      onChange={toggleSubCategory}
                    />{" "}
                    Bottomwear
                  </p>
                  <p className="flex gap-2">
                    <input
                      type="checkbox"
                      className="w-3"
                      value={"Winterwear"}
                      onChange={toggleSubCategory}
                    />{" "}
                    Winterwear
                  </p>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Right Side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1="ALL" text2="COLLECTIONS" />
          {/* Product Sort */}
          <select
            className="border border-gray-300 text-sm px-2"
            onChange={(e) => setSortType(e.target.value as SortType)}
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>
        {/* Map Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item, index) => (
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
    </div>
  );
};

export default Collection;
