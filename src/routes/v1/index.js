const userController = require('../../controllers/user-controller.js');

const express = require('express');
const router = express.Router();

router.post('/signup', userController.create);
router.post('/signin', userController.signIn);
router.delete('/users/:id', userController.destroy);

module.exports = router;