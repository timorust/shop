import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import { productRouter } from './routers/productRouter'
import { seedRouter } from './routers/seedRouter'
const app = express()
dotenv.config()
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost/elshopdb'
mongoose.set('strictQuery', true)
mongoose
	.connect(MONGO_URL, {
		serverSelectionTimeoutMS: 5000,
	})
	.then(() => {
		console.log('connected to mongodb')
	})
	.catch(() => {
		console.log('error mongodb')
	})

app.use(
	cors({
		credentials: true,
		origin: ['http://localhost:5173'],
	})
)

app.use('/api/products', productRouter)
app.use('/api/seed', seedRouter)

const PORT = 4000
app.listen(PORT, () => {
	console.log(`server started at http://localhost:${PORT}`)
})
