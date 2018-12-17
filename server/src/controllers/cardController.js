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
            response.status(500).json(error)
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
            response.status(500).json(error)
        }
    },

    async EditCard(request, response) {
        const id = request.params.id

        try {
            if (request.file === undefined) {
                const card = await Card.findByIdAndUpdate(id, request.body)
                if (card) {
                    const editedCard = await Card.findById(id)
                    response.status(200).json({
                        message: 'Card edited!',
                        editedCard
                    })
                } else {
                    response.status(418).json({
                        message: 'Failed to edit card!'
                    })
                }
            } else {
                const card = await Card.findById(id)
                if (!card) {
                    response.status(404).json({
                        message: 'There is no such card!'
                    })
                } else {
                    const image = await Image.findByIdAndUpdate(card.imageId, request.file)
                    fs.unlinkSync(image.path)
                    const newImage = await Image.findById(card.imageId)
                    const newCard = await Card.findByIdAndUpdate(id, {
                        ...request.body,
                        imageId: newImage._id,
                        imageURL: `${process.env.URL}/${newImage.path}`
                    })
                    if (newCard) {
                        const editedCard = await Card.findById(id)
                        response.status(200).json({
                            message: 'Card edited!',
                            editedCard
                        })
                    } else {
                        response.status(418).json({
                            message: 'Failed to edit card!'
                        })
                    }
                }
            }
        } catch (error) {
            response.status(500).json(error)
        }
    },

    async DeleteCard(request, response) {
        const id = request.params.id

        try {
            const deletedCard = await Card.findByIdAndDelete(id)

            if (deletedCard.imageId) {
                const image = await Image.findById(deletedCard.imageId)
                fs.unlinkSync(image.path)
                await Image.findByIdAndDelete(deletedCard.imageId)
            }

            response.status(200).json({
                message: 'Card deleted!',
                deletedCard
            })
        } catch (error) {
            response.status(500).json(error)
        }
    }
}