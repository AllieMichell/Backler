import React, { Component } from 'react';
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  TextField,
  Typography,
  Button,
  Avatar,
  Divider,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Dialog,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormControlLabel,
  SnackbarContent,
  IconButton,
   CircularProgress 
} from '@material-ui/core';
import {
  GetApp as GetAppIcon,
  Close as CloseIcon,
  Edit as EditIcon,
  SaveAlt as SaveAltIcon,
  CheckCircle as SuccessIcon,
  Error as ErrorIcon, 
  Cast as Connection
} from '@material-ui/icons';
import { withStyles, Link } from '@material-ui/core/styles';
import { green, amber } from '@material-ui/core/colors';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import InlineEdit from 'react-edit-inplace';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { useBeforeunload } from 'react-beforeunload'
import{Prompt} from 'react-router-dom'
import Lottie from 'react-lottie'
import Backup from './back.json';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import treePoints from './treePoints.json';
import SettingsInputAntennaIcon from '@material-ui/icons/SettingsInputAntenna';
import Tooltip from '@material-ui/core/Tooltip';
import Fade from '@material-ui/core/Fade';
import Zoom from '@material-ui/core/Zoom';






const defaultOptions = {
  loop : true,
  autoplay: true,
  rendererSettings:{
      preserveAspectRatio: 'xMidYMid slice'
  }
}
// Styles CSS
import './individualInfo.css';
import  './pagination.css'
//Components
import LogsTable from './logs-table';
import Loading from '../loading/loading';

const styles = theme => ({
  button: {
    backgroundColor: '#00695c',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#00453D',
    },
    paddingLeft:10,
    paddingRight:10,
    paddingTop:5,
    paddingBottom:5,
    padding:5,
    margin:10,
    fontSize:15
  },
  icons:{
    fontSize:25
  },
  closeButton:{
    color:'#FFFF',
 backgroundColor:'#ff1744',
 '&:hover':{
   backgroundColor:'#d50000'
 }
  },
  Test:{
    fontSize: 15,
    color:'white',
    display:'flex',
    alignItems:'center'
  },

  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

const variantIcon = {
  success: SuccessIcon,
  error: ErrorIcon
}

const styles1 = theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  }, 
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex', 
    alignItems: 'center',
  },
});

function MySnackbarContent(props){
  const {
    classes, className, message, onClose, varian, ...other
  } = props;
  const Icon = variantIcon[variant];
  return (
    <SnackbarContent 
    className ={classNames(classes[variant], className)}
    aria-describedby = "client-snackbar"
    message={(
      <span id="client-snackbar" className={classes.message}>
        <Icon className={classNames(classes.icon, classes.iconVariant)} />
        {message}
      </span>
    )}
    action={[
      <IconButton
        key="close"
        aria-label="Close"
        color="inherit"
        className={classes.close}
        onClick={onClose}
      >
        <CloseIcon className={classes.icon} />
      </IconButton>,
    ]}
    {...other}
    />
  );
}

MySnackbarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  varian: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};


class IndividualBackup extends Component {
  constructor(props) {
    super(props);
    this.editHandle = this.editHandle.bind(this);
    this.closeHandle=this.closeHandle.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.saveEditHandle=this.saveEditHandle.bind(this);
    this.testConnection = this.testConnection.bind(this);
    this.closeHandler = this.closeHandler.bind(this);
    const idproject = props.match.params.idproject;
    this.state = {
      dbIp: '',
      dbName: '',
      dbPassword: '',
      dbPort: '',
      dbStatus: '',
      dbTime: '',
      dbType: '',
      dbUser: '',
      localPath: '',
      remotePath: '',
      serverHost: '',
      serverName: '',
      serverPassword: '',
      serverPort: 0,
      sshConection: true,
      sshPath: '',
      project_Id: '',
      projectName:'',
      edit: true,
      open:false,
      dbType2:'',
      isLoading: false,
      error: false,
      test: false,
      testing:false,
      testMessage:'',
      success:false,
      connection: false,
      upload:false,
      backuping: false,
      warning: false,
      finishBackup:false

    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const idproject = this.props.match.params.idproject;
    fetch(`http://${process.env.IP_API}/backler/api/projects/project/${idproject}`)
    // fetch(`http://localhost:3100/Buckler/api/projects/project/${idproject}`)
      .then(response => response.json())
      .then((project) => {
        
        if (project.status) {
          
          this.setState(() => ({
            project_Id: project.Projects._id,
            dbIp: project.Projects.dbIp,
            dbName: project.Projects.dbName,
            dbPassword: project.Projects.dbPassword,
            dbPort: project.Projects.dbPort,
            dbStatus: project.Projects.dbStatus,
            dbTime: project.Projects.dbTime,
            dbType: project.Projects.dbType,
            dbUser: project.Projects.dbUser,
            localPath: project.Projects.localPath,
            remotePath: project.Projects.remotePath,
            serverHost: project.Projects.serverHost,
            serverName: project.Projects.serverName,
            serverPassword: project.Projects.serverPassword,
            serverPort: project.Projects.serverPort,
            sshConection: project.Projects.sshConnection,
            sshPath: project.Projects.sshPath,
            projectName: project.Projects.projectName,
            dbType2: project.Projects.dbType
          }));
        } else {
  
         
        }
         
      });
    
  }

  editHandle(){
    const {edit} =this.state;
   
    this.setState({
      edit:!edit
    })
    this.handleClose();

  }
  closeHandle(){
    const {edit} =this.state;
    this.setState({
      edit:!edit
    })

    this.componentDidMount();

  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value
    });
    event.preventDefault()

  }

  saveEditHandle(e){
    axios.put(`http://${process.env.IP_API}/backler/api/projects/updateProject/${this.state.project_Id}`, {
    _id: this.state.project_Id,
    dbType:this.state.dbType2,
    dbIp:this.state.dbIp,
    dbName:this.state.dbName,
    dbPassword:this.state.dbPassword,
    dbPort:this.state.dbPort,
    dbStatus:this.state.dbStatus,
    dbTime:this.state.dbTime,
    dbUser:this.state.dbUser,
    localPath:this.state.localPath,
    remotePath:this.state.remotePath,
    serverHost:this.state.serverHost,
    serverName:this.state.serverName,
    serverPassword:this.state.serverPassword,
    serverPort:this.state.serverPort,
    sshConnection:this.state.sshConection,
    sshPath: this.state.sshPath,
    projectName:this.state.projectName,
    
    })
    .then(res => {
      
    })
    this.closeHandle();
    location.reload();

    e.preventDefault();

  }
  handleSubmit(event) {
    const { backuping } = this.state;
    this.setState({
        backuping: !backuping
    })
    event.preventDefault();
    const project = {
      projectId: this.state.project_Id,
    };
   const idproject = this.state.project_Id;
    axios.get(`http://${process.env.IP_API}/backler/api/functions/runbyId/${idproject}`)
    .then( res => {
      this.setState({
        backuping:false,
        finishBackup:true
      })
    })
      
  }
  handleClose(){
    const {open} = this.state
    this.setState({
      open:!open
    })
  }
  handleOpen(){
    const {open} = this.state
    this.setState({
      open:true
    })
  }

  // testConnectionProject(){
  //   console.log('entro al proceso')
  //   const idproject = this.props.match.params.idproject;
  //   this.timer = setInterval(
  //     () => this.setState(prevState => ({ isLoading: !prevState.test})),
  //     10000,
  //   );
  //   fetch(`http://${process.env.IP_API}/buckler/api/functions/testConnection/${idproject}`)
  //   .then(response => response.json())
  //   .then((json) => {
  //     console.log(json);
  //     this.setState({
  //       result: json.message
  //     })
  //   })
  //   console.log('salio del proceso')
  // }

  testConnection(){
    const { testing } = this.state;
    const { warning } = this.state;
    this.setState({
      testing: !testing
    })
     const idproject = this.props.match.params.idproject;
    axios.get(`http://${process.env.IP_API}/backler/api/functions/testConnection/${idproject}`)
    .then(res => {
     
      if(res.data == "Success Connection\n" || "Success connection\n"){
        this.setState({
          connection: true
        })
      }
      this.setState({
        testing:false,
        testMessaqge: res.data,
      })
      this.setState({
        success: true
      })
     
    })

    setTimeout(function(){ this.setState({
      warning:!warning
    })}, 10000);
    
  }
  //=======SNACKBAR====//

  closeHandler(){
    this.setState({
      success: false,
      connection:false,
      warning:false,
      finishBackup:false
    })
  }
  


  render() {
   const mongo = './icons/mongo.png'
   const mongologo = '../../../src/icons/mongo.png'
    if(this.state.success){
      setTimeout(() => {
        this.setState({
          success:false
        })
      }, 3000 )
    }

    if(this.state.isLoading){
      setTimeout(() =>{
        this.setState({
          isloading:false,
          error:true
        })
      }, 10000)
    }
    
    const action = (
      <Button onClick = {this.closeHandler}style={{color:'white'}}>
        <HighlightOffIcon/>
      </Button>
    )
    const success = (
      <p style={{color:'#59C722', fontSize:20}}>
        <CheckCircleOutlineIcon style={{fontSize:15}}/>  Success Connection
      </p>
    )
    const fail = (
      <p style={{color:'#D60335', fontSize:20, margin:-5}}>
        <HighlightOffIcon style = {{fontSize:15}}/>      Failed Connection
      </p>
    )
    const warning = (
      <p style={{color:'#FFC60C', fontSize:20, margin:-5}}>
        <HighlightOffIcon style = {{fontSize:15}}/>      Failed Connection
      </p>
    )
    const finishBackup = (
      <p style={{color:'#59C722', fontSize:20, margin:-5}}>
        <CheckCircleOutlineIcon style={{fontSize:15}}/>  The backup has been finished
      </p>
    )
    const{sshConection} = this.state
    const { classes } = this.props; 
   const projectname = this.state.projectName
    if(this.state.sshConection == true){
    if (this.state.dbType == 'mongodb'){
      return( 
        <div>
           <Prompt
            when={this.state.testing || this.state.backuping}
            message = "Are you sure you want to leave the page?"
            />
        <div className='cardInformation'>
         <Dialog
         open ={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"¿Estas seguro?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Deseas editar el proyecto {this.state.projectName} ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            No 
          </Button>
          <Button onClick={this.editHandle} color="primary" autoFocus>
            Si 
          </Button>
        </DialogActions>
      </Dialog>
        <Grid container spacing={24}>
          <Card>
          <Grid container justify="center" alignItems="center">
              <Avatar alt="Remy Sharp" src="./icons/mongo.png" className='avatar' className='avatardb' />
          </Grid>
            <CardContent>
              <Grid container spacing={24}>
                <Grid item xs={12}>
                  <div>
                    <Typography component="h1" variant="display2" gutterBottom className='title'>
                      {this.state.projectName}
                    </Typography>
                  </div>
                  <Divider variant="inset" />
                </Grid>
                <Grid item xs={12}>
                
                  <TextField
                  disabled={this.state.edit === true ? true : false}
                    xs={6}
                    sm={4}
                    className={classes.textField}
                    onChange={this.handleChange}
                    id="standard-name"
                    name="dbName"
                    label="Name"
                    value={this.state.dbName}
                    margin="normal"
                  />
                  <TextField
                  disabled={this.state.edit === true ? true : false}
                    xs={12}
                    sm={4}
                    className={classes.textField}
                    onChange={this.handleChange}
                    id="standard-name"
                    name="dbIp"
                    label="IP"
                    value={this.state.dbIp}
                    margin="normal"
                  />
                  <FormControl className='formSelect' style={{ margin:15, width:200}}>
                      <InputLabel>Type</InputLabel>
                     <Select
                     disabled={this.state.edit === true ? true : false}
                     xs={12}
                     sm={4}
                    value={this.state.dbType2}
                    onChange={this.handleChange}
                    inputProps={{
                      name: 'dbType2',
                      id: 'dbType',
                    }}
                      >
                    <MenuItem value={'mysql'}>mysql</MenuItem>
                    <MenuItem value={'mongodb'}>mongodb</MenuItem>
                    <MenuItem value={'jenkins'}>jenkins</MenuItem>
                  </Select>
                  </FormControl>
                  <TextField
                  disabled={this.state.edit === true ? true : false}
                    xs={12}
                    sm={4}
                    className={classes.textField}
                    onChange={this.handleChange}
                    name="dbPort"
                    id="standard-name"
                    label="Db Port"
                    value={this.state.dbPort}
                    margin="normal"
                  />
                  <TextField
                  disabled={this.state.edit === true ? true : false}
                    xs={12}
                    sm={4}
                    className={classes.textField}
                    onChange={this.handleChange}
                    name="dbUser"
                    id="standard-name"
                    label="DB User"
                    value={this.state.dbUser}
                    margin="normal"
                  />
                  <TextField
                    disabled
                    xs={12}
                    sm={6}
                    className={classes.textField}
                    onChange={this.handleChange}
                    name="localPath"
                    id="standard-name"
                    label="Local Path"
                    value={this.state.localPath}
                    margin="normal"
                  />
                  <TextField
                  disabled={this.state.edit === true ? true : false}
                    className={classes.textField}
                    onChange={this.handleChange}
                    name="serverHost"
                    id="standard-name"
                    label="Server Host"
                    value={this.state.serverHost}
                    margin="normal"
                  />
                  <TextField
                  disabled={this.state.edit === true ? true : false}
                    className={classes.textField}
                    onChange={this.handleChange}
                    name="serverName"
                    id="standard-name"
                    label="Server Name"
                    value={this.state.serverName}
                    margin="normal"
                  />
                  <TextField
                  disabled={this.state.edit === true ? true : false}
                    className={classes.textField}
                    onChange={this.handleChange}
                    name="serverPort"
                    id="standard-name"
                    label="Server Port"
                    value={this.state.serverPort}
                    margin="normal"
                  />
                  <TextField
                  disabled={this.state.edit === true ? true : false}
                      className={classes.textField}
                      onChange={this.handleChange}
                      name="sshPath"
                      id="standard-name"
                      label="SSH Key"
                      value={this.state.sshPath}
                      margin="normal"
                    />
                    <TextField
                    disabled={this.state.edit === true ? true : false}
                      className={classes.textField}
                      onChange={this.handleChange}
                      name="sshPath"
                      id="standard-name"
                      label="Remote path"
                      value={this.state.remotePath}
                      margin="normal"
                    />
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Grid item xs={12}>
              {this.state.edit == true?
                  <Button
                    onClick={this.handleSubmit}
                    className={classes.button}
                    color="primary"
                    variant="contained"
                    component={Link} 
                    to="/running-individual-backup"
                  >
                           {
                            this.state.backuping == true?
                            <Lottie options={{animationData:Backup, ...defaultOptions }} width={30} height={30}/>
                            : <CloudDownloadIcon style={{color:'white', fontSize:25}}/>
                            }
                  </Button>
                  :null
                  }
                  {
                  this.state.edit == true?
                  <Tooltip title = 'Edit'>
                <Button
                  onClick={this.handleOpen}
                  className={classes.button}
                  color="primary"
                  variant="contained"
                >
                    <EditIcon/>
                </Button></Tooltip>
              :null
              }
               {
                  this.state.edit == true?
                  <Tooltip title = 'Test connection'>
                <Button
                  disabled={this.state.testing === true ? true : false}
                  onClick = {this.testConnection}
                  className={classes.button}
                  color="primary"
                  variant="contained"
                >       { this.state.testing == false?
                  <Typography style={{color:'white',  display:'flex'}}>


                      <Connection/>
                      
                      </Typography>
                  :null
                }
                         

                         {
                this.state.testing == true?
                 <CircularProgress  style ={{width:30, height:30, color:'green'}}/>
                :null
              }
                </Button>
                </Tooltip>
              :null
              }
              {this.state.edit == false?
              <div>
                
              <Button
              onClick={this.saveEditHandle}
              className={classes.button}
              color="primary"
              variant="contained"
            >
                     save<SaveAltIcon/>
            </Button>
           
            <Button
            onClick={this.closeHandle}
            className={classes.closeButton}
            color="primary"
            variant="contained"
          >
                   close<CloseIcon/>
          </Button>
          </div>

                :null
              }
              </Grid>

            </CardActions>
          </Card>
        </Grid>
      </div>
      {
            this.state.success?
            
            <div className='SnackBar' style={{borderRadius:10, padding:0}}>

              {
                this.state.connection?
                <SnackbarContent 
                stye={{ borderRadius:10, margin:0, padding:0}}
                variant = 'success'
                message = {success}
                action = {action}
                />
                :
                <SnackbarContent 
                stye={{background:'green', borderRadius:10}}
                variant = {'success'}
                message = {fail}
                action = {action}
                />

              }
              {
                this.state.finishBackup?
                <SnackbarContent 
                stye={{background:'green', borderRadius:10}}
                variant = {'success'}
                message = {finishBackup}
                action = {action}
                />
                :null
              }
              

          </div>
            :null
          }
          {
                this.state.finishBackup?
                <div className='SnackBar' style = {{borderRadius:10, padding:0}}>
                <SnackbarContent 
                stye={{background:'green', borderRadius:10}}
                variant = {'success'}
                message = {finishBackup}
                action = {action}
                />
                </div>
                :null
              }
          {
            this.state.error?
            <div className='SnackBar' style={{borderRadius:10, padding:0}}>

              <SnackbarContent 
              stye={{background:'green', borderRadius:10}}
              variant = {'success'}
              message = {fail}
              action = {action}
              />

        </div>
            
          
            :null
          }
       <LogsTable namep={this.state.projectName}/> 
      </div>
    );
    }
    else if(this.state.dbType == 'mysql'){
      return( 
        <div>
           <Prompt
            when={this.state.testing || this.state.backuping}
            message = "Are you sure you want to leave the page?"
            />
        <div className='cardInformation'>
         <Dialog
         open ={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"¿Estas seguro?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Deseas editar el proyecto {this.state.projectName} ? 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            No 
          </Button>
          <Button onClick={this.editHandle} color="primary" autoFocus>
            Si 
          </Button>
        </DialogActions>
      </Dialog>
        <Grid container spacing={24}>
       
          <Card>
          <Grid container justify="center" alignItems="center">
              <Avatar alt="Remy Sharp" src="./icons/mongo.png" className='avatar' className='avatardb' />
          </Grid>
            <CardContent>
              <Grid container spacing={24} justify='center'>
                <Grid item xs={12}>
                  <div>
                    <Typography component="h1" variant="display2" gutterBottom className='title'>
                     {this.state.projectName}
                    </Typography>
                  </div>
                </Grid>
                <Divider/>
                <Grid item xs={10}>
                  <TextField
                  disabled={this.state.edit === true ? true : false}
                    xs={6}
                    sm={4}
                    className={classes.textField}
                    onChange={this.handleChange}
                    id="standard-name"
                    name="dbName"
                    label="Name"
                    value={this.state.dbName}
                    margin="normal"
                  />
                  <TextField
                  disabled={this.state.edit === true ? true : false}
                    xs={12}centercentercenter
                    sm={4}
                    className={classes.textField}
                    onChange={this.handleChange}
                    id="standard-name"
                    name="dbIp"
                    label="IP"
                    value={this.state.dbIp}
                    margin="normal"
                  />
                  <FormControl className='formSelect' style={{ margin:15, width:200}}>
                      <InputLabel>Type</InputLabel>
                     <Select
                     disabled={this.state.edit === true ? true : false}
                     xs={12}
                     sm={4}
                    value={this.state.dbType2}
                    onChange={this.handleChange}
                    inputProps={{
                      name: 'dbType2',
                      id: 'dbType',
                    }}
                      >
                    <MenuItem value={'mysql'}>Mysql</MenuItem>
                    <MenuItem value={'mongodb'}>Mongodb</MenuItem>
                    <MenuItem value={'jenkins'}>Jenkins</MenuItem>
                  </Select>
                  </FormControl>
                  <TextField
                  disabled={this.state.edit === true ? true : false}
                    xs={12}
                    sm={4}
                    className={classes.textField}
                    onChange={this.handleChange}
                    name="dbUser"
                    id="standard-name"
                    label="DB User"
                    value={this.state.dbUser}
                    margin="normal"
                  />
                  <TextField
                  disabled={this.state.edit === true ? true : false}
                    xs={12}
                    sm={4}
                    className={classes.textField}
                    onChange={this.handleChange}
                    name="dbPassword"
                    id="standard-name"
                    label="DB Password"
                    value={this.state.dbPassword}
                    margin="normal"
                  />
                  <TextField
                    disabled
                    xs={12}
                    sm={6}
                    className={classes.textField}
                    onChange={this.handleChange}
                    name="localPath"
                    id="standard-name"
                    label="Local Path"
                    value={this.state.localPath}
                    margin="normal"
                  />
                  <TextField
                  disabled={this.state.edit === true ? true : false}
                    className={classes.textField}
                    onChange={this.handleChange}
                    name="serverHost"
                    id="standard-name"
                    label="Server Host"
                    value={this.state.serverHost}
                    margin="normal"
                  />
                  <TextField
                  disabled={this.state.edit === true ? true : false}
                    className={classes.textField}
                    onChange={this.handleChange}
                    name="serverName"
                    id="standard-name"
                    label="Server Name"
                    value={this.state.serverName}
                    margin="normal"
                  />
                  <TextField
                  disabled={this.state.edit === true ? true : false}
                    className={classes.textField}
                    onChange={this.handleChange}
                    name="serverPort"
                    id="standard-name"
                    label="Server Port"
                    value={this.state.serverPort}
                    margin="normal"
                  />
                  <TextField
                  disabled={this.state.edit === true ? true : false}
                      className={classes.textField}
                      onChange={this.handleChange}
                      name="sshPath"
                      id="standard-name"
                      label="SSH Key"
                      value={this.state.sshPath}
                      margin="normal"
                    />
                    <TextField
                    disabled={this.state.edit === true ? true : false}
                      className={classes.textField}
                      onChange={this.handleChange}
                      name="sshPath"
                      id="standard-name"
                      label="Remote Path"
                      value={this.state.remotePath}
                      margin="normal"
                    />
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Grid item xs={12}>
              {this.state.edit == true?
                  <Button
                    onClick={this.handleSubmit}
                    className={classes.button}
                    color="primary"
                    variant="contained"
                    component={Link} 
                    to="/running-individual-backup"
                  >
                          backup {
                            this.state.backuping == true?
                            <Lottie options={{animationData:Backup, ...defaultOptions }} width={30} height={30}/>
                            : <CloudDownloadIcon style={{color:'white', fontSize:25}}/>
                            }
                  </Button>
                  :null
                  }
                  {
                  this.state.edit == true?
                <Button
                  onClick={this.handleOpen}
                  className={classes.button}
                  color="primary"
                  variant="contained"
                >
                         edit <EditIcon/>
                </Button>
              :null
              }
               {
                  this.state.edit == true?
                <Button
                  disabled={this.state.testing === true ? true : false}
                  onClick = {this.testConnection}
                  className={classes.button}
                  color="primary"
                  variant="contained"
                >       { this.state.testing == false?
                  <Typography style={{color:'white',  display:'flex'}}>


                      Test <Connection/>
                      
                      </Typography>
                  :null
                }
                         

                         {
                this.state.testing == true?
                 <CircularProgress  style ={{width:30, height:30, color:'green'}}/>
                :null
              }
                </Button>
              :null
              }
              {this.state.edit == false?
              <div>
              <Button
              onClick={this.saveEditHandle}
              className={classes.button}
              color="primary"
              variant="contained"
            >
                     save <SaveAltIcon/>
            </Button>
            <Button
            onClick={this.closeHandle}
            className={classes.closeButton}
            color="primary"
            variant="contained"
          >
                   close <CloseIcon/>
          </Button>
          </div>

                :null
              }
              </Grid>

            </CardActions>
          </Card>
        </Grid>
      </div>
      {
            this.state.success?
            
            <div className='SnackBar' style={{borderRadius:10, padding:0}}>

              {
                this.state.connection?
                <SnackbarContent 
                stye={{ borderRadius:10, margin:0, padding:0}}
                variant = 'success'
                message = {success}
                action = {action}
                />
                :
                <SnackbarContent 
                stye={{background:'green', borderRadius:10}}
                variant = {'success'}
                message = {fail}
                action = {action}
                />

              }

          </div>
            :null
          }
          {
                this.state.finishBackup?
                <div className='SnackBar' style = {{borderRadius:10, padding:0}}>
                <SnackbarContent 
                stye={{background:'green', borderRadius:10}}
                variant = {'success'}
                message = {finishBackup}
                action = {action}
                />
                </div>
                :null
              }
          {
            this.state.error?
            <div className='SnackBar' style={{borderRadius:10, padding:0}}>

              <SnackbarContent 
              stye={{background:'green', borderRadius:10}}
              variant = {'success'}
              message = {fail}
              action = {action}
              />

        </div>
            
          
            :null
          }

       <LogsTable namep={this.state.projectName}/> 

      </div>
    );
    }
    else if(this.state.dbType == 'jenkins'){
      return( 
        <div>
           <Prompt
            when={this.state.testing || this.state.backuping}
            message = "Are you sure you want to leave the page?"
            />
        <div className='cardInformation'>
         <Dialog
         open ={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"¿Estas seguro?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Deseas editar el proyecto {this.state.projectName} ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            No 
          </Button>
          <Button onClick={this.editHandle} color="primary" autoFocus>
            Si 
          </Button>
        </DialogActions>
      </Dialog>
        <Grid container spacing={24}>
       
          <Card>
          <Grid container justify="center" alignItems="center">
              <Avatar alt="Remy Sharp" src='../../../src/icons/jenkins.png'className='avatar' className='avatardb' />
          </Grid>
            <CardContent>
              <Grid container spacing={24}>
                <Grid item xs={12}>
                  <div>
                    <Typography component="h1" variant="display2" gutterBottom className='title'>
                       {this.state.projectName}
                    </Typography>
                  </div>
                </Grid>
                <Divider/>
                <Grid item xs={12}>
                  <TextField
                  disabled={this.state.edit === true ? true : false}
                    xs={6}
                    sm={4}
                    className={classes.textField}
                    onChange={this.handleChange}
                    id="standard-name"
                    name="dbName"
                    label="Name"
                    value={this.state.dbName}
                    margin="normal"
                  />
                 <FormControl className='formSelect' style={{ margin:15, width:200}}>
                      <InputLabel>Type</InputLabel>
                     <Select
                     disabled={this.state.edit === true ? true : false}
                     xs={12}
                     sm={4}
                    value={this.state.dbType2}
                    onChange={this.handleChange}
                    inputProps={{
                      name: 'dbType2',
                      id: 'dbType',
                    }}
                      >
                    <MenuItem value={'mysql'}>Mysql</MenuItem>
                    <MenuItem value={'mongodb'}>Mongodb</MenuItem>
                    <MenuItem value={'jenkins'}>Jenkins</MenuItem>
                  </Select>
                  </FormControl>
                  <TextField
                    disabled
                    xs={12}
                    sm={6}
                    className={classes.textField}
                    onChange={this.handleChange}
                    name="localPath"
                    id="standard-name"
                    label="Local Path"
                    value={this.state.localPath}
                    margin="normal"
                  />
                  <TextField
                  disabled={this.state.edit === true ? true : false}
                    className={classes.textField}
                    onChange={this.handleChange}
                    name="remotePath"
                    id="standard-name"
                    label="Remothe Path"
                    value={this.state.remotePath}
                    margin="normal"
                  />
                  <TextField
                  disabled={this.state.edit === true ? true : false}
                    className={classes.textField}
                    onChange={this.handleChange}
                    name="serverHost"
                    id="standard-name"
                    label="Server Host"
                    value={this.state.serverHost}
                    margin="normal"
                  />
                  <TextField
                  disabled={this.state.edit === true ? true : false}
                    className={classes.textField}
                    onChange={this.handleChange}
                    name="serverName"
                    id="standard-name"
                    label="Server Name"
                    value={this.state.serverName}
                    margin="normal"
                  />
                  <TextField
                  disabled={this.state.edit === true ? true : false}
                    className={classes.textField}
                    onChange={this.handleChange}
                    name="serverPort"
                    id="standard-name"
                    label="Server Port"
                    value={this.state.serverPort}
                    margin="normal"
                  />
                  <TextField
                  disabled={this.state.edit === true ? true : false}
                    className={classes.textField}
                    onChange={this.handleChange}
                    name="sshPath"
                    id="standard-name"
                    label="SSH Key"
                    value={this.state.sshPath}
                    margin="normal"
                  />
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Grid item xs={12}>
              {this.state.edit == true?
              <Tooltip title='Backup'>
                  <Button
                    onClick={this.handleSubmit}
                    className={classes.button}
                    color="primary"
                    variant="contained"
                    component={Link} 
                    to="/running-individual-backup"
                  >
                       {
                            this.state.backuping == true?
                            <Lottie options={{animationData:Backup, ...defaultOptions }} width={30} height={30}/>
                            : <CloudDownloadIcon className={classes.icons}/>
                            }
                  </Button>
                  </Tooltip>
                  :null
                  }
                  {
                  this.state.edit == true?
                  <Tooltip title='Edit'>
                <Button
                  onClick={this.handleOpen}
                  className={classes.button}
                  color="primary"
                  variant="contained"
                >
                         <EditIcon className={classes.icons}/>
                </Button>
                </Tooltip>
              :null
              }
               {
                  this.state.edit == true?
                  <Tooltip title='Test connection'>
                <Button
                  disabled={this.state.testing === true ? true : false}
                  onClick = {this.testConnection}
                  className={classes.button}
                  color="primary"
                  variant="contained"
                >       { this.state.testing == false?
                  <Typography className = {classes.Test} style={{color:'white',}}>


                       <SettingsInputAntennaIcon className={classes.icons}/>
                      
                      </Typography>
                  :null
                }
                         

                         {
                this.state.testing == true?
                 <CircularProgress  style ={{width:30, height:30, color:'green'}}/>
                :null
              }
                </Button>
                </Tooltip>
              :null
              }
              {this.state.edit == false?
              <div>
              <Button
              onClick={this.saveEditHandle}
              className={classes.button}
              color="primary"
              variant="contained"
            >
                     save <SaveAltIcon className={classes.icons}/>
            </Button>
            <Button
            onClick={this.closeHandle}
            className={classes.closeButton}
            color="primary"
            variant="contained"
          >
                   close <CloseIcon/>
          </Button>
          </div>
          

                :null
              }
              </Grid>

            </CardActions>
          </Card>
        </Grid>
      </div>
      {
            this.state.success?
            
            <div className='SnackBar' style={{borderRadius:10, padding:0}}>

              {
                this.state.connection?
                <SnackbarContent 
                stye={{ borderRadius:10, margin:0, padding:0}}
                variant = 'success'
                message = {success}
                action = {action}
                />
                :
                <SnackbarContent 
                stye={{background:'green', borderRadius:10}}
                variant = {'success'}
                message = {fail}
                action = {action}
                />

              }

          </div>
            :null
          }
          {
                this.state.finishBackup?
                <div className='SnackBar' style = {{borderRadius:10, padding:0}}>
                <SnackbarContent 
                stye={{background:'green', borderRadius:10}}
                variant = {'success'}
                message = {finishBackup}
                action = {action}
                />
                </div>
                :null
              }
          {
            this.state.error?
            <div className='SnackBar' style={{borderRadius:10, padding:0}}>

              <SnackbarContent 
              stye={{background:'green', borderRadius:10}}
              variant = {'success'}
              message = {fail}
              action = {action}
              />

        </div>
            
          
            :null
          }

       <LogsTable namep={this.state.projectName}/> 

      </div>
    );
    }
      else{
        return( 
          <div>
             <Prompt
            when={this.state.testing || this.state.backuping}
            message = "Are you sure you want to leave the page?"
            />
          <div className='cardInformation'>
          <Grid container spacing={24}>
         
            <Card>
            <Grid container justify="center" alignItems="center">
                <Avatar alt="Remy Sharp" src="./icons/mongo.png" className='avatar' className='avatardb' />
            </Grid>
              <CardContent>
                <Grid container spacing={24}>
                  <Grid item xs={12}>
                    <div>
                      <Typography component="h1" variant="display2" gutterBottom className='title'>
                        {this.state.dbName}
                      </Typography>
                    </div>
                  </Grid>
                  <Divider/>
                  <Grid item xs={12}>
                    <TextField
                    disabled={this.state.edit === true ? true : false}
                      xs={6}
                      sm={4}
                      className={classes.textField}
                      onChange={this.handleChange}
                      id="standard-name"
                      name="dbName"
                      label="Name"
                      value={this.state.dbName}
                      margin="normal"
                    />
                    <TextField
                    disabled={this.state.edit === true ? true : false}
                      xs={12}
                      sm={4}
                      className={classes.textField}
                      onChange={this.handleChange}
                      id="standard-name"
                      name="dbIp"
                      label="IP"
                      value={this.state.dbIp}
                      margin="normal"
                    />
                   <FormControl className='formSelect' style={{ margin:15, width:200}}>
                      <InputLabel>Type</InputLabel>
                     <Select
                     disabled={this.state.edit === true ? true : false}
                     xs={12}
                     sm={4}
                    value={this.state.dbType2}
                    onChange={this.handleChange}
                    inputProps={{
                      name: 'dbType2',
                      id: 'dbType',
                    }}
                      >
                    <MenuItem value={'mysql'}>Mysql</MenuItem>
                    <MenuItem value={'mongodb'}>Mongodb</MenuItem>
                    <MenuItem value={'jenkins'}>Jenkins</MenuItem>
                  </Select>
                  </FormControl>
                    <TextField
                    disabled={this.state.edit === true ? true : false}
                      xs={12}
                      sm={4}
                      className={classes.textField}
                      onChange={this.handleChange}
                      name="dbUser"
                      id="standard-name"
                      label="DB User"
                      value={this.state.dbUser}
                      margin="normal"
                    />
                    <TextField
                      disabled
                      xs={12}
                      sm={6}
                      className={classes.textField}
                      onChange={this.handleChange}
                      name="localPath"
                      id="standard-name"
                      label="Local Path"
                      value={this.state.localPath}
                      margin="normal"
                    />
                    <TextField
                    disabled={this.state.edit === true ? true : false}
                      className={classes.textField}
                      onChange={this.handleChange}
                      name="remotePath"
                      id="standard-name"
                      label="Remothe Path"
                      value={this.state.remotePath}
                      margin="normal"
                    />
                    <TextField
                    disabled={this.state.edit === true ? true : false}
                      className={classes.textField}
                      onChange={this.handleChange}
                      name="serverHost"
                      id="standard-name"
                      label="Server Host"
                      value={this.state.serverHost}
                      margin="normal"
                    />
                    <TextField
                    disabled={this.state.edit === true ? true : false}
                      className={classes.textField}
                      onChange={this.handleChange}
                      name="serverName"
                      id="standard-name"
                      label="Server Name"
                      value={this.state.serverName}
                      margin="normal"
                    />
                    <TextField
                    disabled={this.state.edit === true ? true : false}
                      className={classes.textField}
                      onChange={this.handleChange}
                      name="serverPassword"
                      id="standard-name"
                      label="Server Password"
                      value={this.state.serverPassword}
                      margin="normal"
                    />
                    <TextField
                    disabled={this.state.edit === true ? true : false}
                      className={classes.textField}
                      onChange={this.handleChange}
                      name="serverPort"
                      id="standard-name"
                      label="Server Port"
                      value={this.state.serverPort}
                      margin="normal"
                    />
                    <TextField
                    disabled={this.state.edit === true ? true : false}
                      className={classes.textField}
                      onChange={this.handleChange}
                      name="sshConection"
                      id="standard-name"
                      label="SSH Conection"
                      value={this.state.sshConection}
                      margin="normal"
                    />
                    <TextField
                    disabled={this.state.edit === true ? true : false}
                      className={classes.textField}
                      onChange={this.handleChange}
                      name="sshPath"
                      id="standard-name"
                      label="SSH Key"
                      value={this.state.sshPath}
                      margin="normal"
                    />
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions>
                <Grid item xs={12}>
                  <Tooltip title='Backup'>
                {this.state.edit == true?
                
                  <Button
                    onClick={this.handleSubmit}
                    className={classes.button}
                    color="primary"
                    variant="contained"
                    component={Link} 
                    to="/running-individual-backup"
                  >
                          backup {
                            this.state.backuping == true?
                            <Lottie options={{animationData:Backup, ...defaultOptions }} width={30} height={30}/>
                            : <CloudDownloadIcon style={{color:'white', fontSize:25}}/>
                            }
                  </Button>
                  
                  :null
                  }
                  </Tooltip>
                  {
                  this.state.edit == true?
                <Button
                  onClick={this.handleOpen}
                  className={classes.button}
                  color="primary"
                  variant="contained"
                >
                         edit <EditIcon/>
                </Button>
              :null
              }
               {
                  this.state.edit == true?
                <Button
                  disabled={this.state.testing === true ? true : false}
                  onClick = {this.testConnection}
                  className={classes.button}
                  color="primary"
                  variant="contained"
                >
                         Test <SettingsInputAntennaIcon/>
                </Button>
              :null
              }
              {
                this.state.testing == true?
                 <CircularProgress/>
                :null
              }
              {this.state.edit == false?
              <div>
              <Button
              onClick={this.saveEditHandle}
              className={classes.button}
              color="primary"
              variant="contained"
            >
                     save <SaveAltIcon/>
            </Button>
            <Button
            onClick={this.closeHandle}
            className={classes.closeButton}
            color="primary"
            variant="contained"
          >
                   close <CloseIcon/>
          </Button>
          </div>
          
                :null
              }
                </Grid>
  
              </CardActions>
            </Card>
          </Grid>
        </div>
        
        </div>
      );
      }
    }
    else {
      if (this.state.dbType == 'mongodb'){
        return( 
          <div>
             <Prompt
            when={this.state.testing || this.state.backuping}
            message = "Are you sure you want to leave the page?"
            />
          <div className='cardInformation'>
           <Dialog
         open ={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"¿Estas seguro?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           ¿ Deseas editar el proyecto {this.state.projectName} ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            No 
          </Button>
          <Button onClick={this.editHandle} color="primary" autoFocus>
            Si 
          </Button>
        </DialogActions>
      </Dialog>
          <Grid container spacing={24}>
         
            <Card>
            <Grid container justify="center" alignItems="center">
                <Avatar alt="Remy Sharp" src={mongologo} className='avatar' className='avatardb' />
            </Grid>
              <CardContent>
                <Grid container spacing={24}>
                  <Grid item xs={12}>
                    <div>
                      <Typography component="h1" variant="display2" gutterBottom className='title'>
                        {this.state.projectName}
                      </Typography>
                    </div>
                    <Divider variant="inset" />
                  </Grid>
                  <Grid item xs={12}>
                  
                    <TextField
                     disabled={this.state.edit === true ? true : false}
                      xs={6}
                      sm={4}
                      className={classes.textField}
                      onChange={this.handleChange}
                      id="standard-name"
                      name="dbName"
                      label="Name"
                      value={this.state.dbName}
                      margin="normal"
                    />
                    <TextField
                    disabled={this.state.edit === true ? true : false}
                      xs={12}
                      sm={4}
                      className={classes.textField}
                      onChange={this.handleChange}
                      id="standard-name"
                      name="dbIp"
                      label="IP"
                      value={this.state.dbIp}
                      margin="normal"
                    />
                    <FormControl className='formSelect' style={{ margin:15, width:200}}>
                      <InputLabel>Type</InputLabel>
                     <Select
                     disabled={this.state.edit === true ? true : false}
                     xs={12}
                     sm={4}
                    value={this.state.dbType2}
                    onChange={this.handleChange}
                    inputProps={{
                      name: 'dbType2',
                      id: 'dbType',
                    }}
                      >
                    <MenuItem value={'mysql'}>Mysql</MenuItem>
                    <MenuItem value={'mongodb'}>Mongodb</MenuItem>
                    <MenuItem value={'jenkins'}>Jenkins</MenuItem>
                  </Select>
                  </FormControl>
                    <TextField
                    disabled={this.state.edit === true ? true : false}
                      xs={12}
                      sm={4}
                      className={classes.textField}
                      onChange={this.handleChange}
                      name="dbPort"
                      id="standard-name"
                      label="Db Port"
                      value={this.state.dbPort}
                      margin="normal"
                    />
                    <TextField
                    disabled={this.state.edit === true ? true : false}
                      xs={12}
                      sm={4}
                      className={classes.textField}
                      onChange={this.handleChange}
                      name="dbUser"
                      id="standard-name"
                      label="DB User"
                      value={this.state.dbUser}
                      margin="normal"
                    />
                    <TextField
                      disabled
                      xs={12}
                      sm={6}
                      className={classes.textField}
                      onChange={this.handleChange}
                      name="localPath"
                      id="standard-name"
                      label="Local Path"
                      value={this.state.localPath}
                      margin="normal"
                    />
                    <TextField
                    disabled={this.state.edit === true ? true : false}
                      className={classes.textField}
                      onChange={this.handleChange}
                      name="serverHost"
                      id="standard-name"
                      label="Server Host"
                      value={this.state.serverHost}
                      margin="normal"
                    />
                    <TextField
                    disabled={this.state.edit === true ? true : false}
                      className={classes.textField}
                      onChange={this.handleChange}
                      name="serverName"
                      id="standard-name"
                      label="Server Name"
                      value={this.state.serverName}
                      margin="normal"
                    />
                    <TextField
                    disabled={this.state.edit === true ? true : false}
                      className={classes.textField}
                      onChange={this.handleChange}
                      name="serverPort"
                      id="standard-name"
                      label="Server Port"
                      value={this.state.serverPort}
                      margin="normal"
                    />
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions>
                <Grid item xs={12}>
                {this.state.edit == true?
                <Tooltip title='Backup'>
                  <Button
                    onClick={this.handleSubmit}
                    className={classes.button}
                    color="primary"
                    variant="contained"
                    component={Link} 
                    to="/running-individual-backup"
                  >
                         {
                            this.state.backuping == true?
                            <Lottie options={{animationData:Backup, ...defaultOptions }} width={30} height={30}/>
                            : <CloudDownloadIcon style={{color:'white', fontSize:25}}/>
                            }
                  </Button>
                  </Tooltip>
                  :null
                  }
                  {
                  this.state.edit == true?
                  <Tooltip title='Edit'>
                <Button
                  onClick={this.handleOpen}
                  className={classes.button}
                  color="primary"
                  variant="contained"
                >
                       <EditIcon/>
                </Button>
                </Tooltip>
              :null
              }
              {
                  this.state.edit == true?
                  <Tooltip title='Test connection'>
                <Button
                  disabled={this.state.testing === true ? true : false}
                  onClick = {this.testConnection}
                  className={classes.button}
                  color="primary"
                  variant="contained"
                >       { this.state.testing == false?
                  <Typography style={{color:'white', display:'flex'}}>


                       <Connection/>
                      
                      </Typography>
                  :null
                }
                         

                         {
                this.state.testing == true?
                 <CircularProgress  style ={{width:30, height:30, color:'green'}}/>
                :null
              }
                </Button>
                </Tooltip>
              :null
              }
              
              {this.state.edit == false?
              <div>
              <Button
              onClick={this.saveEditHandle}
              className={classes.button}
              color="primary"
              variant="contained"
            >
                     save <SaveAltIcon/>
            </Button>
            <Button
            onClick={this.closeHandle}
            className={classes.closeButton}
            color="primary"
            variant="contained"
          >
                   close <CloseIcon/>
          </Button>
          </div>

                :null
              }
                </Grid>
  
              </CardActions>
            </Card>
          </Grid>
        </div>
          {
            this.state.success?
            
            <div className='SnackBar' style={{borderRadius:10, padding:0}}>

              {
                this.state.connection?
                <SnackbarContent 
                stye={{ borderRadius:10, margin:0, padding:0}}
                variant = 'success'
                message = {success}
                action = {action}
                />
                :
                <SnackbarContent 
                stye={{background:'green', borderRadius:10}}
                variant = {'success'}
                message = {fail}
                action = {action}
                />

              }

          </div>
            :null
          }
          {
                this.state.finishBackup?
                <div className='SnackBar' style = {{borderRadius:10, padding:0}}>
                <SnackbarContent 
                stye={{background:'green', borderRadius:10}}
                variant = {'success'}
                message = {finishBackup}
                action = {action}
                />
                </div>
                :null
              }
          {
            this.state.error?
            <div className='SnackBar' style={{borderRadius:10, padding:0}}>

              <SnackbarContent 
              stye={{background:'green', borderRadius:10}}
              variant = {'success'}
              message = {fail}
              action = {action}
              />

        </div>
            
          
            :null
          }
         <LogsTable namep={projectname}/> 
          
        </div>
      );
      }
      else if(this.state.dbType == 'mysql'){
        return( 
          <div>
            <Prompt
            when={this.state.testing || this.state.backuping}
            message = "Are you sure you want to leave the page?"
            />
          <div className='cardInformation'>
           <Dialog
         open ={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Estas seguro?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Deseas editar el proyecto {this.state.projectName} ? 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            No 
          </Button>
          <Button onClick={this.editHandle} color="primary" autoFocus>
            Si 
          </Button>
        </DialogActions>
      </Dialog>
          <Grid container spacing={24}>
         
            <Card>
            <Grid container justify="center" alignItems="center">
              <Avatar alt="Remy Sharp" src='../../../src/icons/mysql.png'className='avatar' className='avatardb' />
            </Grid>
              <CardContent>
                <Grid container spacing={24} justify='center'>
                  <Grid item xs={12}>
                    <div>
                      <Typography component="h1" variant="display2" gutterBottom className='title'>
                       {this.state.projectName}
                      </Typography>
                    </div>
                  </Grid>
                  <Divider/>
                  <Grid item xs={10}>
                    <TextField
                    disabled={this.state.edit === true ? true : false}
                      xs={6}
                      sm={4}
                      className={classes.textField}
                      onChange={this.handleChange}
                      id="standard-name"
                      name="dbName"
                      label="Name"
                      value={this.state.dbName}
                      margin="normal"
                    />
                    <TextField
                     disabled={this.state.edit === true ? true : false}
                      xs={12}centercentercenter
                      sm={4}
                      className={classes.textField}
                      onChange={this.handleChange}
                      id="standard-name"
                      name="dbIp"
                      label="IP"
                      value={this.state.dbIp}
                      margin="normal"
                    />
                    <FormControl className='formSelect' style={{ margin:15, width:200}}>
                      <InputLabel>Type</InputLabel>
                     <Select
                     disabled={this.state.edit === true ? true : false}
                     xs={12}
                     sm={4}
                    value={this.state.dbType2}
                    onChange={this.handleChange}
                    inputProps={{
                      name: 'dbType2',
                      id: 'dbType',
                    }}
                      >
                    <MenuItem value={'mysql'}>Mysql</MenuItem>
                    <MenuItem value={'mongodb'}>Mongodb</MenuItem>
                    <MenuItem value={'jenkins'}>Jenkins</MenuItem>
                  </Select>
                  </FormControl>
                    <TextField
                      disabled={this.state.edit === true ? true : false}
                      xs={12}
                      sm={4}
                      className={classes.textField}
                      onChange={this.handleChange}
                      name="dbUser"
                      id="standard-name"
                      label="DB User"
                      value={this.state.dbUser}
                      margin="normal"
                    />
                    <TextField
                  disabled={this.state.edit === true ? true : false}
                    xs={12}
                    sm={4}
                    className={classes.textField}
                    onChange={this.handleChange}
                    name="dbPassword"
                    id="standard-name"
                    label="DB Password"
                    value={this.state.dbPassword}
                    margin="normal"
                  />
                    <TextField
                      disabled
                      xs={12}
                      sm={6}
                      className={classes.textField}
                      onChange={this.handleChange}
                      name="localPath"
                      id="standard-name"
                      label="Local Path"
                      value={this.state.localPath}
                      margin="normal"
                    />
                    <TextField
                    disabled={this.state.edit === true ? true : false}
                      className={classes.textField}
                      onChange={this.handleChange}
                      name="serverHost"
                      id="standard-name"
                      label="Server Host"
                      value={this.state.serverHost}
                      margin="normal"
                    />
                    <TextField
                    disabled={this.state.edit === true ? true : false}
                      className={classes.textField}
                      onChange={this.handleChange}
                      name="serverName"
                      id="standard-name"
                      label="Server Name"
                      value={this.state.serverName}
                      margin="normal"
                    />
                    <TextField
                    disabled={this.state.edit === true ? true : false}
                      className={classes.textField}
                      onChange={this.handleChange}
                      name="serverPort"
                      id="standard-name"
                      label="Server Port"
                      value={this.state.serverPort}
                      margin="normal"
                    />
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions>
                <Grid item xs={12}>
                {this.state.edit == true?
                <Tooltip title = 'Backup'>
                  <Button
                    onClick={this.handleSubmit}
                    className={classes.button}
                    color="primary"
                    variant="contained"
                    component={Link} 
                    to="/running-individual-backup"
                  >
                            {
                            this.state.backuping == true?
                            <Lottie options={{animationData:Backup, ...defaultOptions }} width={30} height={30}/>
                            : <CloudDownloadIcon style={{color:'white', fontSize:25}}/>
                            }
                  </Button>
                  </Tooltip>
                  :null
                  }
                  {
                  this.state.edit == true?
                  <Tooltip title = 'Edit'>
                <Button
                  onClick={this.handleOpen}
                  className={classes.button}
                  color="primary"
                  variant="contained"
                >
                         <EditIcon/>
                </Button>
                </Tooltip>
              :null
              }
               {
                  this.state.edit == true?
                  <Tooltip title = 'Test connection'>
                <Button className='testButton'
                  disabled={this.state.testing === true ? true : false}
                  onClick = {this.testConnection}
                  className={classes.button}
                  color="primary"
                  variant="contained"
                  
                >       { this.state.testing == false?
                  <Typography style={{color:'white', display:'flex'}}>
                      <Connection/>
                      </Typography>
                  :null
                }
                         

                         {
                this.state.testing == true?
                <Typography style={{display:'flex', }}> 
                <Lottie options={{animationData:treePoints, ...defaultOptions }} width={30} height={30} style={{color:'white'}}/>
                 </Typography>
                :null
              }
                </Button>
                </Tooltip>
              :null
              }
              {this.state.edit == false?
              <div>
              <Button
              onClick={this.saveEditHandle}
              className={classes.button}
              color="primary"
              variant="contained"
            >
                     save <SaveAltIcon/>
            </Button>
            <Button
            onClick={this.closeHandle}
            className={classes.closeButton}
            color="primary"
            variant="contained"
          >
                   close <CloseIcon/>
          </Button>
          </div>

                :null
              }
                </Grid>
  
              </CardActions>
            </Card>
          </Grid>
          
        </div>
        {
            this.state.success?
            
            <div className='SnackBar' style={{borderRadius:10, padding:0}}>

              {
                this.state.connection?
                <SnackbarContent 
                stye={{ borderRadius:10, margin:0, padding:0}}
                variant = 'success'
                message = {success}
                action = {action}
                />
                :
                <SnackbarContent 
                stye={{background:'green', borderRadius:10}}
                variant = {'success'}
                message = {fail}
                action = {action}
                />

              }
              {
                this.state.finishBackup?
                <SnackbarContent 
                stye={{background:'green', borderRadius:10}}
                variant = {'success'}
                message = {finishBackup}
                action = {action}
                />
                :null
              }
              

          </div>
            :null
          }
          {
                this.state.finishBackup?
                <div className='SnackBar' style = {{borderRadius:10, padding:0}}>
                <SnackbarContent 
                stye={{background:'green', borderRadius:10}}
                variant = {'success'}
                message = {finishBackup}
                action = {action}
                />
                </div>
                :null
              }
          {
            this.state.error?
            <div className='SnackBar' style={{borderRadius:10, padding:0}}>

              <SnackbarContent 
              stye={{background:'green', borderRadius:10}}
              variant = {'success'}
              message = {fail}
              action = {action}
              />

        </div>
            
          
            :null
          
          }
          {
            this.state.warning?
            <div className='SnackBar' style={{borderRadius:10, padding:0}}>

              <SnackbarContent 
              stye={{background:'green', borderRadius:10}}
              variant = {'success'}
              message = {warning}
              action = {action}
              />

        </div>
            
          
            :null
          
          }
         <LogsTable namep={projectname}/> 
        
       </div>

      );
      }
      else if(this.state.dbType == 'jenkins'){
        return( 
            <div>
               <Prompt
            when={this.state.testing || this.state.backuping}
            message = "Are you sure you want to leave the page?"
            />
          <div className='cardInformation'>
           <Dialog
         open ={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"¿Estas seguro?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           ¿ deseas editar el proyecto {this.state.projectName} ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            No 
          </Button>
          <Button onClick={this.editHandle} color="primary" autoFocus>
            Si 
          </Button>
        </DialogActions>
      </Dialog>
          <Grid container spacing={24}>
         
            <Card>
            <Grid container justify="center" alignItems="center">
                <Avatar alt="Remy Sharp" src='../../../src/icons/mongo.png' className='avatar' className='avatardb' />
            </Grid>
              <CardContent>
                <Grid container spacing={24}>
                  <Grid item xs={12}>
                    <div>
                      <Typography component="h1" variant="display2" gutterBottom className='title'>
                         {this.state.projectName}
                      </Typography>
                    </div>
                  </Grid>
                  <Divider/>
                  <Grid item xs={12}>
                    <TextField
                    disabled={this.state.edit === true ? true : false}
                      xs={6}
                      sm={4}
                      className={classes.textField}
                      onChange={this.handleChange}
                      id="standard-name"
                      name="dbName"
                      label="Name"
                      value={this.state.dbName}
                      margin="normal"
                    />
                    <FormControl className='formSelect' style={{ margin:15, width:200}}>
                      <InputLabel>Type</InputLabel>
                     <Select
                     disabled={this.state.edit === true ? true : false}
                     xs={12}
                     sm={4}
                    value={this.state.dbType2}
                    onChange={this.handleChange}
                    inputProps={{
                      name: 'dbType2',
                      id: 'dbType',
                    }}
                      >
                    <MenuItem value={'mysql'}>Mysql</MenuItem>
                    <MenuItem value={'mongodb'}>Mongodb</MenuItem>
                    <MenuItem value={'jenkins'}>Jenkins</MenuItem>
                  </Select>
                  </FormControl>
                    <TextField
                      disabled
                      xs={12}
                      sm={6}
                      className={classes.textField}
                      onChange={this.handleChange}
                      name="localPath"
                      id="standard-name"
                      label="Local Path"
                      value={this.state.localPath}
                      margin="normal"
                    />
                    <TextField
                    disabled={this.state.edit === true ? true : false}
                      className={classes.textField}
                      onChange={this.handleChange}
                      name="serverHost"
                      id="standard-name"
                      label="Server Host"
                      value={this.state.serverHost}
                      margin="normal"
                    />
                    <TextField
                    disabled={this.state.edit === true ? true : false}
                      className={classes.textField}
                      onChange={this.handleChange}
                      name="serverName"
                      id="standard-name"
                      label="Server Name"
                      value={this.state.serverName}
                      margin="normal"
                    />
                    <TextField
                    disabled={this.state.edit === true ? true : false}
                      className={classes.textField}
                      onChange={this.handleChange}
                      name="serverPort"
                      id="standard-name"
                      label="Server Port"
                      value={this.state.serverPort}
                      margin="normal"
                    />
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions>
                <Grid item xs={12}>
                {this.state.edit == true?
                  <Button
                    onClick={this.handleSubmit}
                    className={classes.button}
                    color="primary"
                    variant="contained"
                    component={Link} 
                    to="/running-individual-backup"
                  >
                          backup <GetAppIcon/>
                  </Button>
                  :null
                  }
                  {
                  this.state.edit == true?
                <Button
                  onClick={this.handleOpen}
                  className={classes.button}
                  color="primary"
                  variant="contained"
                >
                         edit <EditIcon/>
                </Button>
              :null
              }
               {
                  this.state.edit == true?
                <Button
                  disabled={this.state.testing === true ? true : false}
                  onClick = {this.testConnection}
                  className={classes.button}
                  color="primary"
                  variant="contained"
                >       { this.state.testing == false?
                  <Typography style={{color:'white',  display:'flex'}}>


                      Test <Connection/>
                      
                      </Typography>
                  :null
                }
                         

                         {
                this.state.testing == true?
                 <CircularProgress  style ={{width:30, height:30, color:'green'}}/>
                :null
              }
                </Button>
              :null
              }
              {this.state.edit == false?
              <div>
              <Button
              onClick={this.saveEditHandle}
              className={classes.button}
              color="primary"
              variant="contained"
            >
                     save <SaveAltIcon/>
            </Button>
            <Button
            onClick={this.closeHandle}
            className={classes.closeButton}
            color="primary"
            variant="contained"
          >
                   close <CloseIcon/>
          </Button>
          </div>

                :null
              }
                </Grid>
  
              </CardActions>
            </Card>
          </Grid>
        </div>
        {
            this.state.success?
            
            <div className='SnackBar' style={{borderRadius:10, padding:0}}>

              {
                this.state.connection?
                <SnackbarContent 
                stye={{ borderRadius:10, margin:0, padding:0}}
                variant = 'success'
                message = {success}
                action = {action}
                />
                :
                <SnackbarContent 
                stye={{background:'green', borderRadius:10}}
                variant = {'success'}
                message = {fail}
                action = {action}
                />
              }
              {
                this.state.finishBackup?
                <SnackbarContent 
                stye={{background:'green', borderRadius:10}}
                variant = {'success'}
                message = {finishBackup}
                action = {action}
                />
                :null
              }
              

          </div>
            :null
          }
          {
            this.state.error?
            <div className='SnackBar' style={{borderRadius:10, padding:0}}>

              <SnackbarContent 
              stye={{background:'green', borderRadius:10}}
              variant = {'success'}
              message = {fail}
              action = {action}
              />

        </div>
            
          
            :null
          }
           <LogsTable namep={projectname}/> 
        </div>
      );
      }
        else{
          return( 
            <div>
            <div className='cardInformation'>
             <Dialog
         open ={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Estad seguro?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           ¿ Deseas editar el proyecto {this.state.projectName} ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            No 
          </Button>
          <Button onClick={this.editHandle} color="primary" autoFocus>
            Si 
          </Button>
        </DialogActions>
      </Dialog>
            <Grid container spacing={24}>
           
              <Card>
              <Grid container justify="center" alignItems="center">
                  <Avatar alt="Remy Sharp" src="./icons/mongo.png" className='avatar' className='avatardb' />
              </Grid>
                <CardContent>
                  <Grid container spacing={24}>
                    <Grid item xs={12}>
                      <div>
                        <Typography component="h1" variant="display2" gutterBottom className='title'>
                          {this.state.dbName}
                        </Typography>
                      </div>
                    </Grid>
                    <Divider/>
                    <Grid item xs={12}>
                      <TextField
                      disabled={this.state.edit === true ? true : false}
                        xs={6}
                        sm={4}
                        className={classes.textField}
                        onChange={this.handleChange}
                        id="standard-name"
                        name="dbName"
                        label="Name"
                        value={this.state.dbName}
                        margin="normal"
                      />
                      <TextField
                      disabled={this.state.edit === true ? true : false}
                        xs={12}
                        sm={4}
                        className={classes.textField}
                        onChange={this.handleChange}
                        id="standard-name"
                        name="dbIp"
                        label="IP"
                        value={this.state.dbIp}
                        margin="normal"
                      />
                      <FormControl className='formSelect' style={{ margin:15, width:200}}>
                      <InputLabel>Type</InputLabel>
                     <Select
                     disabled={this.state.edit === true ? true : false}
                     xs={12}
                     sm={4}
                    value={this.state.dbType2}
                    onChange={this.handleChange}
                    inputProps={{
                      name: 'dbType2',
                      id: 'dbType',
                    }}
                      >
                    <MenuItem value={'mysql'}>Mysql</MenuItem>
                    <MenuItem value={'mongodb'}>Mongodb</MenuItem>
                    <MenuItem value={'jenkins'}>Jenkins</MenuItem>
                  </Select>
                  </FormControl>
                      <TextField
                      disabled={this.state.edit === true ? true : false}
                        xs={12}
                        sm={4}
                        className={classes.textField}
                        onChange={this.handleChange}
                        name="dbUser"
                        id="standard-name"
                        label="DB User"
                        value={this.state.dbUser}
                        margin="normal"
                      />
                      <TextField
                        disabled
                        xs={12}
                        sm={6}
                        className={classes.textField}
                        onChange={this.handleChange}
                        name="localPath"
                        id="standard-name"
                        label="Local Path"
                        value={this.state.localPath}
                        margin="normal"
                      />
                      <TextField
                      disabled={this.state.edit === true ? true : false}
                        className={classes.textField}
                        onChange={this.handleChange}
                        name="remotePath"
                        id="standard-name"
                        label="Remothe Path"
                        value={this.state.remotePath}
                        margin="normal"
                      />
                      <TextField
                      disabled={this.state.edit === true ? true : false}
                        className={classes.textField}
                        onChange={this.handleChange}
                        name="serverHost"
                        id="standard-name"
                        label="Server Host"
                        value={this.state.serverHost}
                        margin="normal"
                      />
                      <TextField
                      disabled={this.state.edit === true ? true : false}
                        className={classes.textField}
                        onChange={this.handleChange}
                        name="serverName"
                        id="standard-name"
                        label="Server Name"
                        value={this.state.serverName}
                        margin="normal"
                      />
                      <TextField
                      disabled={this.state.edit === true ? true : false}
                        className={classes.textField}
                        onChange={this.handleChange}
                        name="serverPassword"
                        id="standard-name"
                        label="Server Password"
                        value={this.state.serverPassword}
                        margin="normal"
                      />
                      <TextField
                      disabled={this.state.edit === true ? true : false}
                        className={classes.textField}
                        onChange={this.handleChange}
                        name="serverPort"
                        id="standard-name"
                        label="Server Port"
                        value={this.state.serverPort}
                        margin="normal"
                      />
                      <TextField
                      disabled={this.state.edit === true ? true : false}
                        className={classes.textField}
                        onChange={this.handleChange}
                        name="sshConection"
                        id="standard-name"
                        label="SSH Conection"
                        value={this.state.sshConection}
                        margin="normal"
                      />
                      <TextField
                      disabled={this.state.edit === true ? true : false}
                        className={classes.textField}
                        onChange={this.handleChange}
                        name="sshPath"
                        id="standard-name"
                        label="SSH Key"
                        value={this.state.sshPath}
                        margin="normal"
                      />
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions>
                  <Grid item xs={12}>
                  {this.state.edit == true?
                  <Button
                    onClick={this.handleSubmit}
                    className={classes.button}
                    color="primary"
                    variant="contained"
                    component={Link} 
                    to="/running-individual-backup"
                  >
                          backup <GetAppIcon/>
                  </Button>
                  :null
                  }
                  {
                  this.state.edit == true?
                <Button
                  onClick={this.handleOpen}
                  className={classes.button}
                  color="primary"
                  variant="contained"
                >
                         edit <EditIcon/>
                </Button>
              :null
              }
              {
                  this.state.edit == true?
                <Button
                  disabled={this.state.testing === true ? true : false}
                  onClick = {this.testConnection}
                  className={classes.button}
                  color="primary"
                  variant="contained"
                >
                         Test <Connection />
                </Button>
              :null
              }
              {
                this.state.testing == true?
                 <CircularProgress/>
                :null
              }
              
              {
                  this.state.edit == true?
                <Button
                  disabled={this.state.testing === true ? true : false}
                  onClick = {this.testConnection}
                  className={classes.button}
                  color="primary"
                  variant="contained"
                >       { this.state.testing == false?
                  <Typography style={{color:'white'}}>


                      Test <Connection/>
                      
                      </Typography>
                  :null
                }
                         

                         {
                this.state.testing == true?
                 <CircularProgress  style ={{width:30, height:30, color:'green'}}/>
                :null
              }
                </Button>
              :null
              }
              {this.state.edit == false?
              <div>
              <Button
              onClick={this.saveEditHandle}
              className={classes.button}
              color="primary"
              variant="contained"
            >
                     save <SaveAltIcon/>
            </Button>
            <Button
            onClick={this.closeHandle}
            className={classes.closeButton}
            color="primary"
            variant="contained"
          >
                   close <CloseIcon/>
          </Button>
          </div>

                :null
              }
                  </Grid>
    
                </CardActions>
              </Card>
            </Grid>
          </div>
          {
            this.state.success?
            
            <div className='SnackBar' style={{borderRadius:10, padding:0}}>

              {
                this.state.connection?
                <SnackbarContent 
                stye={{ borderRadius:10, margin:0, padding:0}}
                variant = 'success'
                message = {success}
                action = {action}
                />
                :
                <SnackbarContent 
                stye={{background:'green', borderRadius:10}}
                variant = {'success'}
                message = {fail}
                action = {action}
                />

              }

          </div>
            :null
          }
          {
            this.state.error?
            <div className='SnackBar' style={{borderRadius:10, padding:0}}>

              <SnackbarContent 
              stye={{background:'green', borderRadius:10}}
              variant = {'success'}
              message = {fail}
              action = {action}
              />

        </div>
            
          
            :null
          }
           <LogsTable namep={projectname}/> 

          </div>
        );
        }

    } 
      //AQUI VA 
    
    
    }
    
  }



IndividualBackup.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};


export default withRouter(withStyles(styles)(IndividualBackup));