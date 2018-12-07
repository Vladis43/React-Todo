import Todo from '../models/Todo'

export default {
    async FetchTodos(request, response) {
        const cardId = request.params.cardId

        try {
            const todo = await Todo.find({cardId})
            response.status(200).json(todo)
        } catch (error) {
            response.status(404).json(error)
        }
    },

    async AddNewTodo(request, response) {
        try {
            const todo = await Todo(request.body).save()
            response.status(201).json(todo)
        } catch (error) {
            response.status(404).json(error)
        }
    },

    async ToggleTodo(request, response) {
        const id = request.params.id
        const completed = request.body.completed

        try {
            const todo = await Todo.findByIdAndUpdate(id, {completed: completed})
            response.status(200).json(todo)
        } catch (error) {
            response.status(404).json(error)
        }
    },

    async DeleteTodo(request, response) {
        const id = request.params.id

        try {
            const todo = await Todo.findByIdAndDelete(id)
            response.status(200).json(todo)
        } catch (error) {
            response.status(404).json(error)
        }
    }
}