import UserModel from "../models/user.js";
import PostModel from "../models/Items.js";
import jwt from "jsonwebtoken";
import WishListModel from "../models/WishList.js";
import cartModel from "../models/AddToCart.js";

const create_user = async (req, res) => {
  const { firstName, lastName, email, contactNumber, password } = req.body;

  const oldUser = await UserModel.findOne({ email });
  if (oldUser) {
    return res.status(403).json({
      error: "this email is already in use",
    });
  }
  const user = await UserModel.create({
    firstName,
    lastName,
    email,
    contactNumber,
    password,
  });
  res.status(200).json({ success: true, message: "Account created!!" });
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    const isMatched = await user.comparePassword(password);
    if (!isMatched) {
      return res.status(403).json({
        error: "Email/Password does not match!",
      });
    }

    const token = jwt.sign({ id: user._id.toString() }, "secret", {
      expiresIn: "1h",
    });

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        contactNumber: user.contactNumber,
      },
      token,
      message: "User login successful",
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
};

const Update_user = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, contactNumber, image } = req.body;
  try {
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }
    // const isMatched = await user.comparePassword(password);
    // if (!isMatched) {
    //   return res.status(403).json({
    //     error: "Email/Password does not match!",
    //   });
    // }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.contactNumber = contactNumber || user.contactNumber;
    //   if (image) {
    //     user.image = image;
    //
    user.image = image || user.image;
    await user.save();

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        contactNumber: user.contactNumber,
        image: user.image,
      },
    });
  } catch (err) {
    res.status(500).json({
      err: "Internal server error",
      details: err.message,
    });
  }
};

const post_item = async (req, res) => {
  const { images } = req.body;
  try {
    let id = req.params.id;
    const user = await UserModel.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const existingPost = await PostModel.findOne({ "images.url": images.url });
    if (existingPost) {
      return res
        .status(400)
        .json({ message: "Image with the same URL already exists." });
    }

    const newPost = new PostModel({
      userId: user.id,
      images,
    });
    await newPost.save();
    res
      .status(201)
      .json({ message: "Post created successfully", post: newPost });
  } catch (err) {
    res.status(500).json({
      error: "Internal server error",
      details: err.message,
    });
  }
  // try {
  //   let id = req.params.id;

  //   const user = await UserModel.findOne({ _id: id });

  //   if (!user) {
  //     return res.status(404).json({ error: "User not found" });
  //   }

  //   let postData = await PostModel.findOne({ userId: user.id });

  //   if (!postData) {
  //     postData = new PostModel({
  //       userId: user.id,
  //       images: [],
  //     });
  //   }

  //   const imageUrls = images.map((image) => image.url);

  //   const existingImages = await PostModel.find({
  //     userId: user.id,
  //     "images.url": { $in: imageUrls },
  //   }).select("images.url");

  //   const existingImageUrls = existingImages
  //     .map((post) => post.images.map((img) => img.url))
  //     .flat();

  //   const newImages = images.filter(
  //     (image) => !existingImageUrls.includes(image.url)
  //   );

  //   if (newImages.length === 0) {
  //     return res.status(400).json({ error: "No new images to add" });
  //   }

  //   postData.images.push(...newImages);

  //   await postData.save();

  //   res.status(201).json({
  //     success: true,
  //     message: "Data posted successfully",
  //     data: postData,
  //   });
  // } catch (err) {
  //   res.status(500).json({
  //     error: "Internal server error",
  //     details: err.message,
  //   });
  // }
};

const get_item = async (req, res) => {
  try {
    const userId = req.params.id;

    const posts = await PostModel.find({ userId });

    if (posts.length === 0) {
      return res.status(404).json({ message: "No posts found" });
    }

    res.status(200).json({ posts });
  } catch (err) {
    res.status(500).json({
      error: "Internal server error",
      details: err.message,
    });
  }
};

const update_item = async (req, res) => {
  const userId = req.params.userId;
  const imageId = req.params.imageId;
  const { title, description, price, url } = req.body;

  try {
    const user = await UserModel.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const updatedPost = await PostModel.findOneAndUpdate(
      { userId: user.id, "images._id": imageId },
      {
        $set: {
          "images.$.title": title,
          "images.$.description": description,
          "images.$.price": price,
          "images.$.url": url,
        },
      },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ error: "Image not found" });
    }

    res.status(200).json({
      success: true,
      message: "Image updated successfully",
      data: updatedPost,
    });
  } catch (err) {
    res.status(500).json({
      error: "Internal server error",
      details: err.message,
    });
  }
};

const delete_item = async (req, res) => {
  const userId = req.params.userId;
  const imageId = req.params.imageId;

  try {
    const user = await UserModel.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const updatedPost = await PostModel.findByIdAndDelete({ _id: imageId });

    if (!updatedPost) {
      return res
        .status(404)
        .json({ error: "Image not found or already deleted" });
    }

    res.status(200).json({
      success: true,
      message: "Image deleted successfully",
      data: updatedPost,
    });
  } catch (err) {
    res.status(500).json({
      error: "Internal server error",
      details: err.message,
    });
  }
};

const wishList = async (req, res) => {
  const userId = req.params.userId;
  const imageId = req.body.imageId;
  const status = req.params.status;
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const post = await PostModel.findById(imageId);
    console.log(post);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    const { images } = post;
    const wishList = new WishListModel({
      images,
      userId: post.userId,
      status,
    });
    await wishList.save();
    res
      .status(201)
      .json({ message: "Data transferred successfully", post: wishList });
  } catch (err) {
    res.status(500).json({
      error: "Internal server error",
      details: err.message,
    });
  }
};

const get_WishList = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const wishListData = await WishListModel.find({ userId });
    if (!wishListData) {
      return res.status(404).json({ error: "No data found for this user" });
    }

    const imagesCount = wishListData.length.toString();
    console.log(imagesCount);
    res.status(200).json({
      success: true,
      data: wishListData,
      imagesCount: imagesCount,
    });
  } catch (err) {
    res.status(500).json({
      error: "Internal server error",
      details: err.message,
    });
  }
};

const cartDetails = async (req, res) => {
  const userId = req.params.userId;

  const { productId, size, price } = req.body;

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

export {
  create_user,
  signIn,
  Update_user,
  post_item,
  get_item,
  update_item,
  delete_item,
  wishList,
  get_WishList,
  cartDetails,
};
