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
// log incoming requests (helps debug CORS/preflight on deployments)
app.use((req, res, next) => {
  try {
    console.log(`${new Date().toISOString()} ${req.method} ${req.originalUrl} Origin:${req.headers.origin}`)
  } catch (e) {
    // ignore logging errors
  }
  next()
})

// explicit preflight response to avoid redirects on OPTIONS
app.options(/.*/, (req, res) => {
  const origin = req.headers.origin
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', req.headers['access-control-request-headers'] || 'Content-Type, Authorization, X-Requested-With')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  return res.sendStatus(204)
})

//api routes
app.get('/',(req,res)=>res.send("Api Working"))
app.use('/api/user', userRouter)
app.use('/api/image',imageRouter)

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})