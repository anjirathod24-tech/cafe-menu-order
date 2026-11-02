
const Menu = require("../models/Menu");

// Get all menu items
const getMenuItems = async (req, res) => {
  try {
    const items = await Menu.find();

    res.status(200).json({
      success: true,
      data: items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch menu items",
    });
  }
};

// Add new menu item
const addMenuItem = async (req, res) => {
  try {
    const { name, description, price, category, image, available } = req.body;

    // Validation
    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Menu item name is required",
      });
    }

    if (price === undefined || price === null || price === "") {
      return res.status(400).json({
        success: false,
        message: "Price is required",
      });
    }

    if (Number(price) < 0 || !Number.isFinite(Number(price))) {
      return res.status(400).json({
        success: false,
        message: "Price must be a valid non-negative number",
      });
    }

    if (!category || !category.trim()) {
      return res.status(400).json({
        success: false,
        message: "Category is required",
      });
    }

    const newItem = await Menu.create({
      name,
      description,
      price: Number(price),
      category,
      image,
      available,
    });

    res.status(201).json({
      success: true,
      message: "Menu item added successfully",
      data: newItem,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Update menu item
const updateMenuItem = async (req, res) => {
  try {
    const { name, price, category } = req.body;

    if (name !== undefined && !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Menu item name cannot be empty",
      });
    }

    if (price !== undefined &&
        (price === "" || !Number.isFinite(Number(price)) || Number(price) < 0)) {
      return res.status(400).json({
        success: false,
        message: "Price must be a valid non-negative number",
      });
    }

    if (category !== undefined && !category.trim()) {
      return res.status(400).json({
        success: false,
        message: "Category cannot be empty",
      });
    }

    const updatedItem = await Menu.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: "after", runValidators: true }
    );

    if (!updatedItem) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Menu item updated successfully",
      data: updatedItem,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete menu item
const deleteMenuItem = async (req, res) => {
  try {
    const deletedItem = await Menu.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Menu item deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getMenuItems,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
};
