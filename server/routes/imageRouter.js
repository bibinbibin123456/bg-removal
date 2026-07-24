import express from 'express'
import { removeBg } from '../controllers/imageController.js'
import upload from '../middlewares/multer.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const imageRouter = express.Router()

imageRouter.post('/remove-bg', authMiddleware, upload.single('image'), removeBg)

export default imageRouter
