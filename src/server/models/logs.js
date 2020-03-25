const mongoose = require('mongoose');

const LogsSchema = new mongoose.Schema(
  {
    nameProject: {
      type: String
    },
    typeFile: {
      type: String
    },
    hour: {
      type: String
    },
    ip: {
      type: String
    },
    status: {
      type: String
    },
    pathLocation: {
      type: String
    },
    message: {
      type: String
    },
    method: {
      type: String
    }
  },
  {
    collection: 'logs'
  }
);

const Logs = mongoose.model('logs', LogsSchema);
module.exports = Logs;
