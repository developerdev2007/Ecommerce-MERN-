import { useState, useEffect } from "react";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from "../../redux/api/userApiSlice.js";
import Messages from "../../components/Messages.jsx";
import AdminMenu from "./AdminMenu.jsx";
const UserList = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();
  ////states
  const [editableUserId, setEditableUserId] = useState(null);
  const [editableUserName, setEditableUserName] = useState("");
  const [editableUserEmail, setEditableUserEmail] = useState("");
  useEffect(() => {
    refetch();
  }, [refetch]);

  const deleteHandler = async (id) => {
    if (window.confirm("are you really wanted to delete ")) {
      try {
        await deleteUser(id);
        toast.success("User deleted successfully");
        refetch();
      } catch (error) {
        toast.error(error.data.message || error.error);
      }
    }
  };
  const toggleEdit = (id, username, email) => {
    setEditableUserId(id);
    setEditableUserName(username);
    setEditableUserEmail(email);
  };
  const updateHandler = async (id) => {
    try {
      await updateUser({
        userId: id,
        username: editableUserName,
        email: editableUserEmail,
      });
      setEditableUserId(null);
      refetch();
    } catch (error) {
      toast.error(error.data.message || error.error);
    }
  };
  return (
    <div className="p-4">
      {" "}
      <h1 className="mb-4 text-2xl font-semibold text-white">Users</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Messages variant="error">
          {error?.data.message || error.message}
        </Messages>
      ) : (
        <div className="flex flex-col md:flex-row">
          <AdminMenu />

          <table className="w-full mx-auto text-white md:w-4/5">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Id</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Admin</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="px-4 py-2 ">{user._id}</td>

                  <td className="px-4 py-2 ">
                    {editableUserId === user._id ? (
                      <div className="flex items-center">
                        <input
                          type="text"
                          value={editableUserName}
                          onChange={(e) => setEditableUserName(e.target.value)}
                          className="w-full px-4 py-2 bg-black border rounded-lg"
                        />
                        <button
                          onClick={() => updateHandler(user._id)}
                          className="px-2 py-2 ml-2 text-white bg-blue-500 rounded-lg hover:bg-blue-700"
                        >
                          <FaCheck className="ml-[1rem] text-white" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        {user.username}{" "}
                        <button
                          onClick={() =>
                            toggleEdit(user._id, user.username, user.email)
                          }
                        >
                          <FaEdit className="ml-[1rem] text-white" />
                        </button>
                      </div>
                    )}
                  </td>

                  <td className="px-4 py-2">
                    {editableUserId === user._id ? (
                      <div className="flex items-center">
                        <input
                          type="text"
                          value={editableUserEmail}
                          onChange={(e) => setEditableUserEmail(e.target.value)}
                          className="w-full px-4 py-2 bg-black border rounded-lg"
                        />
                        <button
                          onClick={() => updateHandler(user._id)}
                          className="px-4 py-2 ml-2 text-white bg-blue-500 rounded-lg"
                        >
                          <FaCheck />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <p className="text-white">{user.email}</p>
                        <button
                          onClick={() =>
                            toggleEdit(user._id, user._username, user._email)
                          }
                        >
                          <FaEdit className="ml-[1rem]" />
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {user.isAdmin ? (
                      <FaCheck style={{ color: "green" }} />
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {!user.isAdmin && (
                      <div className="flex">
                        <button
                          onClick={() => deleteHandler(user._id)}
                          className="px-4 py-2 font-bold text-white bg-red-600 rounded-lg hover:bg-red-800"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserList;
