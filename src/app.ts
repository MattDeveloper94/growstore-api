import express from "express";
import cors from "cors";
import { handleError } from "./middlewares/error.handler";
import userRouter from "./modules/user/user.routes";
import authRouter from "./modules/auth/auth.routes";
import addressRouter from "./modules/address/address.routes";
import categoryRouter from "./modules/category/category.routes";
import productRouter from "./modules/product/product/product.routes";
import productVariantRouter from "./modules/product/productVariant/productVariant.routes";
import cartItemRouter from "./modules/cart/cartItem/cartItem.routes";
import findCartMe from "./modules/cart/cart/cart.routes";
import orderRouter from "./modules/order/order/order.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", userRouter);
app.use("/api", authRouter);
app.use("/api", addressRouter);
app.use("/api", categoryRouter);
app.use("/api", productRouter);
app.use("/api", productVariantRouter);
app.use("/api", cartItemRouter);
app.use("/api", findCartMe);
app.use("/api", orderRouter);
app.get("/", (req, res) => {
    res.send("API RUNNING!")
});
app.use(handleError);

export default app;