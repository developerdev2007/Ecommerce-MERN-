import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { setCredientials } from "../../redux/features/auth/authSlice";
import { Link, Navigate } from "react-router-dom";
import { useProfileMutation } from "../../redux/api/userApiSlice";
const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    setUsername(userInfo.username);
    setEmail(userInfo.email);
  }, []);

  const dispatch = useDispatch();

  const SubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        toast.error("Password and Confirm Password do not match");
      } else {
        const res = await updateProfile({ username, email, password }).unwrap();
        dispatch(setCredientials({ ...res }));
        toast.success("Profile has been Successfully Updated");
      }
    } catch (error) {
      toast.error(error?.body?.message || error.message);
    }
  };

  return (
    <div className="container mx-auto p-4    ">
      <div className="flex md:flex md:space-y-4 align-center justify-center">
        <div className="md:w-1/3">
          <h1 className="text-2xl font-semibold mb-4">Update Profile</h1>
          <form onSubmit={SubmitHandler}>
            <div className="mb-4">
              <label
                htmlFor="Username"
                className="block text-white font-medium mb-2"
              >
                Username
              </label>
              <input
                type="text "
                placeholder="Username"
                className="form-input text-black p-4 border-none rounded-lg w-full "
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="Email"
                className="block text-white font-medium mb-2"
              >
                Email
              </label>
              <input
                type="text "
                placeholder="Email"
                className="form-input text-black  p-4 border-none rounded-lg w-full "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="Password"
                className="block text-white font-medium mb-2"
              >
                Password
              </label>
              <input
                type="text "
                placeholder="Password"
                className="form-input text-black  p-4 border-none rounded-lg w-full "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="Confirm Password"
                className="block text-white font-medium mb-2"
              >
                Confirm Password
              </label>
              <input
                type="text "
                placeholder="Confirm Password"
                className="form-input p-4  text-black border-none rounded-lg w-full "
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-between">
              <button className="bg-pink-500 rounded-lg  hover:bg-pink-600 text-white mt-2 py-2 px-4">
                Update Profile
              </button>
              <Link
                to={"/user-orders"}
                className="bg-pink-500  rounded-lg hover:bg-pink-600 text-white mt-2 py-2 px-4"
              >
                User Orders
              </Link>
            </div>
          </form>
        </div>
        {loadingUpdateProfile && <Loader />}
      </div>
    </div>
  );
};

export default Profile;
