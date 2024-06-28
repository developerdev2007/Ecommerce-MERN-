import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
//////folders imports
import {
  useFetchCategoriesQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} from "../../redux/api/categoryApiSlice.js";
import CategoryForm from "../../components/CategoryForm.jsx";
import Modal from "../../components/Modal.jsx";
import AdminMenu from "./AdminMenu.jsx";

const CategoryList = () => {
  const { data: categories } = useFetchCategoriesQuery();
  // console.log(categories);
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  ////////////use
  const [createCategory] = useCreateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  /////////create
  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!name) {
      toast.error("category Name is Required!");
      return;
    }
    try {
      const result = await createCategory({ name }).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        setName("");
        toast.success(`${result.name} has been successfully created!!!`);
      }
    } catch (error) {
      console.log(error);
      toast.error("Creating Category Failed!");
    }
  };
  //////update
  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    if (!updatingName) {
      toast.error("Category Name is Required!!!");
      return;
    }
    try {
      const result = await updateCategory({
        categoryId: selectedCategory._id,
        updatedCategory: {
          name: updatingName,
        },
      }).unwrap();
      if (result.error) {
        toast.error(result.error);
        return;
      } else {
        toast.success(`${result.name} is updated`);
        setUpdatingName("");
        setSelectedCategory(null);
        setModalVisible(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Cannot Update Category, Trt again later");
    }
  };

  //////delete
  const handleDeleteCategory = async (e) => {
    e.preventDefault();

    try {
      const result = await deleteCategory(selectedCategory._id).unwrap();
      if (result.error) {
        toast.error(result.error);
        return;
      } else {
        toast.success(`${selectedCategory.name} is deleted`);
        setSelectedCategory(null);
        setModalVisible(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Cannot delete Category, Trt again later");
    }
  };
  return (
    <div className="ml-[2rem] md:ml-[10rem] flex flex-col md:flex-row ">
      <AdminMenu />

      <div className="p-3 md:w-3/4">
        <div className="h-12">Manage Categories</div>
        <CategoryForm
          value={name}
          setValue={setName}
          handleSubmit={handleCreateCategory}
        />
        <br />
        <hr />
        <div className="flex flex-wrap">
          {categories?.map((category) => (
            <div key={category._id}>
              <button
                className="px-4 py-2 m-3 text-pink-600 transition-shadow bg-white border border-pink-500 rounded-lg hover:bg-pink-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                onClick={() => {
                  setModalVisible(true);
                  setSelectedCategory(category);
                  setUpdatingName(category.name);
                }}
              >
                {category.name}
              </button>
            </div>
          ))}
        </div>
        <Modal isOpen={modalVisible} isClose={() => setModalVisible(false)}>
          <CategoryForm
            value={updatingName}
            setValue={(value) => setUpdatingName(value)}
            handleSubmit={handleUpdateCategory}
            buttonText="Update"
            handleDelete={handleDeleteCategory}
          />
        </Modal>
      </div>
    </div>
  );
};

export default CategoryList;
