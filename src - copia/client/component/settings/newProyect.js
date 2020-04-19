import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import SaveAltIcon from '@material-ui/icons/SaveAlt';


export default class CreateProyect extends Component{
    constructor(){
        super();
        this.nextStep = this.nextStep.bind(this);
        this.backStep = this.backStep.bind(this);
        this.state = {
        addNew: false,
        step: 1
        }
    }

    nextStep(){
        const {step} = this.state;
        this.setState({
            step:step + 1
            
        })
    }
    backStep(){
        const {step} = this.state;
        this.setState({
            step:step - 1
        })
    }

    postCreate(){

        axios.post(`http://${process.env.IP_API}/buckler/api/projects/newProject`, {
            
        })
    }
    render(){
        switch(this.state.step){
        case 1:
        return(
            <Grid container justify='center'>
            
            <div style = {{background:'white', padding: 10, borderRadius: 10, width: 500, paddingBottom:60, boxShadow:'4px 11px 27px -12px rgba(0,0,0,0.28)'}}>

           
                <Grid>
                <Grid container justify='right'>
             <Button style = {{color:'black', borderRadius:100}}
                onClick={this.props.close}>
                <CloseIcon/>
                </Button>
                
                    </Grid>
                 <Grid container justify='center'>
                 <Grid item  xs={12}  style={{marginBottom:20}}>
                 <TextField
                 style={{width:300}}
                     id="standard-name"
                     label="Project Name "
                     value={null}
     
                     margin="normal"
                 />
                  </Grid>
                  <Button variant='contained' style = {{background:'#088A68', color:'white'}}
                onClick={this.nextStep}
                >
                Next
                </Button>
                 
                  
                 </Grid>
            </Grid>

            
            </div>
            </Grid>
        )
        

        case 2: 
        return(
            
            <Grid container justify='center'>
            
            <div style = {{background:'white', padding: 30, borderRadius: 10, width: 500,  boxShadow:'4px 11px 27px -12px rgba(0,0,0,0.28)'}}>
            <Grid container justify='end' style={{alignContent:'right'}}>
            <Button style = {{color:'black', borderRadius:100}}
               onClick={this.props.close}>
               <CloseIcon/>
               </Button>
               
                   </Grid>
           <h3>SERVER INFORMATION</h3>
                <Grid>
               
               
                
                
                 <Grid container justify='center'>
                 <Grid item  xs={12}>
                 <TextField
                 style={{width:300}}
                     id="standard-name"
                     label="Server Name "
                     value={null}
     
                     margin="normal"
                 />
                  </Grid>
                  <Grid item  xs={12}>
                 <TextField
                 style={{width:300}}
                     id="standard-name"
                     label="Server Host "
                     value={null}
     
                     margin="normal"
                 />
                  </Grid>
                  <Grid item  xs={12}>
                 <TextField
                 style={{width:300}}
                     id="standard-name"
                     label="Server Port "
                     value={null}
     
                     margin="normal"
                 />
                  </Grid>
                  <Grid item  xs={12} style={{marginBottom:20}}>
                 <TextField
                 style={{width:300}}
                     id="standard-name"
                     label="Server Password "
                     value={null}
     
                     margin="normal"
                 />
                  </Grid>
                  <br></br>
                  <Button variant='contained' style = {{background:'#088A68', color:'white'}}
                onClick={this.backStep}
                >
                Back
                </Button>
                  <Button variant='contained' style = {{background:'#088A68', color:'white', marginLeft:10}}
                onClick={this.nextStep}
                >
                Next
                </Button>
                
                 
                  
                 </Grid>
            </Grid>

            
            </div>
            </Grid>
        )
        case 3: return(
            <Grid container justify='center'>
            <div style = {{background:'white', padding: 30, borderRadius: 10, width: 500,  boxShadow:'4px 11px 27px -12px rgba(0,0,0,0.28)'}}>
            <Grid container justify='end' style={{alignContent:'right'}}>
            <Button style = {{color:'black', borderRadius:100}}
               onClick={this.props.close}>
               <CloseIcon/>
               </Button>
                   </Grid>
           <h3>PATH INFORMATION</h3>
                <Grid>
               
               
                
                
                 <Grid container justify='center'>
                 <Grid item  xs={12}>
                 <TextField
                 style={{width:300}}
                     id="standard-name"
                     label="ssh Connection "
                     value={null}
     
                     margin="normal"
                 />
                  </Grid>
                  <Grid item  xs={12}>
                 <TextField
                 style={{width:300}}
                     id="standard-name"
                     label="ssh Path "
                     value={null}
     
                     margin="normal"
                 />
                  </Grid>
                  <Grid item  xs={12}>
                 <TextField
                 style={{width:300}}
                     id="standard-name"
                     label="remote Path"
                     value={null}
     
                     margin="normal"
                 />
                  </Grid>
                  <Grid item  xs={12} style={{marginBottom:20}} >
                 <TextField
                 style={{width:300}}
                     id="standard-name"
                     label="local Path "
                     value={null}
     
                     margin="normal"
                 />
                  </Grid>
                  <Button variant='contained' style = {{background:'#088A68', color:'white'}}
                onClick={this.backStep}
                >
                Back
                </Button>
                  <Button variant='contained' style = {{background:'#088A68', color:'white', marginLeft:10}}
                onClick={this.nextStep}
                >
                Next
                </Button>
                
                 
                  
                 </Grid>
            </Grid>

            
            </div>
            </Grid>
            
        )
        case 4: return(
            <Grid container justify='center'>
            <div style = {{background:'white', padding: 30, borderRadius: 10, width: 500,  boxShadow:'4px 11px 27px -12px rgba(0,0,0,0.28)'}}>
            <Grid container justify='end' style={{alignContent:'right'}}>
            <Button style = {{color:'black', borderRadius:100}}
               onClick={this.props.close}>
               <CloseIcon/>
               </Button>
                   </Grid>
           <h3> DB INFORMATION </h3>
                <Grid>
               
               
                
                
                 <Grid container justify='center'>
                 <Grid item  xs={12}>
                 <TextField
                 style={{width:300}}
                     id="standard-name"
                     label=" db Ip "
                     value={null}
     
                     margin="normal"
                 />
                  </Grid>
                  <Grid item  xs={12}>
                 <TextField
                 style={{width:300}}
                     id="standard-name"
                     label="db Type "
                     value={null}
     
                     margin="normal"
                 />
                  </Grid>
                  <Grid item  xs={12}>
                 <TextField
                 style={{width:300}}
                     id="standard-name"
                     label="db Port"
                     value={null}
     
                     margin="normal"
                 />
                  </Grid>
                  <Grid item  xs={12} style={{marginBottom:20}} >
                 <TextField
                 style={{width:300}}
                     id="standard-name"
                     label="db User"
                     value={null}
     
                     margin="normal"
                 />
                  </Grid>
                  <Button variant='contained' style = {{background:'#088A68', color:'white'}}
                onClick={this.backStep}
                >
                Back
                </Button>
                  <Button variant='contained' style = {{background:'#088A68', color:'white', marginLeft:10}}
                onClick={this.nextStep}
                >
                Next
                </Button>
                
                 
                  
                 </Grid>
            </Grid>

            
            </div>
            </Grid>


        )
        case 5: return(
            <Grid container justify='center'>
            <div style = {{background:'white', padding: 30, borderRadius: 10, width: 500,  boxShadow:'4px 11px 27px -12px rgba(0,0,0,0.28)'}}>
            <Grid container justify='end' style={{alignContent:'right'}}>
            <Button style = {{color:'black', borderRadius:100}}
               onClick={this.props.close}>
               <CloseIcon/>
               </Button>
                   </Grid>
           <h3> DB INFORMATION </h3>
                <Grid>
               
               
                
                
                 <Grid container justify='center'>
                 <Grid item  xs={12}>
                 <TextField
                 style={{width:300}}
                     id="standard-name"
                     label=" db Password "
                     value={null}
     
                     margin="normal"
                 />
                  </Grid>
                  <Grid item  xs={12}>
                 <TextField
                 style={{width:300}}
                     id="standard-name"
                     label="db Name "
                     value={null}
     
                     margin="normal"
                 />
                  </Grid>
                  <Grid item  xs={12}>
                 <TextField
                 style={{width:300}}
                     id="standard-name"
                     label="db Status"
                     value={null}
     
                     margin="normal"
                 />
                  </Grid>
                  <Grid item  xs={12} style={{marginBottom:20}}>
                 <TextField
                 style={{width:300}}
                     id="standard-name"
                     label="db Time"
                     value={null}
     
                     margin="normal"
                 />
                  </Grid>
                  <Button variant='contained' style = {{background:'#088A68', color:'white'}}
                onClick={this.backStep}
                >
                Back
                </Button>
                  <Button variant='contained' style = {{background:'linear-gradient(to right, #064040, #088A68)', color:'white', marginLeft:10}}
                onClick={this.nextStep}
                >
                Save <SaveAltIcon/>
                </Button>
                
                 
                  
                 </Grid>
            </Grid>

            
            </div>
            </Grid>
        )


        }
        
    }
}