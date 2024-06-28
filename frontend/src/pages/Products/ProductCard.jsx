import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon";

const ProductCard = ({ p }) => {
  const dispatch = useDispatch();
  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Item  added successfully", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };
  return (
    <div className="relative max-w-sm bg-[#1A1A1A] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <section className="relative">
        <Link to={`/product/${p._id}`}>
          <span className="absolute text-sm font-medium text-pink-800 bg-pink-100 bottom-3 right-3 mr-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
            {p?.brand}
          </span>
          <img
            className="cursor-pointer"
            src={p.image}
            alt={p.name}
            style={{
              height: "170px",
              objectFit: "cover",
            }}
          />
        </Link>
        <HeartIcon product={p} />
      </section>
      <div className="p-5">
        <div className="flex justify-between">
          <h5 className="mb-2 text-xl text-white dark:text-white">{p?.name}</h5>
          <p className="font-semibold text-pink-500 dark:text-black">
            {p?.price?.toLocaleString("en-Us", {
              style: "currency",
              currency: "USD",
            })}
          </p>
        </div>
        <p className="mb-3 font-normal text-[#CFCFCF]">
          {p?.description?.substring(0, 30)}...
        </p>
        <section className="flex items-center justify-between">
          <Link
            to={`/product/${p._id}`}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-pink-700 rounded-lg hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300"
          >
            Read More
          </Link>
          <button
            className="p-2 rounded-full"
            onClick={() => addToCartHandler(p, 1)}
          >
            <AiOutlineShoppingCart size={25} />
          </button>
        </section>
      </div>
    </div>
  );
};

export default ProductCard;
