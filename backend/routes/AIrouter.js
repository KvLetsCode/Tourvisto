import express from 'express'
import { AIdataPost, getAidata, getAll } from '../controllers/AIcontroller.js'

const router = express.Router()

router.route('/add').post(AIdataPost)
router.route('/getOne/:id').get(getAidata)
router.route('/getAll').get(getAll)

export default router