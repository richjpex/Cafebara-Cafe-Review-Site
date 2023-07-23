import { Router } from "express";
import controller from '../controllers/controller.js'

const router = Router();

router.get(`/`, controller.getIndex);
router.get(`/about`, controller.getAbout);
router.get(`/cafe`, controller.getCafes);

//edit
export default router;