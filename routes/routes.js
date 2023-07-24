import { Router } from "express";
import controller from '../controllers/controller.js'

const router = Router();

router.get(`/`, controller.getIndex);
router.get(`/about`, controller.getAbout);
router.get(`/cafe`, controller.getCafes);
router.get(`/cafe/:cafeName`, controller.cafe);
router.get(`/login`, controller.login);
//router.get(`/register`, );
//edit

router.post('/addReview', controller.addReview);
export default router;