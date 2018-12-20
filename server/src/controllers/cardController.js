import fs from 'fs'
import Card from '../models/Card'

export default {
    async FetchCards(request, response) {
        const userId = request.userData.payload.userId

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
        const userId = request.userData.payload.userId
        const imageFile = request.file
        const errors = request.validationErrors()

        if (errors) {
            response.status(422).json({errors})
        } else {
            try {
                if (imageFile === undefined) {
                    const card = await Card.create({
                        ...request.body, userId
                    })

                    response.status(201).json({
                        message: 'Card successfully created!',
                        card
                    })
                } else {
                    const card = await Card.create({
                        ...request.body, userId,
                        image: imageFile.path,
                        imageURL: `${process.env.URL}/${imageFile.path}`
                    })

                    response.status(201).json({
                        message: 'Card successfully created!',
                        card
                    })
                }
            } catch (error) {
                response.status(500).json(error)
            }
        }
    },

    async EditCard(request, response) {
        const id = request.params.id
        const imageFile = request.file
        const errors = request.validationErrors()

        if (errors) {
            response.status(422).json({errors})
        } else {
            try {
                if (imageFile === undefined) {
                    const card = await Card.findByIdAndUpdate(id, {...request.body}, {new: true})

                    response.status(200).json({
                        message: 'Card edited!',
                        card
                    })
                } else {
                    const oldCard = await Card.findById(id)
                    if (oldCard.image) {
                        fs.unlinkSync(oldCard.image)
                    }

                    const card = await Card.findByIdAndUpdate(id, {
                        ...request.body,
                        image: imageFile.path,
                        imageURL: `${process.env.URL}/${imageFile.path}`
                    }, {new: true})

                    response.status(200).json({
                        message: 'Card edited!',
                        card
                    })
                }
            } catch (error) {
                response.status(500).json(error)
            }
        }
    },

    async DeleteCard(request, response) {
        const id = request.params.id

        try {
            const deletedCard = await Card.findByIdAndDelete(id)

            if (deletedCard.image) {
                fs.unlinkSync(deletedCard.image)
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