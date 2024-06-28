import React from "react";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Header from "../components/Header";
import Loader from "../components/Loader";
import Messages from "../components/Messages";
import Product from "./Products/Product";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });
  return (
    <>
      {!keyword ? <Header /> : null}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Messages variant="danger">
          {isError?.data?.message || isError.error}
        </Messages>
      ) : (
        <>
          <div className="flex justify-around item-center">
            <h1 className="text-6xl font-bold ml-[20rem] mt-[10rem] ">
              Special Products
            </h1>
            <Link
              to="/shop"
              className="px-10 flex items-center py-1 font-bold bg-pink-500 rounded-lg mr-[18rem] mt-[10rem]"
            >
              Shop
            </Link>
          </div>
          <div>
            <div className="flex justify-center flex-wrap mt-[2rem]">
              {data.products.map((product) => (
                <div key={product._id}>
                  <Product product={product} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
