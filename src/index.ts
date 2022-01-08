import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import {apiRoutes} from './routes/apiRoutes'
import {errorHandler } from './controllers/errorHandler'

//add enviroment variables
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(apiRoutes);
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(process.env.PORT);