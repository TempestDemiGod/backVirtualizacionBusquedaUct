import app from "./app/app.js";
import { PORT } from "./config/config.js";
import { connectDB } from "./config/connectdb.js";


app.listen(PORT, ()=> {
    console.log(`app is running on port ${PORT}`)
})
connectDB()