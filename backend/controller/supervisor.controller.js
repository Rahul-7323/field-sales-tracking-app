const HttpError = require('../utils/http-error')
const { validationResult } = require('express-validator')

const Supervisor = require('../models/supervisor.model');

const getSupervisors = async (req, res, next) => {
  let supervisors;
  try {
    supervisors = await Supervisor.find();
  }
  catch (err) {
    const error = new HttpError('Something went wrong', 500);
    return next(error);
  }

  if (!supervisors || supervisors.length === 0) {
    const error = new HttpError('Could not find any supervisors', 404);
    return next(error);
  }

  res.json({ supervisors: supervisors.map(supervisor => supervisor.toObject({ getters: true })) });
};

const getSupervisorById = async (req, res, next) => {
  const supervisorId = req.params.supervisor_id;
  let supervisor;

  try {
    supervisor = await Supervisor.findById(supervisorId);
  }
  catch (err) {
    const error = new HttpError('Something went wrong', 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError('Could not find the supervisor', 404);
    return next(error);
  }

  res.json({ supervisor: supervisor.toObject() });
};

// creating an user
const createSupervisor = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new HttpError('Invalid inputs passed, please check your data', 422);
    return next(error);
  }

  const { name, email, password } = req.body;

  const createdSupervisor = new Supervisor({
    name,
    email,
    password
  });

  try {
    await createdSupervisor.save();
  }
  catch (err) {
    const error = new HttpError('Creating user failed.', 500)
    return next(error);
  }

  res.status(201).json({ supervisor: createdSupervisor.toObject({ getters: true }) });
};

exports.getSupervisors = getSupervisors;
exports.getSupervisorById = getSupervisorById;
exports.createSupervisor = createSupervisor;