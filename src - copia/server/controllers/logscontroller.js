const logsModel = require('../models/logs');

const logsController = {};
// LOGS CRUD
/** @Add new log --> CREATE */
logsController.newLog = (req, res) => {
  const newLogs = new logsModel({
    nameProject: req.body.nameProject,
    typeFile: req.body.typeFile,
    hour: req.body.hour,
    ip: req.body.ip,
    status: req.body.status,
    pathLocation: req.body.pathLocation,
    message: req.body.message,
    method: req.body.method
  });
  newLogs.save((err, logs) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: 'Couldn´t save logs in database'
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Successfully save logs in database'
    });
  });
};
/** @All Logs List -->READ */
logsController.listLogs = (req, res) => {
  logsModel.find({}).sort({ _id: -1 }).exec((err, Logs) => {
    if (err) {
      return res.status(400).json({
        status: false,
        message: 'Couldn´t show data',
        err
      });
    }
    return res.status(200).json({
      status: true,
      message: 'Successfully show data',
      Logs
    });
  });
};
/** @List of last Logs -->READ */
logsController.getLogs = (req, res) => {
  const rangeStart = parseInt(req.query.start);
  const term = req.query.filtername;
  if (term === undefined) {
    logsModel.find({}).sort({ _id: -1 }).skip(rangeStart).limit(11)
      .exec((err, Logs) => {
        if (err) {
          res.stauts(200).json({
            status: false,
            message: 'Couldn´t show data',
            err
          });
        } else {
          res.status(200).json({
            status: true,
            message: 'Successfully show data',
            Logs
          });
        }
      });
  } else {
    logsModel.find({
      nameProject: { $regex: `.*${term}.*`, $option: '$i' }
    }).sort({ _id: -1 }).skip(rangeStart).limit(9)
      .exec((err, Logs) => {
        if (err) {
          res.status(200).json({
            stauts: false,
            message: 'Couldn´t show data',
            err
          });
        } else {
          res.stauts(200).json({
            status: true,
            message: 'Successfully show data',
            Logs
          });
        }
      });
  }
};
/** @Show the last backup -->READ */
logsController.getLast_Logs = (req, res) => {
  const rangeStart = parseInt(req.query.start);
  const term = req.query.filtername;
  if (term === undefined) {
    logsModel.find({}).sort({ _id: -1 }).skip(rangeStart).limit(3)
      .exec((err, Logs) => {
        if (err) {
          res.stauts(200).json({
            status: false,
            message: 'Couldn´t show data',
            err
          });
        } else {
          res.status(200).json({
            status: true,
            message: 'Successfully show data',
            Logs
          });
        }
      });
  } else {
    logsModel.find({
      nameProject: { $regex: `.*${term}.*`, $option: '$i' }
    }).sort({ _id: -1 }).skip(rangeStart).limit(9)
      .exec((err, Logs) => {
        if (err) {
          res.status(200).json({
            stauts: false,
            message: 'Couldn´t show data',
            err
          });
        } else {
          res.send(Logs)
        }
      });
  }
};
/** @Update Log by ID -->UPDATE */
logsController.updateLog = (req, res) => {
  const updateLogs = {
    nameProject: req.body.nameProject,
    typeFile: req.body.typeFile,
    hour: req.body.hour,
    ip: req.body.ip,
    status: req.body.status,
    pathLocal: req.body.pathLocal,
    message: req.body.message,
    method: req.body.method
  };
  logsModel.updateOne({ _id: req.body._id }, updateLogs, (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: "Couldn't update this data"
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Successfully update this data'
    });
  });
};
/** @Delete Logs by ID -->DELETE */
logsController.deleteLog = (req, res) => {
  const id = req.params._id;
  logsModel.deleteOne({ _id: id }, (err) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        success: false,
        message: 'Couldn´t remove this data'
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Successfully remove this data'
    });
  });
};
/**@FIND_ALL_LOGS_PROJECT */
logsController.findlogsname = (req, res) => {
  const projectName = req.params.projectName;
  logsModel.find({projectName:projectName}).sort({ _id: -1}).exec((err, Logs) => {
    if(err){
      return res.send(err)
    }
    return res.send(Logs)
  })
}
module.exports = logsController;
