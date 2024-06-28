import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice.js";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  const checkOutHandler = () => {
    navigate(`/shipping`);
  };

  console.log(cart);
  console.log(cartItems);
  return (
    <>
      <div className="container flex flex-wrap items-start justify-around mx-auto mt-8">
        {cartItems.length === 0 ? (
          <>
            Your cart is Empty <Link to={"/shop"}>Go to Home</Link>
          </>
        ) : (
          <>
            <div className="flex flex-col w-[80%]">
              <h1 className="mb-4 text-2xl font-semibold">Shopping Cart</h1>
              {cartItems.map((item) => (
                <>
                  <div key={item._id}>
                    <div className="flex items-center mb-[1rem] pb-2">
                      <div className="w-[5rem] h-[5rem]">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="object-cover w-full h-full rounded"
                        />
                      </div>
                      <div className="flex-1 ml-4">
                        <Link
                          to={`/product/${item._id}`}
                          className="text-pink-500"
                        >
                          {item.name}
                        </Link>
                        <div className="mt-2 text-white">{item.brand}</div>
                        <div className="mt-2 font-bold text-white">
                          ${item.price}
                        </div>
                      </div>
                      <div className="w-24">
                        <select
                          value={item.qty}
                          className="w-full p-1 text-black border rounded"
                          onChange={(e) =>
                            addToCartHandler(item, Number(e.target.value))
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <button
                          onClick={() => removeFromCartHandler(item._id)}
                          className="box-border p-5 ml-4 text-2xl text-red-500 hover:scale-[1.25] hover:text-red-600 "
                        >
                          {" "}
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ))}

              <div className="mt-8 w-[40rem]">
                <div className="p-4 rounded-lg ">
                  <h2 className="mb-2 text-xl font-semibold ">
                    Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)}{" "}
                    items)
                  </h2>
                  <div className="text-2xl font-bold">
                    ${" "}
                    {cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}
                  </div>
                  <button
                    disabled={cartItems.length === 0}
                    onClick={checkOutHandler}
                    className="w-full px-4 py-2 mt-4 text-lg bg-pink-500 rounded-full hover:bg-pink-600"
                  >
                    Proceed to CheckOut{" "}
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
