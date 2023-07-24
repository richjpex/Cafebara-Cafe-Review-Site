import { Router } from "express";
import controller from '../controllers/controller.js';
import bodyParser from 'body-parser';

const router = Router();

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

router.use(bodyParser.urlencoded({ extended: true }));
router.get(`/`, controller.getIndex);
router.get(`/about`, controller.getAbout);
router.get(`/cafe`, controller.getCafes);
router.get(`/cafe/:cafeName`, controller.cafe);
router.get(`/login`, controller.login);
router.post(`/login_success`, controller.logsucc);
router.get(`/logout`, controller.logout);
router.get(`/register`, controller.register);
//edit
router.get(`/review`, controller.refreshCafe);
router.post('/register_process', controller.register_process);

router.post('/addReview', controller.addReview);
export default router;