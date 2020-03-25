const mongoose = require('mongoose');

const ADSChema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    url: {
      type: String
    },
    username: {
      type: String
    },
    password: {
      type: String
    },
    domain: {
      type: String
    }
  },
  {
    collection: 'activeD'
  }
);

const ActiveD = mongoose.model('activeD', ADSChema);
module.exports = ActiveD;
