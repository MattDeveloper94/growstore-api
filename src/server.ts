import app from "./app";
import { envs } from "./config/env";

app.listen(envs.PORT, () => {
    console.log(`Server running on port ${envs.PORT}`);
});