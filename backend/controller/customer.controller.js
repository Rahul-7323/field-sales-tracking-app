const HttpError = require('../utils/http-error')
const { validationResult } = require('express-validator')

const Customer = require('../models/customer.model');

const getCustomers = async (req, res, next) => {
  let customers;

  try {
    customers = await Customer.find();
  }
  catch (err) {
    const error = new HttpError('Something went wrong', 500);
    return next(error);
  }

  if (!customers || customers.length === 0) {
    const error = new HttpError('Could not find any customers', 404);
    return next(error);
  }

  res.json({ customers: customers.map(customer => customer.toObject({ getters: true })) });
}

const getCustomerById = async (req, res, next) => {
  const customerId = req.params.customer_id;
  let customer;

  try {
    customer = await Customer.findById(customerId);
  }
  catch (err) {
    const error = new HttpError('Something went wrong', 500);
    return next(error);
  }

  if (!customer) {
    const error = new HttpError('Could not find the customer');
    return next(error);
  }

  res.json({ customer: customer.toObject() });
}

const createCustomer = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new HttpError('Invalid inputs passed, please check your data', 422);
    return next(error);
  }

  const { name, email, password, phoneNumber, address, location } = req.body;

  const createdCustomer = new Customer({
    name,
    email,
    password,
    phoneNumber,
    address,
    location
  });

  try {
    await createdCustomer.save();
  }
  catch (err) {
    const error = new HttpError('Creating new customer failed.', 500);
    return next(error);
  }

  res.status(201).json({ user: createdCustomer.toObject({ getters: true }) });
}

exports.getCustomers = getCustomers;
exports.getCustomerById = getCustomerById;
exports.createCustomer = createCustomer;