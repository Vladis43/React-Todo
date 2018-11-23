import { Router } from 'express'
import { FetchTodos, AddNewTodo, ToggleTodo, DeleteTodo } from '../controllers/todoController'

const route = Router()

route.get('/', FetchTodos)
route.post('/', AddNewTodo)
route.patch('/:id', ToggleTodo)
route.delete('/:id', DeleteTodo)

export default route