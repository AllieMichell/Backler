const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const handlerController = require('../config/handlerGenerator');
const middelware = require('../config/middelware');

router.get('/', (req, res) => {
  res.send('Hi API Tokens');
});
// ROUTES
// router.post('/newToken', handlerController.newToken);
router.post('/newToken', handlerController.newToken);
router.get('/tokensList', middelware.checkToken, handlerController.listTokens);
router.post('/tokensUser', handlerController.findName);
module.exports = router;
