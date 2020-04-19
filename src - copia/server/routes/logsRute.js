const router = require('express').Router();
const logsController = require('../controllers/logscontroller');

// GET HOME
// eslint-disable-next-line func-names
router.get('/', (req, res) => {
  res.send('Hi API Logs');
});

// ROUTES
router.post('/newLogs', logsController.newLog);
router.get('/logsList', logsController.listLogs);
router.get('/getLogs', logsController.getLogs);
router.get('/getLatest', logsController.getLast_Logs);
router.put('/updateLogs', logsController.updateLog);
router.delete('/deleteLogs', logsController.deleteLog);

//SPECIAL RUTES
router.get('/logsName/:projectName', logsController.findlogsname);

module.exports = router;
