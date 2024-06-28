import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../components/Loader";
import { setCredientials } from "../../redux/features/auth/authSlice.js";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../../redux/api/userApiSlice.js";
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [redirect, navigate, userInfo]);

  const SubmitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("password Does not match ");
    } else {
      try {
        const res = await register({ username, email, password }).unwrap();
        dispatch(setCredientials({ ...res }));
        navigate(redirect);
        toast.success("User has been Successfully Registered");
      } catch (error) {
        toast.error(error?.data?.message);
      }
    }
  };
  return (
    <section className="pl-[10rem] flex flex-wrap">
      <div className="mr-[4rem] mt-[5rem] ">
        <h1 className="text-white font-semibold text-2xl mb-4">REGISTER</h1>
        <form className="container w-[20rem]" onSubmit={SubmitHandler}>
          <div className="my-[2rem]">
            <label
              htmlFor="username"
              className="text-white block font-medium text-sm"
            >
              Username
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 p-2 border rounded outline-none w-full"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="my-[2rem]">
            <label
              htmlFor="email"
              className="text-white block font-medium text-sm"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 p-2 border rounded outline-none w-full"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="my-[2rem]">
            <label
              htmlFor="password"
              className="text-white block font-medium text-sm"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 border rounded outline-none w-full"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="my-[2rem]">
            <label
              htmlFor="confirmPassword"
              className="text-white block font-medium text-sm"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm password"
              className="mt-1 p-2 border rounded outline-none w-full"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            disabled={isLoading}
            className=" hover:bg-pink-500 bg-pink-500 rounded-lg text-white font-medium text-xl px-4 my-[1rem] py-2"
            type="submit"
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
          {isLoading && <Loader />}
        </form>
        <div className="mt-4">
          <p className="text-white">
            Already Have an Account{" "}
            <Link
              to={redirect ? `/login?redirect=${redirect}` : "/login"}
              className="text-pink-500 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
      <img
        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80"
        alt=""
        className="h-[40rem] w-[65%] xl:block md:hidden sm:hidden rounded-lg"
      />
    </section>
  );
};

export default Register;
