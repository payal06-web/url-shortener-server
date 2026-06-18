import express from "express"
import { nanoid } from "nanoid"
import dotenv from "dotenv"
import connectDB from "./src/config/monogo.config.js"
import short_url from "./src/routes/short_url.route.js"
import user_routes from "./src/routes/user.routes.js"
import auth_routes from "./src/routes/auth.routes.js"
import { redirectFromShortUrl }  from "./src/controller/short_url.controller.js"
import { errorHandler } from "./src/utils/errorHandler.js";
import cors from "cors"
import { attachUser } from "./src/utils/attachUser.js";
import cookieParser from"cookie-parser"

dotenv.config()

const app = express()

app.use(cors({
    origin: 'http://localhost:5173', // your React app
    credentials: true // 👈 this allows cookies to be sent
}));

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(attachUser);


app.use("/api/user",user_routes)
app.use("/api/auth",auth_routes)

// post (jisse short url create krenge)
app.use("/api/short",short_url)

// get- redirection (ye direct node mein jayega)
app.get("/:id",redirectFromShortUrl)

app.use(errorHandler)

const startServer = async () => {
    try {
        await connectDB();
        app.listen(5000,"0.0.0.0", () => {
            console.log("Server running on http://localhost:5000");
        });
    } catch (error) {
        console.error("DB connection failed", error);
        process.exit(1);
    }
};

startServer();





