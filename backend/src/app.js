import dotenv from 'dotenv'
import express from 'express'
import 'body-parser'
import cors from 'cors'
import router from './routes/index.js'
import connectDB from './config/db.js'
import cookieSession from 'cookie-session';
import { errorHandler, notFound } from './middlewares/errorMiddleware.js'

dotenv.config()
connectDB()

const app = express()
const origin = process.env.FRONTEND_URL;
const port = process.env.BACKEND_PORT

app.use(express.json())
app.use(cors({
    origin: origin,
    credentials: true
}));
app.use(cookieSession({
  signed: false,
  secure: false
}));
app.use('/api', router)
app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Listening on port ${port}!`)
})

export default app