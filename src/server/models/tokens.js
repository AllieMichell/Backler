const mongoose = require('mongoose');

const tokensSchema = new mongoose.Schema(
  {
    projectName: {
      type: String
    },
    user: {
      type: String
    },
    token: {
      type: String
    }
  },
  {
    collection: 'tokens'
  }
);

const Tokens = mongoose.model('tokens', tokensSchema);
module.exports = Tokens;
