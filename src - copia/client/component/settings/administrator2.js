import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import GetAppIcon from '@material-ui/icons/GetApp';
import { FormControl, SnackbarContent } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import SettingsIcon from '@material-ui/icons/Settings';
import CheckIcon from '@material-ui/icons/Check';
import axios from 'axios';






export default class Admin extends Component{
    constructor(props){
        super(props);
        
        this.changeShow = this.changeShow.bind(this);
        this.onChangePath = this.onChangePath.bind(this);
        this.componentDidMount=this.componentDidMount.bind(this);
        // this.checkDirectory = this.checkDirectory.bind(this);
        this.check = this.check.bind(this)
        this.updatePath = this.updatePath.bind(this)
        this.takeRegister = this.takeRegister.bind(this)
        this.edit = this.edit.bind(this)

        this.state={
            validate: false,
            valida: false, 
            directoryPath: '',
            directoryPath2: '',
            directorio:[],
            id:'',
            serverName:'', 
            serverHost:'', 
            serverPort:0,
            serverPassword: '',
            sshPath:'',
            remotePath:'',
            localPath:'',
            dbIp:'',
            dbType:'',
            dbPort:0,
            dbUser:'',
            dbPassword:'',
            dbName:'',
            dbStatus:'',
            dbTime:null,
            __v:0,
            projectName:''



        }
    }
componentDidMount(){

    this.takeRegister();
}

 takeRegister(){
    fetch(`http://${process.env.IP_API}/buckler/api/projects/projectsList`)
        .then(response => response.json())
        .then(data =>{
            console.log(data)
                this.setState({
                    directorio:data,
                    id: data[0]._id,
                    directoryPath2:data[0].localPath,
                    serverName:data[0].serverName, 
                    serverHost:data[0].serverHost, 
                    serverPort:data[0].serverPort,
                    serverPassword:data[0].serverPassword,
                    sshPath:data[0].sshPath,
                    remotePath:data[0].remotePath,
                    localPath:data[0].localPath,
                    dbIp:data[0].dbIp,
                    dbType:data[0].dbType,
                    dbPort:data[0].dbPort,
                    dbUser:data[0].dbUser,
                    dbPassword:data[0].dbPassword,
                    dbName:data[0].dbName,
                    dbStatus:data[0].dbStatus,
                    dbTime:data[0].dbTime,
                    __v:data[0].__v,
                    projectName:data[0].projectName
                    
                })
    console.log(this.state.id)
    console.log(this.state.directoryPath2)
    console.log(this.state.projectName)

    })
 }
    
 

 

 check(e){
    var reg = /^([\\/][a-z0-9\s\-_\@\-\^!#$%&]*)+(\.[a-z][a-z0-9]+)?$/i
    var val = reg.test(this.state.directoryPath)
    if(val){
    console.log(this.state.id)
     console.log(this.state.directoryPath);
     e.preventDefault();
     axios.post(`http://${process.env.IP_API}/buckler/api/directory/newDirectory`,{directoryPath:this.state.directoryPath})
     .then(res =>{
         if(res.data.status === true){
         const {validate} = this.state;
        this.setState({validate: !validate})
         console.log(res)
         console.log(res.data)

         return alert('Directory approobed')}
         
         else {
             return  alert('Directory not approbed')
         }
     })
     .then( this.takeRegister)
    }
    else{
        alert('The directory is invalid')
    }
 }
//  check(){
//      fetch(`http://${process.env.IP_API}/buckler/api/directory/newDirectory`,{
//     method: 'POST',
//     body: JSON.stringify(this.state.directorio),
//     headers:{
//         'Accept':'application/json',
//         'Content-Type': 'application/json'
//     }
//     })
//     .then(res => res.json())
//     .then(data =>{
//         console.log(data);
//     })
//     .catch(err => console.error(err));
//  }
edit(e){
    if(confirm('¿Seguro que deseas editar?')){
    const {valida} = this.state;
this.setState({
    valida: !valida

})

}
e.preventDefault();
}

changeShow(e){
    const {validate} = this.state;
    const{_id} = this.state;
    this.setState(
        {validate: !validate},     
    );
    console.log('changed')   
    console.log(this.state._id)
    e.preventDefault();
};
    onChangePath(e){
        const {path} = this.state;
        this.setState({
            directoryPath: e.target.value
        })
        
        console.log(this.state.directoryPath)

    }

    updatePath(){
        this.takeRegister()
        console.log(this.state.id)
      axios.put(`http://${process.env.IP_API}/buckler/api/projects/updateProject`, { _id:this.state.id ,
      localPath:this.state.directoryPath,
      serverName:this.state.serverName, 
      serverHost:this.state.serverHost, 
      serverPort:this.state.serverPort,
      serverPassword:this.state.serverPassword,
      sshPath:this.state.sshPath,
      remotePath:this.state.remotePath,
      dbIp:this.state.dbIp,
      dbType:this.state.dbType,
      dbPort:this.state.dbPort,
      dbUser:this.state.dbUser,
      dbPassword:this.state.dbPassword,
      dbName:this.state.dbName,
      dbStatus:this.state.dbStatus,
      dbTime:this.state.dbTime,
      __v:this.state.__v,
      projectName:this.state.projectName

    })
        .then(res => {
            if(res.data.status === true){ 
                const{validate} = this.state;
                const{ directoryPath} = this.state;
                this.setState({validate: !validate})
                this.setState({directoryPath: ''})
                alert('saved succesfuly');
        }
        
        this.takeRegister()
    })
  
    }

    
    render(){
       
        return(
            <div>
                <h1 style={{color:'#424242', fontSize:35}}>Admin Panel <SettingsIcon style={{fontSize:30, color:'#088A68'}}/></h1>
                <div style={{background:'white', borderRadius:10}}>
                
                <Grid container justify='center' spacing={40} style={{margin:10,}}>
                <Grid item container justify='center' xs={12} sm={3} md={4}>
                    <Typography style={{fontSize:20, textAlign:'center'}}><GetAppIcon/> Backup Directory</Typography>
                    </Grid>
                    <Grid item container  xs={12} sm={8} md={4}>
                        {/* <InputDir/> */}
                        {
                            this.state.valida == false?
                        <div>
                         
                        <TextField
                            disabled
                            value = {this.state.directoryPath2}
                            onChange = {this.onChangePath}
                            id="standard-disabled"
                            label="Add a PATH"
                            style={{ margin: 0 , width: 400, color:'green'}}
                            placeholder="/usr/local/.."
                            margin="normal"
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                        
                         <Button justify='right' href="#text-buttons" style={{color:'#088A68'}}
                         onClick = {this.edit}
                         >
                                Edit
                                <EditIcon style = {{ fontSize:20}}/>
                        </Button> 
                        </div>
                        :null
                            }
                        {
                            this.state.valida == true?
                        <div>
                         
                        <TextField
                            value = {this.state.directoryPath}
                            onChange = {this.onChangePath}
                            id="standard-disabled"
                            label="Add a PATH"
                            style={{ margin: 0 , width: 400, color:'green'}}
                            placeholder="/usr/local/.."
                            margin="normal"
                        
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                        
                         <Button justify='right' href="#text-buttons" style={{color:'#088A68'}}
                         onClick = {this.check}
                         >
                                Check
                                <CheckIcon/>
                        </Button> 
                        </div>
                        :null
                            }
                        {
                            this.state.validate?
                            <div style={{marginTop:30}}>
                        
                        <TextField  
                            value={this.state.directoryPath}
                            id="standard-full-width"
                            onChange = {this.onChangePath}
                            label="Save a PATH"
                            style={{ margin: 0 , width: 400, color:'green'}}
                            placeholder="/usr/local/.."
                            margin="normal"
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                        
                         <Button justify='right' href="#text-buttons" style={{color:'#0B3142'}}
                         onClick={this.updatePath}
                         >
                                Save
                                <EditIcon/>
                        </Button> 
                        </div>
                            :null
                        }
                    </Grid>
                  
                    
                </Grid> 
                <Divider style={{margin:20}}/>
                </div>
                
               
            </div>
        )
    }
}