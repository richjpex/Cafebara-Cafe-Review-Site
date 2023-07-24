import { Router } from "express";
import {controller, upload} from '../controllers/controller.js'

const router = Router();

router.get(`/`, controller.getIndex);
router.get('/home', controller.getIndexUser);
router.get(`/about`, controller.getAbout);
router.get(`/cafe`, controller.getCafes);

router.get(`/login`, controller.gotoLogin);
router.get(`/register`, controller.gotoRegister);
router.post(`/loginUser`, controller.loginUser);
router.post(`/registerUser`, controller.registerUser);

router.post(`/review`, controller.writeReview);

//edit
export default router;