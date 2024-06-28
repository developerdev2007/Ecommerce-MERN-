import { useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { useAllProductsQuery } from "../../redux/api/productApiSlice.js";
import AdminMenu from "../Admin/AdminMenu.jsx";
const AllProducts = () => {
  const { data: products, isLoading, isError } = useAllProductsQuery();
  console.log(products);
  if (isLoading) {
    <>Error in Loading Products</>;
  }
  if (isError) {
    <>
      <Loader />
    </>;
  }
  return (
    <div className="container mx-[9rem]">
      <div className="flex flex-col md:flex-row">
        <div className="p-3">
          <div className="h-12 ml-3 text-xl font-bold">
            AllProducts {products?.length}
          </div>
          <AdminMenu />
          <div className="flex flex-wrap items-center justify-around">
            {products?.map((product) => (
              <Link
                key={product._id}
                to={`/admin/product/update/${product._id}`}
                className="block mb-4 overflow-hidden"
              >
                <div className="flex">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-[10rem] object-cover"
                  />
                </div>
                <div className="flex flex-col justify-around p-4 ">
                  <div className="flex-justify-between">
                    <h5 className="mb-2 font-semibold text-xl-text-white">
                      {product?.name}
                    </h5>
                    <p className="text-sm text-gray-400">
                      {moment(product?.createdAt).format("MMMM DDs YYYY")}
                    </p>
                  </div>
                  <p className="text-sm text-gray-400 lg:w-[30rem] md:w-[20rem] sm:w-[10rem]">
                    {product?.description?.substring(0, 160)}...
                  </p>
                  <div className="flex justify-between">
                    <Link
                      to={`/admin/product/update/${product._id}`}
                      className="inline-flex items-center p-3 py-2 text-sm font-medium text-center text-white bg-pink-700 rounded-full hover:bg-pink-800 focus:outline-none focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
                    >
                      Update Product
                    </Link>
                    <p>${product?.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="p-3 mt-2 md:w-1/4">
          <AdminMenu />
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
