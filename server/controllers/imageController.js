import axios from 'axios'
import fs from 'fs'
import formData from 'form-data'
import userModel from '../models/userModel.js'

// controller function to remove bg from image

export const removeBg = async (req, res) => {
  try {
    const { userId } = req.body

    const user = await userModel.findById(userId)

    if (!user) {
      return res.json({ success: false, message: 'User not found' })
    }

    if (user.credits === 0) {
      return res.json({ success: false, message: 'No credit balance', credits: user.credits })
    }

   const imagePath=req.file.path;
   //reading Image file
const imageFile =fs.createReadStream(imagePath)

const formdata = new formData()
    formdata.append('image_file', imageFile)

    const { data } = await axios.post('https://clipdrop-api.co/remove-background/v1', formdata, {
      headers: {
        ...formdata.getHeaders(),
        'x-api-key': process.env.CLIPDROP_API,
      },
      responseType: 'arraybuffer',
    })

    const base64Image = Buffer.from(data, 'binary').toString('base64')
    const resultImage = `data:${req.file.mimetype};base64,${base64Image}`
    const updatedCredits = user.credits - 1

    await userModel.findByIdAndUpdate(user._id, { credits: updatedCredits })

    res.json({ success: true, resultImage, credits: updatedCredits, message: 'Background removed' })
  } catch (error) {
    console.log(error.message)
    res.json({ success: false, message: error.message })
  }
}
