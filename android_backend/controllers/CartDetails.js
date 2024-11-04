import UserModel from "../models/user.js";
import PostModel from "../models/Items.js";
import cartModel from "../models/AddToCart.js";

const cartDetails = async (req, res) => {
  const userId = req.params.userId;

  const { productId, size, price, color } = req.body;

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const post = await PostModel.findById(productId);
    console.log(productId);
    if (!post) {
      return res.status(400).json({ message: "Image not found." });
    }
    const newPost = new cartModel({
      userId: user.id,
      productId: productId,
      size,
      price,
      color,
    });
    await newPost.save();
    res.status(201).json({ message: "Added successfully", post: newPost });
  } catch (err) {
    res.status(500).json({
      error: "Internal server error",
      details: err.message,
    });
  }
};

const get_CartDetails = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    let cartDetails = await cartModel.find({ userId });
    cartDetails = JSON.parse(JSON.stringify(cartDetails));
    if (cartDetails.length === 0) {
      return res.status(404).json({ message: "No cart data found" });
    }
    let productIds = cartDetails.map((e) => e.productId);

    const cartData = await PostModel.find({ _id: { $in: productIds } });
    let obj = {};
    cartData.map((e) => {
      obj[String(e._id)] = {
        url: e.images.url,
        title: e.images.title,
      };
    });

    for (const e of cartDetails) {
      e.url = obj[e.productId].url;
      e.title = obj[e.productId].title;
    }

    const totalPrice = cartDetails.reduce((sum, item) => {
      return sum + parseFloat(item.price);
    }, 0);
    const productCount = cartDetails.length.toString();
    res.status(200).json({ cartDetails, productCount, totalPrice });
  } catch (err) {
    res.status(500).json({
      error: "Internal server error",
      details: err.message,
    });
  }
};
const deleteCartItem = async (req, res) => {
  const userId = req.params.userId;
  const  productId  = req.params.productId;

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const deletedProduct = await cartModel.findOneAndDelete({
      userId,
      productId,
    });
    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found in the cart" });
    }

    let cartDetails = await cartModel.find({ userId });
    cartDetails = JSON.parse(JSON.stringify(cartDetails));
    if (cartDetails.length === 0) {
      return res
        .status(200)
        .json({ message: "No items left in the cart", totalPrice: 0 });
    }

    const totalPrice = cartDetails.reduce((sum, item) => {
      return sum + parseFloat(item.price);
    }, 0);

    res.status(200).json({
      message: "Product deleted successfully",
      totalPrice,
      cartDetails,
    });
  } catch (err) {
    res.status(500).json({
      error: "Internal server error",
      details: err.message,
    });
  }
};

export { cartDetails, get_CartDetails, deleteCartItem };
