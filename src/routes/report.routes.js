import { Router } from "express";
const router = Router();

import * as reportCtrl from "../controllers/report.controller";

router.get('/:parametro', reportCtrl.reportDay)

export default router;
