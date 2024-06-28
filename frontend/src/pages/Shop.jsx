import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice.js";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice.js";

import {
  setCategories,
  setChecked,
  setProducts,
} from "../redux/features/shop/shopSlice.js";
import Loader from "../components/Loader.jsx";
import ProductCard from "./Products/ProductCard.jsx";

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );
  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");
  const filteredProductsQuery = useGetFilteredProductsQuery({
    checked,
    radio,
  });

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, dispatch]);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!filteredProductsQuery.isLoading) {
        ///check Products on both checked categories and   price filter
        const filteredProducts = filteredProductsQuery.data.filter(
          ///check if the entered price includes the entered Price Filter value
          (product) => {
            return (
              product.price.toString().includes(priceFilter) ||
              product.price === parseInt(priceFilter, 10)
            );
          }
        );
        dispatch(setProducts(filteredProducts));
      }
    }
  }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter]);

  const handleBrandClick = (brand) => {
    const productsByBrand = filteredProductsQuery.data?.filter(
      (product) => product.brand === brand
    );
    dispatch(setProducts(productsByBrand));
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  ///All Brands option to Unique Brands
  const uniqueBrands = [
    ...Array.from(
      new Set(
        filteredProductsQuery?.data
          ?.map((product) => product.brand)
          .filter((brand) => brand !== undefined)
      )
    ),
  ];

  const handlePriceChange = (e) => {
    ///  Update the Price filter state when the user types in the input filled
    setPriceFilter(e.target.value);
  };

  return (
    <>
      <div className="container mx-auto">
        <div className="flex md:flex-row">
          <div className="bg-[#151515] p-3 mt-2 mb-2  ">
            <h2 className="py-2 mb-2 text-center bg-black rounded-full h4">
              Filter by Categories
            </h2>
            <div className="p-5 w-[15rem]">
              {categories?.map((c) => (
                <>
                  <div key={c._id} className="mb-2">
                    <div className="flex items-center mr-4">
                      <input
                        type="checkbox"
                        id="red-Checkbox"
                        onChange={(e) => handleCheck(e.target.checked, c._id)}
                        className="w-4 h-4 text-pink-500 bg-gray-100 border-gray-300 rounded focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-700"
                      />
                      <label
                        htmlFor="pink-checkbox"
                        className="ml-2 text-sm font-medium text-white dark:text-gray-300"
                      >
                        {c.name}
                      </label>
                    </div>
                  </div>
                </>
              ))}
            </div>

            <h2 className="py-2 mb-2 text-center bg-black rounded-full h4">
              Filter By brands
            </h2>
            <div className="p-5">
              {uniqueBrands?.map((brand) => (
                <>
                  <div className="flex items-center mb-5 mr-4">
                    <input
                      type="radio"
                      name="brand"
                      onChange={(e) => handleBrandClick(brand)}
                      className="w-4 h-4 text-pink-500 bg-gray-100 border-gray-300 rounded focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-700"
                    />
                    <label
                      htmlFor="pink-radio"
                      className="ml-2 text-sm font-medium text-white dark:text-gray-300"
                    >
                      {brand}
                    </label>
                  </div>
                </>
              ))}
            </div>
            <h2 className="py-2 mb-2 text-center bg-black rounded-full h4">
              Filter By Price
            </h2>
            <div className="p-5 w-[15rem]">
              <input
                type="number"
                name="Price"
                id="price"
                className="text-gray-100 bg-gray-800 border-gray-300 rounded focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-700"
                value={priceFilter}
                onChange={handlePriceChange}
              />
            </div>

            <div className="p-5 pt-0">
              <button
                className="w-full text-gray-100 bg-gray-800 border-gray-300 rounded focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-700"
                onClick={() => window.location.reload()}
              >
                Reset
              </button>
            </div>
          </div>
          <div className="p-4">
            <h2 className="py-2 mb-2 text-center h4">
              {products?.length} Products
            </h2>
            <div className="flex flex-wrap">
              {products.length === 0 ? (
                <Loader />
              ) : (
                products?.map((p) => (
                  <div className="p-3" key={p._id}>
                    <ProductCard p={p} />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
