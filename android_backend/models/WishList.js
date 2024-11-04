import mongoose from "mongoose";

const wishListSchema = new mongoose.Schema({
    userId:{
        type: String,
        required:true
    },
    images:
        {
            url: {
              type: String,
              required: true,
            },
            title:{
              type: String,
              required: true,
            },
            description: {
              type: String,
              required: true,
            },
            price:{
              type: String,
              required: true,
            },
         
          },
          status:{
            type: String,
            required: true,
          },
    createdAt: {
        type: Date,
        default: Date.now,
      },
});

const WishListModel = mongoose.model("WishList",wishListSchema );
export default WishListModel;