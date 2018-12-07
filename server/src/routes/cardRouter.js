import {Router} from 'express'
import cardController from '../controllers/cardController'

const route = Router()

route.get('/:userId', cardController.FetchCards)
route.post('/', cardController.AddNewCard)
route.delete('/:id', cardController.DeleteCard)

export default route
