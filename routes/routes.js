import { Router } from "express";
import controller from '../controllers/controller.js';
import bodyParser from 'body-parser';

const router = Router();

//BOILERPLATE
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

//GETS
router.get(`/`, controller.getIndex);
router.get(`/about`, controller.getAbout);
router.get(`/cafe`, controller.getCafes);
router.get(`/cafe/:cafeName`, controller.cafe);
router.get(`/register`, controller.getRegister);
router.get(`/login`, controller.getLogin);
router.get(`/myprofile`, controller.profile);
router.get(`/settings`, controller.settings);
// router.get(`/review`, controller.refreshCafe);

//Why is this a get
router.get(`/logout`, controller.logout);

//POSTS
router.post(`/login`, controller.loginAuth);
router.post(`/register_user`, controller.register_user);
router.post(`/register_owner`, controller.register_owner);
router.post('/addReview', controller.addReview);
// router.post(`/register_process`, controller.register_process);
// router.post('/regUser', controller.register_process);

//????????????
// router.post(`/login_success`, controller.logsucc);
router.post(`/cafe`, controller.searchcafes)

//DELETES
router.delete('/deleteReview', controller.deleteReview);

//UPDATES
router.put('/editReview', controller.editReview);


export default router;