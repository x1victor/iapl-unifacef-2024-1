import { Router } from 'express'
import controller from '../controllers/users.js'

const router = Router()

router.get('/me', controller.me)
router.post('/logout', controller.logout)
router.post('/', controller.create)
router.get('/', controller.retrieveAll)
router.get('/:id', controller.retrieveOne)
router.put('/:id', controller.update)
router.delete('/:id', controller.delete)
router.post('/login', controller.login)

export default router
