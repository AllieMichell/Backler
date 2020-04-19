const router = require('express').Router();
const projectController = require('../controllers/projectsCotroller');

router.get('/', (req, res) => {
  res.send('Hi API Logs');
});
// ROUTES
router.post('/newProject', projectController.newProjects);
router.get('/projectsList', projectController.listProjects);
router.get('/project/:id', projectController.findOne);
router.get('/nameP/:projectName', projectController.findName);
router.put('/updateProject/:_id', projectController.updateProjects);
router.delete('/deleteProject', projectController.deleteProjects);

module.exports = router;
