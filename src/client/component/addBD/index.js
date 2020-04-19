import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import './index.css';
import { Link } from 'react-router-dom';



export default class  add extends Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.addDb = this.addDb.bind(this);
        this.clear.bind(this);
        this.state = {
            hola :'hola',
            serverName:'',
            serverHost:'',
            serverPort:0,
            serverPassword:'',
            sshConnection:false,
            sshPath:'',
            remotePath:'',
            dbIp:'',
            dbType:'',
            dbPort:0,
            dbUser:'',
            dbPassword:'',
            dbName:'',
            dbStatus:'success',
            dbTime:null,
            projectName:'',
            dbStatus:'',
            age:0




        }

    }
    handleChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({
          [name]: value
        });
        console.log(value)
        event.preventDefault()
    
      }
    addDb(e){
        console.log('entró a la funcion')
        axios.post(`http://${process.env.IP_API}/backler/api/projects/newProject`, {
            dbType:this.state.dbType,
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
              console.log(res)
              this.setState({
                serverName:'',
                serverHost:'',
                serverPort:0,
                serverPassword:'',
                sshConnection:false,
                sshPath:'',
                remotePath:'',
                dbIp:'',
                dbType:'',
                dbPort:0,
                dbUser:'',
                dbPassword:'',
                dbName:'',
                dbStatus:'success',
                dbTime:null,
                projectName:'',
                dbStatus:'',
                age:0
            })
            alert('Database saved successfully')
            })
            e.preventDefault();
    }
    clear(){
        this.setState({
            serverName:'',
            serverHost:'',
            serverPort:0,
            serverPassword:'',
            sshConnection:false,
            sshPath:'',
            remotePath:'',
            dbIp:'',
            dbType:'',
            dbPort:0,
            dbUser:'',
            dbPassword:'',
            dbName:'',
            dbStatus:'success',
            dbTime:null,
            projectName:'',
            dbStatus:'',
            age:0
        })
    }
    render(){
        return(
            <div className='container'>
                <Grid container className='form'>
                    <Grid item xs={6}> 
                        <TextField
                            id="outlined-helperText"
                            label=" Database Name"
                            variant="outlined"
                            className='field'
                            name='dbName'
                            onChange={this.handleChange}
                            value={this.state.dbName}
                        />
                        <TextField
                            id="outlined-helperText"
                            label="Database IP"
                            variant="outlined"
                            className='field'
                            name='dbIp'
                            onChange={this.handleChange}
                            value={this.state.dbIp}
                        />
                        <TextField
                            id="outlined-helperText"
                            name='dbPort'
                            label=" Database port"
                            variant="outlined"
                            className='field'
                            onChange={this.handleChange}
                            value={this.state.dbPort}
                        />
                        <TextField
                            id="outlined-helperText"
                            label="Database password"
                            variant="outlined"
                            className='field'
                            name='dbPassword'
                            onChange={this.handleChange}
                            value={this.state.dbPassword}
                        />
                        <TextField
                            id="outlined-helperText"
                            label="Server Name"
                            variant="outlined"
                            className='field'
                            name='serverName'
                        />
                         <TextField
                            id="outlined-helperText"
                            label="Server port"
                            variant="outlined"
                            className='field'
                            name='serverPort'
                            onChange={this.handleChange}
                            value={this.state.serverPort}
                        />
                    </Grid>
                    <Grid item xs={6}> 
                        <TextField
                            id="outlined-helperText"
                            label="Project name"
                            variant="outlined"
                            className='field'
                            name='projectName'
                            onChange={this.handleChange}
                            value={this.state.projectName}
                        />
                        <FormControl variant="filled" /* className={classes.formControl} */>
                            <InputLabel id="demo-simple-select-filled-label">Database type</InputLabel>
                            <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                             className='field'
                            style={{border:'solid 1px #00000', paddingBottom:22}}
                            value={this.state.dbType}
                            onChange={this.handleChange}
                            inputProps={{
                            name: 'dbType',
                            id: 'dbType',
                            }}
                            >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={'mongodb'}>mongodb</MenuItem>
                            <MenuItem value={'mysql'}>mysql</MenuItem>
                            <MenuItem value={'posstgre'}>potsgre</MenuItem>
                            </Select>
                        </FormControl>
                    
                        <TextField
                            id="outlined-helperText"
                            label="Database user"
                            variant="outlined"
                            className='field'
                            style={{marginTop:30}}
                        />
                        <TextField
                            id="outlined-helperText"
                            label=" Server host"
                            variant="outlined"
                            className='field'
                            name='serverHost'
                            onChange={this.handleChange}
                            value={this.state.serverHost}
                        />
                        <TextField
                            id="outlined-helperText"
                            label="Server password"
                            variant="outlined"
                            className='field'
                            name='serverPassword'
                            onChange={this.handleChange}
                            value={this.state.serverPassword}
                        />
                    </Grid>
                    <Grid item xs={12}>
                    <Button variant="contained"
                     component={Link}
                     to={`/`}
                    >
                    Cancel
                    </Button>
                    <Button variant="contained" style={{background:'green', color:'white', width:90, marginLeft:10}} onClick={this.addDb}>
                    Save
                    </Button>
                    </Grid>
                </Grid>

            </div>
        )
    }
}