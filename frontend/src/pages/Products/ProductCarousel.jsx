import { useGetTopProductsQuery } from "../../redux/api/productApiSlice.js";
import Messages from "../../components/Messages";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoPlaySpeed: 3000,
  };
  return (
    <div className="mb-4 lg:block md:block xl:block">
      {isLoading ? null : error ? (
        <Messages variant="danger">
          {error?.data?.message || error?.message}
        </Messages>
      ) : (
        <Slider
          {...settings}
          className="xl:w-[50rem] lg:w-[50rem] md:w-[56rem] sm:w-[40rem] sm:block"
        >
          {products.map(
            ({
              image,
              _id,
              name,
              description,
              brand,
              price,
              createdAt,
              numReviews,
              rating,
              quantity,
              countInStock,
            }) => (
              <div key={_id}>
                <img
                  src={image}
                  alt={name}
                  className="object-cover w-full h-[30rem] rounded-lg"
                />
                <div className="flex justify-between w-[25rem]">
                  <div className="one">
                    <h2>{name}</h2>
                    <p>${price}</p>
                    <p className="w-[25rem]">
                      {description.substring(0, 80)}...
                    </p>
                  </div>
                  <div className="flex justify-between w-[25rem]">
                    <div className="one">
                      <h1 className="w-[15rem] flex items-center mb-6">
                        <FaStore className="mr-3 text-white" />
                        Brand: {brand}
                      </h1>
                      <h1 className="w-[15rem] flex items-center mb-6">
                        <FaClock className="mr-3 text-white" />
                        Added on : {moment(createdAt).fromNow()}
                      </h1>
                      <h1 className="w-[15rem] flex items-center mb-6">
                        <FaStar className="mr-3 text-white" />
                        Reviews: {numReviews}
                      </h1>
                    </div>
                    <div className="two">
                      <h1 className="w-[15rem] flex items-center mb-6">
                        <FaStar className="mr-3 text-white" />
                        Rating: {Math.round(rating)}
                      </h1>
                      <h1 className="w-[15rem] flex items-center mb-6">
                        <FaShoppingCart className="mr-3 text-white" />
                        quantity,: {quantity}
                      </h1>
                      <h1 className="w-[15rem] flex items-center mb-6">
                        <FaBox className="mr-3 text-white" />
                        countInStock: {countInStock}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </Slider>
      )}
    </div>
  );
};

export default ProductCarousel;
