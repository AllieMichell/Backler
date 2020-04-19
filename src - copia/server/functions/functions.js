const express = require('express');
const spawn = require('child_process').spawn;
const fs = require('fs');
const request = require('request');
const zipFolder = require('zip-a-folder');
const dotenv = require('dotenv').config();

const functions = {};
// FIND IN https://medium.com/@HolmesLaurence/integrating-node-and-python-6b8454bfc272

// FUNCTION TO EXECUTE A SCRIPT OF PYTHON AND DOING THE BACKUP OF ALL DATABASES
functions.execFile = async (req, res) => {
  const processTo = await spawn('python3', [`${process.env.EXEC_BACKUP}`]);
  await processTo.stdout.on('data', (data, err) => {
    if (err) {
      return res.status(400).json({
        status: false,
        message: 'Couldn´t run script',
        err
      });
    }
  });
};

// FUNCTION TO EXECUTE A SCRIPT OF PYTHON AND DOING THE BACKUP OF DATABASES BY NAME
functions.execFileName = (req, res) => {
  const projectName = req.body.projectName;
  const processTo = spawn('python3', [`${process.env.EXEC_BYNAME}`, projectName]);
  processTo.stdout.on('data', (data) => {
    if (!data) {
      res.status(400).json({
        status: false,
        message: `Couldn´t backup the project ${projectName}`
      });
    }
    // res.send(data.toString());
    const Data = data.toString();
    res.status(200).json({
      status: true,
      message: `Success backup the project ${projectName}`
    });
  });
};

// FUNCTION TO EXECUTE A SCRIPT OF PYTHON AND DOING THE BACKUP OF DATABASES BY ID
functions.execFileId = (req, res) => {
  const projectId = req.params.projectId;
  const processTo = spawn('python3', [`${process.env.EXEC_BYID}`, projectId]);
  processTo.stdout.on('data', (data) => {
    if (!data) {
      res.status(400).json({
        status: false,
        message: `Couldn´t backup the project with the id ${projectId}`
      });
    }
    const Data = res.send(data.toString());
    res.status(200).json({
      status: true,
      message: `Success backup the project with the id ${projectId}`
    });
  });
};

// FUNCTION TO EXECUTE A TEST CONECTION DATABASE
functions.testConnection = (req, res) => {
  const _id = req.params._id;
  const processTo = spawn('python3', [`${process.env.EXEC_TEST}`, _id]);
  processTo.stdout.on('data', (data) => {
    if(!data){
      res.status(400).json({
        status: false,
        message: `Couldn´t test connection with the id ${_id}`
      });
    }
    var values = data.toString()
    res.send(values)
  })
}

functions.donwloadProject = (req, res) => {
  const projectName = req.body.projectName;
  // console.log(projectName);
  request(`http://${process.env.IP_API}/backler/api/projects/nameP/${projectName}`, (err, response, Projects) => {
    const json = (JSON.parse(Projects));
    const path = (json.Projects.localPath);
    const typeP = (json.Projects.dbType);
    // FUNCTIONS SECTIONS
    function downloadZIP() {
      res.download(`${path}/latest.zip`, (err) => {
        if (err) {
          return res.status(400).json({
            status: false,
            message: 'Couldn´t download file',
            err
          });
        }
      });
    }
    function donwloadFile() {
      return res.download(`${path}/latest.sql`, (err) => {
        if (err) {
          return res.status(400).json({
            status: false,
            message: 'Couldn´t download file',
            err
          });
        }
      });
    }
    async function ZipProject(err) {
      if (err) {
        console.log('Couldn´t zipped folder');
      }
      await zipFolder.zip(`${path}/latest`, `${path}/latest.zip`);
      downloadZIP();
    }
    async function deleteZip() {
      await fs.unlink(`${path}/latest.zip`, (err) => {
        if (err) {
          console.log('Error dont delete the file');
        }
        console.log('Successfully delete the file');
      });
    }
    if (err) {
      return res.status(400).json({
        status: false,
        message: 'Couldn´t read json url'
      });
    }
    switch (typeP) {
      case 'mongodb':
        console.log('Download file and zipped');
        ZipProject();
        deleteZip(); // PUEDE SER DE ESTA FORMA O DE LA SIGUIENTE
        // ZipProject(deleteZip()); // O PUEDE EMPLEARSE DE LA SIGUIENTE MANERA
        break;
      case 'mysql':
        donwloadFile();
        break;
      case 'jenkins':
        downloadZIP();
        break;
      default:
        console.log('Existe un error, tipo de proyecto no encontrado');
        break;
    }
  });
};

functions.donwloadProjectId = (req, res) => {
  const _id = req.params._id;
  // console.log(projectName);
  request(`http://${process.env.IP_API}/backler/api/projects/project/${_id}`, (err, response, Projects) => {
    const json = (JSON.parse(Projects));
    const path = (json.Projects.localPath);
    const typeP = (json.Projects.dbType);
    // FUNCTIONS SECTIONS
    function downloadZIP() {
      res.download(`${path}/latest.zip`, (err) => {
        if (err) {
          return res.status(400).json({
            status: false,
            message: 'Couldn´t download file',
            err
          });
        }
      });
    }
    function donwloadFile() {
      return res.download(`${path}/latest.sql`, (err) => {
        if (err) {
          return res.status(400).json({
            status: false,
            message: 'Couldn´t download file',
            err
          });
        }
      });
    }
    async function ZipProject(err) {
      if (err) {
        console.log('Couldn´t zipped folder');
      }
      await zipFolder.zip(`${path}/latest`, `${path}/latest.zip`);
      downloadZIP();
    }
    async function deleteZip() {
      await fs.unlink(`${path}/latest.zip`, (err) => {
        if (err) {
          console.log('Error dont delete the file');
        }
        console.log('Successfully delete the file');
      });
    }
    if (err) {
      return res.status(400).json({
        status: false,
        message: 'Couldn´t read json url'
      });
    }
    switch (typeP) {
      case 'mongodb':
        console.log('Download file and zipped');
        ZipProject();
        deleteZip(); // PUEDE SER DE ESTA FORMA O DE LA SIGUIENTE
        // ZipProject(deleteZip()); // O PUEDE EMPLEARSE DE LA SIGUIENTE MANERA
        break;
      case 'mysql':
        donwloadFile();
        break;
      case 'jenkins':
        downloadZIP();
        break;
      default:
        console.log('Existe un error, tipo de proyecto no encontrado');
        break;
    }
  });
};

functions.donwloadProjectsLogs = (req, res) => {
  var _id = req.params._id
  request(`http://${process.env.IP_API}/backler/api/logs/logsName/Buckler`, (err, response, Projects) => {
    const json = (JSON.parse(Projects));
    res.send(json)
  })
}
module.exports = functions;
