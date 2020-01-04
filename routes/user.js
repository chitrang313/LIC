const express = require('express');
const router = express.Router();
const userController = require('../controller/user');

router.get('/',userController.home);
router.post('/9913315574',userController.postUserForm);

module.exports = router;