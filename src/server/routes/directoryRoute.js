const router = require('express').Router();
const directoryController = require('../controllers/directoryController');

router.get('/', (req, res) => {
    res.send('API Directory working');
});

// ROUTES OF APIs
router.post('/newDirectory', directoryController.newDirectory);
router.get('/dirList', directoryController.directoryList);
router.put('/updateDir/:_id', directoryController.updateDir);
router.delete('/deleteDir/:_id', directoryController.deleteDir);

module.exports = router;