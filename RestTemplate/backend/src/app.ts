import express ,{ Application } from "express";
import cookieParser from "cookie-parser";
import { rateLimiter } from "./utils/security";
import logger from "./common/logger";
import cors  from "cors"
import authRoutes from "./routes/auth.routes";






const app: Application= express();

app.use(express.json());
app.use(cookieParser());

app.use(rateLimiter);

app.use((req, res, next) => {
    logger.info(`Request received: ${req.method} ${req.url}`);
    next();
});

app.use(cors({
    origin: ['http://localhost:3000'],  
    credentials: true 
}));

app.use("/api/v1/auth", authRoutes)

export default app;