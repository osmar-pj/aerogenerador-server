import { Router } from "express";
const router = Router();

import * as dataCtrl from "../controllers/data.controller";

router.post('/', dataCtrl.getDataByDates)

export default router;
