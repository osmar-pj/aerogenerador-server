import { Router } from "express";
const router = Router();

import * as reportCtrl from "../controllers/report.controller";

router.get('/fecha/:parametro', reportCtrl.reportDay)
router.get('/initial', reportCtrl.initial)

export default router;
