import express from "express";
import cors from "cors";
import { handleError } from "./middlewares/error.handler";
import userRouter from "./modules/user/user.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", userRouter);
app.get("/", (req, res) => {
    res.send("API RUNNING!")
});
app.use(handleError);

export default app;