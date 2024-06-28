import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  saveShippingAddress,
  savePaymentMethod,
} from "../../redux/features/cart/cartSlice.js";
import {} from "../../redux/api/orderApiSlice.js";
import { Link } from "react-router-dom";

const Shipping = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [paypalMethods, setPaypaMethods] = useState("payPal");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="ml-[10rem] flex justify-center h-screen items-center flex-1 ">
      <div className="block mr-10 text-2xl ">
        this PAge pending because of paypal account
      </div>
      <br />
      <Link
        to="https://youtu.be/cbLD1GTXzto?si=0c046fNvSxsoVOof"
        className="block px-8 py-4 rounded-full visited:bg-gradient-to-l from-pink-500 via-indigo-500 to-purple -500 hover:scale-110 hover:-translate-x-2 bg-gradient-to-r"
      >
        {" "}
        GO To Video...
      </Link>
    </div>
  );
};

export default Shipping;
