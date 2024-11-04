import { Router } from "express";
import { create_user, delete_item, get_item, get_WishList, post_item, signIn, update_item, Update_user, wishList } from "../controllers/signUp.js";
import { newUserValidator } from "../middleware/validator.js";
import { cartDetails,get_CartDetails , deleteCartItem} from "../controllers/CartDetails.js";

const authRouter = Router();

authRouter.post("/signUp",newUserValidator, create_user);
authRouter.post("/signIn",newUserValidator, signIn);
authRouter.put('/updateUser/:id', newUserValidator,Update_user )
authRouter.put('/post_items/:id',post_item)
authRouter.get('/get_items/:id',get_item)
authRouter.put('/update_items/:userId/images/:imageId',update_item);
authRouter.delete('/delete_items/:userId/images/:imageId',delete_item);
authRouter.post('/wishList_items/:userId/:status',wishList);
authRouter.get('/wishListGet_items/:userId',get_WishList);
authRouter.post('/addCart_items/:userId',cartDetails);
authRouter.get('/get_Cart_items/:userId',get_CartDetails);
authRouter.delete('/delete_carts/:userId/:productId',deleteCartItem);

export default authRouter