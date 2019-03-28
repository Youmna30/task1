const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check');
const solutionsController = require('../Controller/Solutions');

router.get('/:problemId',solutionsController.get_all_solutions);
router.post('/',checkAuth,solutionsController.add_solution);
router.delete('/:solutionId',checkAuth,solutionsController.delete_solution);
router.put('/:solutionId',checkAuth,solutionsController.update_solution);

module.exports =router;
