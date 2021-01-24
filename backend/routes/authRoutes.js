const express = require('express');
const router = express.Router();
const AuthCtrl = require('../controllers/auth');


router.post('/register', AuthCtrl.CreateUser);
router.post('/login', AuthCtrl.LoginUser);
router.post('/req-reset-password', AuthCtrl.ResetPassword);
router.post('/new-password', AuthCtrl.NewPassword);
router.post('/valid-password-token', AuthCtrl.ValidPasswordToken);
router.get('/customer', AuthCtrl.GetUser);


module.exports = router;