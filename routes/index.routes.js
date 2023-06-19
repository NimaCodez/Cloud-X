const { Login, Register } = require('../controllers/auth.controller');
const { SaveUserData } = require('../middlewares/SaveUserData');
const { validationErrorMapper } = require('../middlewares/validationErrorMapper');
const { VerifyAccessToken } = require('../utils/AccessToken.service');
const { UploadFile } = require('../utils/uploadFile.service');
const { LoginValidator } = require('../validations/login.validation');
const { RegisterValidator } = require('../validations/register.validator');

const router = require('express').Router();

router.get('/', VerifyAccessToken, (req, res) => res.render('index', { isLoggedIn: req.isLoggedIn, user: req.user }));

router.get(
    '/login',
    VerifyAccessToken,
    (req, res, next) => {
        if (req.user) {
            SaveUserData(req, res, next),
            res.render('dash')
        }
        else next()
    },
    (req, res) => res.render('login')
);
router.post('/login', LoginValidator(), validationErrorMapper, Login);

router.get(
    '/register',
    VerifyAccessToken,
    (req, res) => {
        if (req.user) {
            return res.render('dash')
        }
        else next()
    },
    (req, res) => res.render('register'));
router.post('/register', RegisterValidator(), UploadFile.single('profile'), Register);

router.get('/dash', VerifyAccessToken, SaveUserData, (req, res) => res.render('dash', { user: req.user }));


module.exports = {
    AppRouter: router
}
