import fs from 'fs'

import Card from '../models/Card'
import Image from '../models/Image'

export default {
    async FetchCards(request, response) {
        const userId = request.params.userId

        try {
            const card = await Card.find({userId})
            response.status(200).json({
                message: 'Cards fetched!',
                card
            })
        } catch (error) {
            response.status(404).json(error)
        }
    },

    async AddNewCard(request, response) {
        try {
            if (request.file === undefined) {
                const card = await Card.create({
                    ...request.body
                })

                response.status(201).json({
                    message: 'Card successfully created!',
                    card
                })
            } else {
                const image = await Image.create({
                    ...request.file
                })

                const card = await Card.create({
                    ...request.body,
                    imageId: image._id,
                    imageURL: `${process.env.URL}/${image.path}`
                })

                response.status(201).json({
                    message: 'Card successfully created!',
                    card
                })
            }
        } catch (error) {
            response.status(404).json(error)
        }
    },

    async DeleteCard(request, response) {
        const id = request.params.id

        try {
            const card = await Card.findByIdAndDelete(id)

            if (card.imageId) {
                const image = await Image.findById(card.imageId)
                fs.unlinkSync(image.path)
                await Image.findByIdAndDelete(card.imageId)
            }

            response.status(200).json({
                message: 'Card deleted!',
                card
            })
        } catch (error) {
            response.status(404).json(error)
        }
    }
}