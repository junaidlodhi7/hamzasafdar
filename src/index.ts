
import express, { Request, Response } from 'express';
require('dotenv').config();
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import screenshotRoutes from './routes/screenshot';
import logger from './utils/logging';
import expressWinston from 'express-winston';
import winston from 'winston';
import routes from './routes';
const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB = process.env.MONGODB || '';


app.use(bodyParser.json());
// Logging all HTTP requests
app.use(expressWinston.logger({
    transports: [
        new winston.transports.Console(),
    ],
    format: winston.format.combine(
        winston.format.json(),
        winston.format.colorize()
    ),
    meta: true, // Optional: control whether you want to log the meta data about the request (default to true)
    msg: "HTTP {{req.method}} {{req.url}}", // Customize the message format
    expressFormat: true, // Use the default Express request logger
    colorize: true, // Color the output (for console)
}));
app.use('/api', routes);
app.use('/api' ,screenshotRoutes);
app.get('/', (req: Request, res: Response) => {
  res.json({status:'success',message:'application is running'});
});

mongoose.connect(MONGODB, {})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


app.listen(PORT, () => {
    logger.info(`Server is running on http://localhost:${PORT}`);
});
