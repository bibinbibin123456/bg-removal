import axios from 'axios'
import FormData from 'form-data'
import userModel from '../models/userModel.js'

// controller function to remove bg from image

export const removeBg = async (req, res) => {
  try {
    const user = req.user

    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found' })
    }

    if (user.credits === 0) {
      return res.status(400).json({ success: false, message: 'No credit balance', credits: user.credits })
    }

    if (!req.file) {
      console.error('removeBg: no req.file available', req.file)
      return res.status(400).json({ success: false, message: 'Image upload failed' })
    }

    // Get image URL from Cloudinary
    const imageUrl = req.file.secure_url || req.file.path || req.file.url
    console.log('removeBg imageUrl:', imageUrl)

    if (!imageUrl) {
      return res.status(400).json({ success: false, message: 'Uploaded image URL not available' })
    }

    const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' })
    const formdata = new FormData()
    formdata.append('image_file', Buffer.from(imageResponse.data), {
      filename: 'image.png',
      contentType: imageResponse.headers['content-type'] || 'image/png',
    })

    const { data } = await axios.post('https://clipdrop-api.co/remove-background/v1', formdata, {
      headers: {
        ...formdata.getHeaders(),
        'x-api-key': process.env.CLIPDROP_API,
      },
      responseType: 'arraybuffer',
    })

    const base64Image = Buffer.from(data, 'binary').toString('base64')
    const resultImage = `data:image/png;base64,${base64Image}`
    const updatedCredits = user.credits - 1

    await userModel.findByIdAndUpdate(user._id, { credits: updatedCredits })

    res.json({ success: true, resultImage, credits: updatedCredits, message: 'Background removed' })
  } catch (error) {
    console.error('removeBg error:', error)
    const status = error.response?.status || 500
    const message = error.response?.data?.message || error.message || 'Background removal failed'
    return res.status(status).json({ success: false, message })
  }
}
