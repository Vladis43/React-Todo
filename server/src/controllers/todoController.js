import Todo from '../models/Todo'

export default {
    async FetchTodos(request, response) {
        const cardId = request.params.cardId

        try {
            const todo = await Todo.find({cardId})
            response.status(200).json({
                message: 'Todos fetched!',
                todo
            })
        } catch (error) {
            response.status(500).json(error)
        }
    },

    async AddNewTodo(request, response) {
        const cardId = request.params.cardId
        const errors = request.validationErrors()

        if (errors) {
            response.status(422).json({errors})
        } else {
            try {
                const todo = await Todo.create({
                    ...request.body, cardId
                })
                response.status(201).json({
                    message: 'Todo successfully created!',
                    todo
                })
            } catch (error) {
                response.status(500).json(error)
            }
        }
    },

    async ToggleTodo(request, response) {
        const id = request.params.id

        try {
            const todo = await Todo.findById(id)
            todo.completed = !todo.completed
            todo.save()
            response.status(200).json({
                message: `Todo completed is ${todo.completed}!`,
                todo
            })
        } catch (error) {
            response.status(404).json(error)
        }
    },

    async DeleteTodo(request, response) {
        const id = request.params.id

        try {
            const todo = await Todo.findByIdAndDelete(id)
            response.status(200).json({
                message: `Todo named '${todo.title}' deleted!`
            })
        } catch (error) {
            response.status(404).json(error)
        }
    }
}