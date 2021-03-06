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
    image: {
        type: Schema.Types.String
    },
    imageURL: {
        type: Schema.Types.String
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    }
})

const Card = mongoose.model('Card', card)

export default Card