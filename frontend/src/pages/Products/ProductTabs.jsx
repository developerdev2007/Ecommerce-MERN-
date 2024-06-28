import { useState } from "react";
import { Link } from "react-router-dom";
import Ratings from "./Ratings";
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice.js";
import Loader from "../../components/Loader";
import SmallProduct from "./SmallProduct.jsx";

const ProductTabs = ({
  loadingProductReview,
  userInfo,
  submitHandler,
  rating,
  setRating,
  comment,
  setComment,
  product,
}) => {
  const { data, isLoading } = useGetTopProductsQuery();
  const [activeTab, setActiveTab] = useState(1);

  if (isLoading) {
    return <Loader />;
  }

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };
  return (
    <div className="flex flex-cols md:flex-row">
      {/* First Part  */}
      <section className="mr-[5rem]">
        <div
          className={`flex-1 text-lg p-4 cursor-pointer ${
            activeTab === 1 ? "font-bold" : ""
          }`}
          onClick={() => handleTabClick(1)}
        >
          write Your Reviews
        </div>
        <div
          className={`flex-1 text-lg p-4 cursor-pointer ${
            activeTab === 2 ? "font-bold" : ""
          }`}
          onClick={() => handleTabClick(2)}
        >
          All Reviews
        </div>
        <div
          className={`flex-1 text-lg p-4 cursor-pointer ${
            activeTab === 3 ? "font-bold" : ""
          }`}
          onClick={() => handleTabClick(3)}
        >
          Related Products
        </div>
      </section>

      {/* Second Part  */}
      <section>
        {activeTab === 1 && (
          <div className="mt-4">
            {userInfo ? (
              <>
                <form onSubmit={submitHandler}>
                  <div className="my-2">
                    <label className="block mb-2 text-bold">Ratings</label>
                    <select
                      id="rating"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                      className="m-2 border rounded-lg xl:w-[40rem] text-black"
                    >
                      <option value="">select</option>
                      <option value="1">Inferior</option>
                      <option value="2">Decent</option>
                      <option value="3">GReat</option>
                      <option value="4">Excellent</option>
                      <option value="5">Superb </option>
                    </select>
                  </div>
                  <div className="my-4">
                    <label htmlFor="comment" className="block mb-2 text-xl">
                      Comment
                    </label>
                    <textarea
                      rows="3"
                      required
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="p-2 border rounded-lg xl:w-[40rem] text-white"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={loadingProductReview}
                    className="px-4 py-2 text-white bg-pink-600 border rounded-lg hover:bg-pink-700"
                  >
                    Submit
                  </button>
                </form>
              </>
            ) : (
              <p>
                Please <Link to="/login">Sign In/Login</Link> To write a review
              </p>
            )}
          </div>
        )}
        {activeTab === 2 && (
          <>
            <div>
              {product.reviews.length === 0 && <p>NO REVIEWS AVAILABLE</p>}
            </div>
            <div>
              {product.reviews.map((review) => (
                <div
                  key={review._id}
                  className="p-4 rounded-lg xl:w-[50rem] mb-5 sm:w-[24rem] xl:ml-[2rem]   bg-[#1A1A1A]"
                >
                  <div className="flex justify-between">
                    {" "}
                    <strong className="text-[#B0B0B0]">{review.name} </strong>
                    <p className="text-[#B0B0B0]">
                      {" "}
                      {review.createdAt.substring(0, 10)}
                    </p>
                  </div>
                  <p className="text-[#B0B0B0] my-4 ">{review.comment}</p>
                  <Ratings value={review.rating} />
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 3 && (
          <section className="flex flex-wrap ml-4">
            {!data ? (
              <Loader />
            ) : (
              data.map((product) => (
                <div key={product._id}>
                  <SmallProduct product={product} />
                </div>
              ))
            )}
          </section>
        )}
      </section>
    </div>
  );
};

export default ProductTabs;
