import express ,{ Application } from "express";
import cookieParser from "cookie-parser";
import { cspOptions, rateLimiter } from "./utils/security";
import logger from "./common/logger";
import helmet from "helmet";
import AppError from "./utils/appError";
import { errorHandler } from "./middlewares/err.middleware";
import authRouter from "./routes/auth.routes";
import swaggerUi from 'swagger-ui-express'
import MyJson from './swagger/swagger.json'
import bookRouter from "./routes/book.routes";
import cors  from "cors"

const app: Application = express();
app.use(express.json());
app.use(cookieParser())

app.use(rateLimiter)
app.use(helmet.contentSecurityPolicy(cspOptions));

app.use((req, res, next) => {
    logger.info(`Request received: ${req.method} ${req.url}`);
    next();
});

app.use(cors({
    origin: ['http://localhost:3000'],  
    credentials: true 
  }));

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/books", bookRouter)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(MyJson))

app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorHandler);


export default app;