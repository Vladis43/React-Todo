import {Router} from 'express'
import todoController from '../controllers/todoController'

const route = Router()

route.get('/:cardId', todoController.FetchTodos)
route.post('/', todoController.AddNewTodo)
route.patch('/:id', todoController.ToggleTodo)
route.delete('/:id', todoController.DeleteTodo)

export default route