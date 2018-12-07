import Card from '../models/Card'

export default {
    async FetchCards(request, response) {
        const userId = request.params.userId

        try {
            const card = await Card.find({userId})
            response.status(200).json(card)
        } catch (error) {
            response.status(404).json(error)
        }
    },

    async AddNewCard(request, response) {
        try {
            const card = await Card(request.body).save()
            response.status(201).json(card)
        } catch (error) {
            response.status(404).json(error)
        }
    },

    async DeleteCard(request, response) {
        const id = request.params.id

        try {
            const card = await Card.findByIdAndDelete(id)
            response.status(200).json(card)
        } catch (error) {
            response.status(404).json(error)
        }
    }
}