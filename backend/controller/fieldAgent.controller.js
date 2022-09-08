const HttpError = require('../utils/http-error');
const { validationResult } = require('express-validator')

const FieldAgent = require('../models/fieldAgent.model')

const getFieldAgents = async (req, res, next) => {
  let fieldAgents;

  try {
    fieldAgents = await FieldAgent.find();
  }
  catch (err) {
    const error = new HttpError('Something went wrong', 500);
    return next(error);
  }

  if (!fieldAgents || fieldAgents.length === 0) {
    const error = new HttpError('Could not find any fieldAgents', 404);
    return next(error);
  }

  res.json({ fieldAgents: fieldAgents.map(fieldAgent => fieldAgent.toObject({ getters: true })) });
};

const getFieldAgentById = async (req, res, next) => {
  const fieldAgentId = req.params.fieldAgent_id;
  let fieldAgent;

  try {
    fieldAgent = await FieldAgent.findById(fieldAgentId);
  }
  catch (err) {
    const error = new HttpError('Something went wrong', 500);
    return next(error);
  }

  if (!fieldAgent) {
    const error = new HttpError('Could not find the fieldAgent', 404);
    return next(error);
  }

  res.json({ fieldAgent: fieldAgent.toObject() });
};

const createFieldAgent = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new HttpError('Invalid inputs passed, please check your data', 422);
    return next(error);
  }

  const { name, email, password, phoneNumber, location } = req.body;

  const createdFieldAgent = new FieldAgent({
    name,
    email,
    password,
    phoneNumber,
    location
  });

  try {
    await createdFieldAgent.save();
  }
  catch (err) {
    const error = new HttpError('Creating field agent failed', 500);
    console.log(error);
    return next(error);
  }

  res.status(201).json({ fieldAgent: createdFieldAgent.toObject({ getters: true }) });
};

exports.getFieldAgents = getFieldAgents;
exports.getFieldAgentById = getFieldAgentById;
exports.createFieldAgent = createFieldAgent;