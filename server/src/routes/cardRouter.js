import {Router} from 'express'
import {FetchCards, AddNewCard, DeleteCard} from '../controllers/cardController'

const route = Router()

route.get('/:userId', FetchCards)
route.post('/', AddNewCard)
route.delete('/:id', DeleteCard)

export default route
