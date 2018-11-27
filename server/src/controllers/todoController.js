import Todo from '../models/Todo'

module.exports = {
    async FetchTodos(request, response) {
        const userId = request.params.userId

        try {
            const todo = await Todo.find({
                userId
            })
            response.status(200).json(todo)
        } catch (err) {
            response.status(404).json(err)
        }
    },

    async AddNewTodo(request, response) {
        try {
            const todo = await Todo(request.body).save()

            response.status(201).json(todo)
        } catch (err) {
            response.status(404).json(err)
        }
    },

    async ToggleTodo(request, response) {
        const id = request.params.id
        const completed = request.body.completed

        try {
            const todo = await Todo.findByIdAndUpdate(id, {completed: completed})
            response.status(200).json(todo)
        } catch (err) {
            response.status(404).json(err)
        }
    },

    async DeleteTodo(request, response) {
        const id = request.params.id

        try {
            const todo = await Todo.findByIdAndDelete(id)
            response.status(200).json(todo)
        } catch (err) {
            response.status(404).json(err)
        }
    }
}