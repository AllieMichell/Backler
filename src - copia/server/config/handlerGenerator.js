const jwt = require('jsonwebtoken');
const config = require('./config');
const tokensModel = require('../models/tokens');

const authController = {};

/** @Generate Token */
authController.newToken = (req, res) => {
  const projectName = req.body.projectName;
  const user = req.body.user;
  if (projectName && user) {
    if (projectName != '' && user != '') {
      const token = jwt.sign({ projectName }, config.secret, { expiresIn: '30d' });
      const newToken = new tokensModel({
        projectName: req.body.projectName,
        user: req.body.user,
        token
      });
      newToken.save((err, Token) => {
        if (err) {
          res.status(400).json({
            status: false,
            message: 'Couldn´t save new token'
          });
        } else {
          res.status(200).json({
            status: true,
            message: 'Successfull authentication',
            // token,
            Token
          });
        }
      });
    } else {
      res.status(403).json({
        status: false,
        message: 'Username or Project Name are incorrect'
      });
    }
  }
};

/** @Get Token List */
authController.listTokens = (req, res) => {
  tokensModel.find({}).exec((err, Tokens) => {
    if (err) {
      res.status(400).json({
        status: false, 
        message: 'Coudln´t get data',
        err
      })
    } else {
      res.status(200).json({ Tokens });
    }
  })
};

/** @Get Token by name of Employee */ // ---> NO FUNCIONA
authController.findName = (req, res) => {
  const user = req.params.user
  tokensModel.findOne({ user }).exec((err, Tokens) => {
    if (err) {
      res.status(400).json({
        status: false,
        message: 'Couldn´t find token by name',
        err
      });
    } else {
      res.status(200).json({
        Tokens
      });
    }
  });
};

module.exports = authController;
