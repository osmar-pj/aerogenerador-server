import {Router} from 'express'
const router = Router()

import * as devicesCtrl from "../controllers/device.controller"

router.post('/', devicesCtrl.createDevice)
router.get('/', devicesCtrl.getDevices)
router.get('/:name', devicesCtrl.searchDevice)

export default router