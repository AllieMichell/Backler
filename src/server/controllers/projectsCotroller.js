const projectsModel = require('../models/projects');

const projectsController = {};
// Projects CRUD
/** @Add new project -->CREATE */
projectsController.newProjects = (req, res) => {
  const newProject = new projectsModel({
    serverName: req.body.serverName,
    serverHost: req.body.serverHost,
    serverPort: req.body.serverPort,
    serverPassword: req.body.serverPassword,
    sshConnection: req.body.sshConnection,
    sshPath: req.body.sshPath,
    remotePath: req.body.remotePath,
    localPath: req.body.localPath,
    dbIp: req.body.dbIp,
    dbType: req.body.dbType,
    dbPort: req.body.dbPort,
    dbUser: req.body.dbUser,
    dbPassword: req.body.dbPassword,
    dbName: req.body.dbName,
    dbStatus: req.body.dbStatus,
    dbTime: req.body.dbTime,
    projectName: req.body.projectName
  });
  newProject.save((err, Project) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: 'Couldn´t save new project'
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Successfully save new project',
      Project
    });
  });
};
/** @All Projects List -->READ */
projectsController.listProjects = (req, res) => {
  projectsModel.find({}).sort({ _id: -1 }).exec((err, Projects) => {
    if (err) {
      res.send(err);
    } else {
      res.send(Projects);
    }
  });
};
/** @Find by id -->READ */
projectsController.findOne = (req, res) => {
  projectsModel.findById(req.params.id).exec((err, Projects) => {
    if (err) {
      console.log(err);
      res.status(400).json({
        sucess: false,
        message: 'Couldn´t find data by id',
        err
      });
    } else {
      res.status(200).json({
        status: true,
        message: 'Successfully find data by id',
        Projects
      });
    }
  });
};
/** @Find by name -->READ */
projectsController.findName = (req, res) => {
  projectsModel
    .findOne({ projectName: req.params.projectName })
    .exec((err, Projects) => {
      if (err) {
        console.log(err);
        res.status(400).json({
          sucess: false,
          message: 'Couldn´t find data by name',
          err
        });
      } else {
        res.status(200).json({
          status: true,
          message: 'Successfully find data by name',
          Projects
        });
      }
    });
};
/** @Update project by ID --> UPDATE */
projectsController.updateProjects = (req, res) => {
  const updateProject = {
    serverName: req.body.serverName,
    serverHost: req.body.serverHost,
    serverPort: req.body.serverPort,
    serverPassword: req.body.serverPassword,
    sshConnection: req.body.sshConnection,
    sshPath: req.body.sshPath,
    remotePath: req.body.remotePath,
    localPath: req.body.localPath,
    dbIp: req.body.dbIp,
    dbType: req.body.dbType,
    dbPort: req.body.dbPort,
    dbUser: req.body.dbUser,
    dbPassword: req.body.dbPassword,
    dbName: req.body.dbName,
    dbStatus: req.body.dbStatus,
    dbTime: req.body.dbTime,
    projectName: req.body.projectName
  };
  projectsModel.updateOne({ _id: req.params._id }, updateProject, (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: 'Couldn´t update this project'
      });
    }
    return res.status(200).json({
      status: true,
      message: 'Successfully update this project'
    });
  });
};

/** @Delete project by ID --> DELETE */
projectsController.deleteProjects = (req, res) => {
  const id = req.params._id;
  projectsModel.remove({ _id: id }, (err) => {
    if (err) {
      return res.status(400).json({
        status: false,
        message: 'Couldn´t remove this project'
      });
    }
    return res.status(200).json({
      status: true,
      message: 'Successfully remove this project'
    });
  });
};
module.exports = projectsController;
