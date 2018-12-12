import {Router} from 'express'
import multer from "multer"
import cardController from '../controllers/cardController'
import verifyToken from '../middlewares/verifyToken'

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

route.get('/:userId', verifyToken, cardController.FetchCards)
route.post('/', verifyToken, upload.single('image'), cardController.AddNewCard)
route.delete('/:id', verifyToken, cardController.DeleteCard)

export default route