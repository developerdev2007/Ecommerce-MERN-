import React from "react";
import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  return (
    <div className="ml-[2rem] p-3 relative w-[30rem]">
      <div className="relative">
        <img src={product.image} alt={product.name} />
        <HeartIcon product={product} />
      </div>
      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h2 className="flex items-center justify-between">
            <div className="text-lg">{product.name}</div>
            <span className="text-sm text-pink-800 bg-pink-300 font-medium mr-2 py-0.5 px-2.5 rounded-full dark:bg-pink-800 dark:text-pink-300">
              ${product.price}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default Product;
