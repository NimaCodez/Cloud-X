const { Login, Register } = require('../controllers/auth.controller');
const { validationErrorMapper } = require('../middlewares/validationErrorMapper');
const { UploadFile } = require('../utils/uploadFile.service');
const { LoginValidator } = require('../validations/login.validation');
const { RegisterValidator } = require('../validations/register.validator');

const router = require('express').Router();

router.get('/', (req, res) => res.render('index', { isLoggedIn: false }));

router.get('/login', (req, res) => res.render('login'));
router.post('/login', LoginValidator(), validationErrorMapper, Login);

router.post('/register', RegisterValidator(), UploadFile.single('profile'), Register);

module.exports = {
    AppRouter: router
}
