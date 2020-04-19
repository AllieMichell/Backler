const mongoose =  require('mongoose'); 

const directorySchema = new mongoose.Schema(
    {
        directoryPath : {
            type: String, 
            required: true
        },
        projects: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'projects'
        }]
    }, 
    {
        collection: 'directory'
    }
); 

const Directory = mongoose.model('directory', directorySchema); 
module.exports = Directory;