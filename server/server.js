import 'dotenv/config'
import express from 'express'
import cors from'cors'
import connectDB from './configs/mongodb.js'
import userRouter from './routes/userRouter.js'
import imageRouter from './routes/imageRouter.js'

//App config
const PORT= process.env.PORT || 4000
const app= express()
await connectDB()

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  process.env.FRONTEND_URL,
  'https://bg-removal-frontend-liart.vercel.app',
  'https://bg-removal-frontend.vercel.app'
].filter(Boolean)

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
      return
    }

    callback(new Error('Not allowed by CORS'))
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}

//initialize  middlewares
app.use(express.json())
app.use(cors(corsOptions))
app.options('*', cors(corsOptions))

//api routes
app.get('/',(req,res)=>res.send("Api Working"))
app.use('/api/user', userRouter)
app.use('/api/image',imageRouter)

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})