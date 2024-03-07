import { Router } from 'express'
import controller from '../controllers/users.js'

const router = Router()

router.post('/', controller.create)
router.get('/', controller.retrieveAll)

export default router
