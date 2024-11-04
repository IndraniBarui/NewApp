import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId:{
        type: String,
        required:true
    },
    productId:{
      type: String,
      required:true
    },
    price:{
      type: String,
      required:true
    },
    size:{
      type: String,
      required:true
    },
   
    color:{
      type: String,
      required:true
    },
    createdAt: {
          type: Date,
          default: Date.now,
        },


  });
  
  const cartModel = mongoose.model("Cart", cartSchema);
  
  export default cartModel;