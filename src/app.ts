import express from "express";
import cors from "cors";
import { handleError } from "./middlewares/error.handler";
import userRouter from "./modules/user/user.routes";
import authRouter from "./modules/auth/auth.routes";
import addressRouter from "./modules/address/address.routes";
import categoryRouter from "./modules/category/category.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", userRouter);
app.use("/api", authRouter);
app.use("/api", addressRouter);
app.use("/api", categoryRouter);
app.get("/", (req, res) => {
    res.send("API RUNNING!")
});
app.use(handleError);

export default app;