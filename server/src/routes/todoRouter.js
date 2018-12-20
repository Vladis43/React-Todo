import {Router} from 'express'
import todoController from '../controllers/todoController'
import verifyToken from '../middlewares/verifyToken'
import todoValidation from '../middlewares/todoValidation'

const route = Router()

route.get('/:cardId', verifyToken, todoController.FetchTodos)
route.post('/:cardId', verifyToken, todoValidation, todoController.AddNewTodo)
route.put('/:id', verifyToken, todoController.ToggleTodo)
route.delete('/:id', verifyToken, todoController.DeleteTodo)

export default route