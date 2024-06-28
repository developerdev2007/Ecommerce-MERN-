import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetProductsDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice.js";
import Loader from "../../components/Loader.jsx";
import Messages from "../../components/Messages.jsx";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import moment from "moment";
import HeartIcon from "./HeartIcon";
import Ratings from "./Ratings.jsx";
import ProductTabs from "./ProductTabs.jsx";
import { addToCart } from "../../redux/features/cart/cartSlice.js";

const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductsDetailsQuery(productId);
  const { userInfo } = useSelector((state) => state.auth);
  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({ productId, rating, comment }).unwrap();
      refetch();
      toast.success(`Review Created Successfully`);
    } catch (error) {
      console.log(error);
      toast.error(error?.data || error.message);
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
  };
  return (
    <>
      <div>
        <Link
          to={"/"}
          className="text-white ml-[10rem] hover:underline font-semibold "
        >
          Go Back
        </Link>
      </div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Messages variant="danger">
          {error?.data?.message || error?.message}
        </Messages>
      ) : (
        <>
          <div className="flex flex-wrap relative items-between ml-[10rem] mt-[2rem]">
            <div>
              <img
                src={product.image}
                alt={product.name}
                className="w-full xl:w-[50rem] lg:w-[40rem]  sm:w-[20rem] md:w-[30rem]  "
              />
              <HeartIcon product={product} />
            </div>
            <div className="flex flex-col justify-between">
              <h2 className="text-2xl font-semibold">{product.name}</h2>
              <p className="my-4 xl:w-[35rem] lg:w-[35rem] md:w-[30rem] text-[#B0B0B0] ">
                {product.description}
              </p>
              <p className="my-4 text-5xl font-extrabold">$ {product.price}</p>
              <div className="flex items-center justify-between w-[30rem]">
                <div className="one">
                  <h1 className="flex items-center mb-4">
                    <FaStore className="mr-2 text-white" /> Brand:{" "}
                    {product.brand}
                  </h1>
                  <h1 className="flex items-center mb-4 w-[20rem]">
                    <FaClock className="mr-2 text-white" /> CReated At:{" "}
                    {moment(product.createdAt).fromNow()}
                  </h1>
                  <h1 className="flex items-center mb-4">
                    <FaStar className="mr-2 text-white" /> No. of Reviews:{" "}
                    {product.numReviews}
                  </h1>
                </div>
                <div className="two">
                  <h1 className="flex items-center mb-4">
                    <FaStar className="mr-2 text-white" /> Ratings:{" "}
                    {product.ratings}
                  </h1>
                  <h1 className="flex items-center mb-4">
                    <FaShoppingCart className="mr-2 text-white" /> Quantity:{" "}
                    {product.quantity}
                  </h1>
                  <h1 className="flex items-center mb-4">
                    <FaBox className="mr-2 text-white" />
                    In Stock : {product.countInStock}
                  </h1>
                </div>
              </div>{" "}
              <div className="flex flex-wrap justify-between">
                <Ratings
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
                {product.countInStock > 0 && (
                  <>
                    <div>
                      {" "}
                      <select
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                        className="p-2 rounded-lg w-[6rem]  text-black"
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option value={x + 1} key={x}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                )}
              </div>
              <div className="btn-container">
                <button
                  className="p-2 px-4 mt-4 text-white bg-pink-500 rounded-full md:mt-0 hover:bg-pink-600"
                  onClick={addToCartHandler}
                  disable={product.countInStock === 0}
                >
                  Add To Cart
                </button>
              </div>
            </div>
            <div className="flex container flex-wrap mt-[5rem] items-start justify-between ml-[10rem]">
              <ProductTabs
                loadingProductReview={loadingProductReview}
                userInfo={userInfo}
                submitHandler={submitHandler}
                rating={rating}
                setRating={setRating}
                comment={comment}
                setComment={setComment}
                product={product}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;
