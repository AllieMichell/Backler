const router = require('express').Router();
const functions = require('../functions/functions');
const middelware = require('../config/middelware');

// GET HOME
router.get('/', (req, res) => {
  res.send('Hi API Functions');
});

router.get('/runScript', functions.execFile);
router.get('/runbyId/:projectId', functions.execFileId); // CAN NOT SET HEADERS AFTER SENT THE CLIENT
router.get('/testConnection/:_id', functions.testConnection);
router.post('/runbyName', middelware.checkToken, functions.execFileName);
router.post('/downloadProject', middelware.checkToken, functions.donwloadProject);
router.get('/downloadProjectID/:_id', functions.donwloadProjectId);
router.get('/donwload/:_id', functions.donwloadProjectsLogs);

module.exports = router;
