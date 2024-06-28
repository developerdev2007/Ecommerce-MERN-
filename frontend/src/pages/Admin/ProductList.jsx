import { useState } from "react";
import { toast } from "react-toastify";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice.js";
import { useNavigate } from "react-router";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice.js";
import AdminMenu from "./AdminMenu.jsx";

const ProductList = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();

  const handleSubmit = async (e) => {
    console.log("click");
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("image", image);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("brand", brand);
      productData.append("countInStock", stock);

      const { data } = await createProduct(productData);
      console.log(data);
      if (data?.error) {
        toast.error("Product create failed. Try Again.");
      } else {
        toast.success(`${data.name} is created`);
        navigate("/");
      }
      console.log(data);
    } catch (error) {
      console.log(error);
      toast.error("Product creation failed!!!");
    }
  };
  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      console.log(res);
      setImage(res.image);
      setImageUrl(res.image);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error.error);
    }
  };
  return (
    <div className="container xl:mx-[9rem] sm:mx-[0]">
      <div className="flex flex-cols md:flex-rows">
        <AdminMenu />
        <div className="p-3 md:w:3/4">
          <div className="h-12">Create Product</div>
          {imageUrl && (
            <div className="text-center">
              <img
                src={imageUrl}
                alt="Product"
                className="block mx-auto max-h-[200px] "
              />
            </div>
          )}
          <div className="md-3">
            <label className="block w-full px-4 text-center text-white rounded-lg cursor-pointer py-11">
              {image ? image.name : "upload Image"}
              <input
                type="file"
                name="image"
                id="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className={!image ? "hidden" : "block"}
              />
            </label>
          </div>

          <div className="p-3">
            <div className="flex flex-wrap">
              <div className="one">
                <label className="block" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="p-4 mb-3 border rounded-lg w-[30rem] bg-[#101011] text-white"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="ml-2 two">
                <label className="block" htmlFor="price">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  className="p-4 mb-3 border rounded-lg w-[30rem] bg-[#101011] text-white"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="one">
                <label className="block" htmlFor="name">
                  Quantity
                </label>
                <input
                  type="number"
                  className="p-4 mb-3 border rounded-lg w-[30rem] bg-[#101011] text-white"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              <div className="ml-2 two">
                <label className="block" htmlFor="price">
                  Brand
                </label>
                <input
                  type="text"
                  className="p-4 mb-3 border rounded-lg w-[30rem] bg-[#101011] text-white"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>
            </div>
            <label className="block ml-4" htmlFor="">
              Description
            </label>
            <textarea
              className="p-2 bg-[#101011] border rounded-lg w-[95%]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <div className="flex justify-between">
              <div>
                <label htmlFor="" className="block name">
                  Count in Stock
                </label>
                <input
                  type="number"
                  className="p-3 mb-3 text-white bg-[#101011] border rounded-lg w-[30rem]"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor=" " className="">
                  Category
                </label>
                <br />
                <select
                  placeholder="Choose Category"
                  className="p-3 mb-3 text-white bg-[#101011] border rounded-lg w-[30rem]"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories?.map((c) => (
                    <option value={c._id} key={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <button
                onClick={handleSubmit}
                className="px-10 py-4 mt-5 text-lg font-bold text-white bg-pink-500 border rounded-lg hover:bg-pink-600"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
