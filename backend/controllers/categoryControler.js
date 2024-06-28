import Category from "../models/categoryModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
/////////////////////////////////////
const createCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      res.json({ error: "name is Required !!!" });
    }
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) res.json({ error: "Category Already exists" });
    const category = await new Category({ name }).save();
    res.status(201).json(category);
    console.log(name);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});
/////////////////////////////////////
const updateCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    const { categoryId } = req.params;
    const category = await Category.findById({ _id: categoryId });
    if (!category) {
      console.log("Category not found ");
      res.status(404).json({ error: "Category Not Found !!!" });
    }
    category.name = name;
    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Internal server Error" });
  }
});
/////////////////////////////////////
const removeCategory = asyncHandler(async (req, res) => {
  try {
    const { categoryId } = req.params;
    const category = await Category.findByIdAndDelete(req.params.categoryId);
    if (!category) {
      console.log("Category not found ");
      res.status(404).json({ error: "Category Not Found !!!" });
    }
    res.json({ message: "Category Removed successfully" });
    res.json(category);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "cannot delete category!!!" });
  }
});
/////////////////////////////////////////
const listCategory = asyncHandler(async (req, res) => {
  try {
    const all = await Category.find({});
    if (!all) {
      res.json({ error: "Categories Not Found !!!" });
    }
    res.json(all);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Categories Found , Internal server Error" });
  }
});
////////////////////////////////////////
const readCategory = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById({ _id: id });
    if (!category) {
      res.json({ error: "Cannot find category!!!" });
    }
    res.json(category);
    console.log(category);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server Error!!!" });
  }
});
export {
  createCategory,
  updateCategory,
  removeCategory,
  listCategory,
  readCategory,
};
