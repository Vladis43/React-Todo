import {Router} from 'express'
import multer from "multer"
import cardController from '../controllers/cardController'
import verifyToken from '../middlewares/verifyToken'
import cardValidation from '../middlewares/cardValidation'

const route = Router()

const storage = multer.diskStorage({
    destination: (request, file, cb) => {
        cb(null, './uploads/')
    },
    filename: (request, file, cb) => {
        cb(null, new Date().toISOString() + file.originalname)
    }
})
const fileFilter = (request, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}
const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // 5 Mb
    },
    fileFilter
})

route.get('/', verifyToken, cardController.FetchCards)
route.post('/', verifyToken, upload.single('image'), cardValidation, cardController.AddNewCard)
route.put('/:id', verifyToken, upload.single('image'), cardValidation, cardController.EditCard)
route.delete('/:id', verifyToken, cardController.DeleteCard)

export default route