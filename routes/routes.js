import { Router } from "express";
import controller from '../controllers/controller.js'

const router = Router();

router.get(`/`, controller.getIndex);
router.get(`/`, controller.getAbout);
router.get(`/`, controller.getReview);

//edit


export default router;