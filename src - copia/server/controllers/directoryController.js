const fs = require('fs');
const directoryModel = require('../models/directory');

var directoryController = {};

/**@CREATE_NEW_DIRECTORY */
directoryController.newDirectory = (req, res) => {
    const directoryPath = req.body.directoryPath;
    const newDir = new directoryModel(
        {
            directoryPath : req.body.directoryPath,
            projects: req.body.projects
        }
    );
    function saveDirectory(newDir){
        newDir.save((err, Directory) => {
            if(err){
                return res.status(400).json({
                    status: false, 
                    message: 'Couldn´t save the directory path',
                    err
                });
            } else {
                return res.status(200).json({
                    status: true,
                    message: 'Successfully save the directory path',
                    Directory
                });
            }
        })
    }

    if(fs.existsSync(directoryPath)){
        saveDirectory(newDir);
    } else {
        fs.mkdir(directoryPath, {recursive: true}, (err) => {
            if(err){
                return res.send('No se logro crear el directorio'); 
            } else {
                saveDirectory(newDir);
            }
        })
    }
}
/**@READ_DIRECTORY */
directoryController.directoryList = (req, res) => {
    directoryModel.find({}).populate('projects').exec((err, Directory) => {
        if(err){
            return res.status(400).json({
                status: false, 
                message: 'Couldn´t get Directory list',
                err
            })
        } else {
            return res.send(Directory)
        }
    })
}
/**@UPDATE_DIRECTORY */
directoryController.updateDir = (req, res) => {
    const  directoryPath = req.body.directoryPath
    const _id = req.params._id
    const updateDIR = {
        directoryPath : req.body.directoryPath
        // projects: req.body.projects
    }; 
    function updateDirectory(_id, updateDIR){
        directoryModel.updateOne({ _id }, updateDIR, (err) => {
            if(err) {
                return res.status(400).json({
                    status: false, 
                    message: 'Couldn´t update the Directory',
                    err
                })
            } else {
                return res.status(200).json({
                    status: true, 
                    message: 'Successfully update the Directory'
                })
            }
        })
    };
    if(fs.existsSync(directoryPath)){
        updateDirectory(_id, updateDIR);
    } else {
        fs.mkdir(directoryPath, {recursive: true}, (err) => {
            if(err){
                return res.send('No se logreo crear el directorio');
            } else {
                updateDirectory(_id, updateDIR);
            }
        })
    }
}
/**@DELETE_DIRECTORY */
directoryController.deleteDir = (req, res) => {
    directoryModel.remove({ _id:req.params._id }, (err) => {
        if(err){
            return res.status(400).json({
                status: false, 
                message: 'Couldn´t delete the Directory'
            })
        } else {
            return res.status(200).json({
                status: true,
                message: 'Successfully delete the Directory'
            })
        }
    })
}
module.exports = directoryController; 