import express from "express";
import cors from "cors";
import { handleError } from "./middlewares/error.handler";
import userRouter from "./modules/user/user.routes";
import authRouter from "./modules/auth/auth.routes";
import addressRouter from "./modules/address/address.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", userRouter);
app.use("/api", authRouter);
app.use("/api", addressRouter);
app.get("/", (req, res) => {
    res.send("API RUNNING!")
});
app.use(handleError);

export default app;