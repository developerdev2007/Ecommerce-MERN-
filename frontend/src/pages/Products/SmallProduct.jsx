import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const SmallProduct = ({ product }) => {
  return (
    <>
      <div className="w-[20rem] ml-[2rem] p-3">
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.name}
            className="h-auto rounded-lg"
          />
          <HeartIcon product={product} />
          <div className="p-54">
            <Link to={`/product/${product?._id}`}>
              <h2 className="flex items-center justify-between">
                <div>{product?.name}</div>
                <span className="px-2.5 py-0.5 my-2 text-sm font-medium text-pink-800 bg-pink-100 rounded-full dark:bg-pink-900 dark:text-pink-300">
                  ${product?.price}
                </span>
              </h2>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SmallProduct;
