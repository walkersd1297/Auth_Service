const userController = require('../../controllers/user-controller.js');

const express = require('express');
const { AuthRequestValidator } = require('../../middlewares/index.js');
const router = express.Router();

router.post('/signup',AuthRequestValidator.validateUserSignup, userController.create);
router.post('/signin',AuthRequestValidator.validateUserSignup, userController.signIn);
router.delete('/users/:id', userController.destroy);

module.exports = router;