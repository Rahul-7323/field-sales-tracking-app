const HttpError = require('../utils/http-error');
const FieldAgent = require('../models/fieldAgent.model');

const newLocationHandler = async (fieldAgent_id, location) => {
  let fieldAgent;

  try {
    fieldAgent = await FieldAgent.findById(fieldAgent_id);
  }
  catch (err) {
    console.log(err);
    return;
  }

  fieldAgent.location = location;
  fieldAgent.locations.push(location);

  try {
    await fieldAgent.save();
  }
  catch (err) {
    console.log(err);
  }
}

module.exports = newLocationHandler;