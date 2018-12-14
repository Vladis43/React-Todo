import mongoose from 'mongoose'

const Schema = mongoose.Schema

const card = new Schema({
    title: {
        type: Schema.Types.String,
        required: true
    },
    description: {
        type: Schema.Types.String,
        required: true
    },
    imageId: {
        type: Schema.Types.ObjectId
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    }
})

const Card = mongoose.model('Card', card)

export default Card