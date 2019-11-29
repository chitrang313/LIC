const express = require('express');
const router = express.Router();
const userController = require('../controller/user');

router.post('/9913315574',userController.postUserForm);

module.exports = router;