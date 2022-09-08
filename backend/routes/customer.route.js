const express = require('express')
const router = express.Router();

const { getCustomers, createCustomer, getCustomerById } = require('../controller/customer.controller');

router.get('/', getCustomers);
router.get('/:customer_id', getCustomerById);
router.post('/', createCustomer);

module.exports = router;