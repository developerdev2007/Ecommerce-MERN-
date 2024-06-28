import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  useUpdateProductMutation,
  useGetProductByIdQuery,
  useDeleteProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice.js";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice.js";
import AdminMenu from "./AdminMenu.jsx";

const ProductUpdate = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [uploadProductImage] = useUploadProductImageMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const { data: categories = [] } = useFetchCategoriesQuery();
  const { data: productData } = useGetProductByIdQuery(params._id);
  console.log(productData);

  const [image, setImage] = useState(productData?.image || "");
  const [name, setName] = useState(productData?.name || "");
  const [description, setDescription] = useState(
    productData?.description || ""
  );
  const [price, setPrice] = useState(productData?.price || "");
  const [category, setCategory] = useState(productData?.category || "");
  const [quantity, setQuantity] = useState(productData?.quantity || "");
  const [brand, setBrand] = useState(productData?.brand || "");
  const [stock, setStock] = useState(productData?.countInStock || 0);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (productData && productData._id) {
      setName(productData.name);
      setDescription(productData.description);
      setPrice(productData.price);
      setCategory(productData.category);
      setQuantity(productData.quantity);
      setBrand(productData.brand);
      setStock(productData.countInStock);
      setImage(productData.image);
    }
  }, [productData]);

  const handleSubmit = async (e) => {
    console.log("click");
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("image", image);
      formData.append("category", category);
      formData.append("quantity", quantity);
      formData.append("brand", brand);
      formData.append("countInStock", stock);

      const { data } = await updateProduct({
        productId: params._id,
        formData,
      });
      console.log(data);
      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success(`Product successfully updated!!!`);
        navigate("/admin/allproductslist");
      }
      console.log(data);
    } catch (error) {
      console.log(error);
      toast.error("Product Update  failed!!!");
    }
  };
  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success("image Addded successfully");
      setImage(res.image);
    } catch (error) {
      toast.error(error?.error);
    }
  };
  const handleDelete = async (e) => {
    try {
      let confirmation = window.confirm(
        "Do you really want to delete this Product!!!"
      );
      if (!confirmation) return;

      const { data } = await deleteProduct(params._id);
      toast.success("Product has been successfully deleted!!");
      navigate("/admin/allproductslist");
    } catch (error) {
      toast.error("Deletion Failed!!!");
    }
  };

  return (
    <div className="container xl:mx-[9rem] sm:mx-[0]">
      <div className="flex flex-cols md:flex-rows">
        <AdminMenu />
        <div className="p-3 md:w:3/4">
          <div className="h-12">Update Product</div>
          {image && (
            <div className="text-center">
              <img
                src={image}
                alt="Product"
                className="block mx-auto max-h-[200px] "
              />
            </div>
          )}
          <div className="md-3">
            <label className="block w-full px-4 text-center text-white border rounded-lg cursor-pointer py-11">
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
              onChange={(e) => setDescription(e.target.description)}
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
              <div className="flex justify-between">
                <button
                  onClick={handleSubmit}
                  className="px-10 py-4 mt-5 text-lg font-bold text-white bg-green-500 border rounded-lg hover:bg-green-600"
                >
                  Submit
                </button>
                <button
                  onClick={handleDelete}
                  className="px-10 py-4 mt-5 text-lg font-bold text-white bg-red-500 border rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
