import mongoose from 'mongoose'

const Schema = mongoose.Schema

const image = new Schema({
    originalname: {
        type: Schema.Types.String
    },
    filename: {
        type: Schema.Types.String
    },
    mimetype: {
        type: Schema.Types.String
    },
    path: {
        type: Schema.Types.String
    }
})

const Image = mongoose.model('Image', image)

export default Image