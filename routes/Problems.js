const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check');
const problemsController = require('../controller/Problems');

router.get('/',problemsController.get_all_problems);
router.post('/',checkAuth,problemsController.add_problem);
router.delete('/:problemId',checkAuth,problemsController.delete_problem);
router.put('/:problemId',checkAuth,problemsController.update_problem);

module.exports =router;
