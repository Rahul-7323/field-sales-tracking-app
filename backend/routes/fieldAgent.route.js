const express = require('express');
const router = express.Router();

const { getFieldAgents, getFieldAgentById, createFieldAgent } = require('../controller/fieldAgent.controller');

router.get('/', getFieldAgents);
router.get('/:fieldAgent_id', getFieldAgentById);
router.post('/', createFieldAgent);

module.exports = router;