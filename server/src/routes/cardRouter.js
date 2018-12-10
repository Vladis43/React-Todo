import {Router} from 'express'
import multer from "multer"
import cardController from '../controllers/cardController'

const route = Router()

const storage = multer.diskStorage({
    destination: (request, file, cb) => {
        cb(null, './uploads/')
    },
    filename: (request, file, cb) => {
        cb(null, new Date().toISOString() + file.originalname)
    }
})
const upload = multer({storage})

route.get('/:userId', cardController.FetchCards)
route.post('/', upload.single('image'), cardController.AddNewCard)
route.delete('/:id', cardController.DeleteCard)

export default route
