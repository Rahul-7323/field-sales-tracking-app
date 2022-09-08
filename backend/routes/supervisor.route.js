const express = require('express');
const router = express.Router();

const { getSupervisors, getSupervisorById, createSupervisor } = require('../controller/supervisor.controller');

router.get('/', getSupervisors);
router.get('/:supervisor_id', getSupervisorById);
router.post('/', createSupervisor);

module.exports = router;