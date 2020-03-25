const mongoose = require('mongoose');

const ProjectsSchema = new mongoose.Schema(
  {
    serverName: {
      type: String
    },
    serverHost: {
      type: String
    },
    serverPort: {
      type: Number
    },
    serverPassword: {
      type: String
    },
    sshConnection: {
      type: Boolean
    },
    sshPath: {
      type: String
    },
    remotePath: {
      type: String
    },
    localPath: {
      type: String
    },
    dbIp: {
      type: String
    },
    dbType: {
      type: String
    },
    dbPort: {
      type: Number
    },
    dbUser: {
      type: String
    },
    dbPassword: {
      type: String
    },
    dbName: {
      type: String
    },
    dbStatus: {
      type: String
    },
    dbTime: {
      type: Date,
      default: Date.now
    },
    projectName: {
      type: String
    }
  },
  {
    collection: 'projects'
  }
);

const Projects = mongoose.model('projects', ProjectsSchema);
module.exports = Projects;
