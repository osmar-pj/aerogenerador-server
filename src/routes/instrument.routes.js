import { Router } from "express";
const router = Router();

import * as instrumentsCtrl from "../controllers/instrument.controller";
import { authJwt, verifySignup } from "../middlewares";

router.post(
  "/",
  instrumentsCtrl.createInstrument
)

export default router;