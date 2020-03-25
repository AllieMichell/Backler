import React from 'react';
import {Component} from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import './logs-table.css'
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import WifiTetheringIcon from '@material-ui/icons/WifiTethering';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Divider from '@material-ui/core/Divider';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import CircularProgress from '@material-ui/core/CircularProgress';
import Pagination from './pagination'
import './pagination.css'
import { Button } from '@material-ui/core'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import GetAppIcon from '@material-ui/icons/GetApp';




export default class TableLogs extends Component{
    constructor(props){

        super(props);
        this.state={
        logs:[],
        loading:true,
        logsPerPage: 10,
        currentPage:1,
        pageNumber:[]


        }
    }

    componentDidMount(){
       

        axios.get(`http://${process.env.IP_API}/buckler/api/logs/logsName/${this.props.namep}`)
        .then(response => {
            this.setState({
                logs:response.data,
                loading:false

            })
        })

    }

   
    
    
    render(){
        
        const {classes} = this.props;
        const logs = this.state.logs;
        
        const indexOfLastLog = this.state.currentPage * this.state.logsPerPage;
        const indexOfFirstLog = indexOfLastLog - this.state.logsPerPage;
        const currentLog = this.state.logs.slice(indexOfFirstLog, indexOfLastLog);
        const pageNumbers = [];
        const gradient = 'background: linear-gradient(to right, #064543, #097355)'
        for(let i = 1; i <= Math.ceil(this.state.logs.length /this.state.logsPerPage);i++){
            pageNumbers.push(i)
        }
        const back = () => {
            if(this.state.currentPage > 1){
                this.setState({
                    currentPage:this.state.currentPage - 1
                })
            }
        }
        const next = () => {
            if(this.state.currentPage < pageNumbers.length){
                this.setState({
                    currentPage:this.state.currentPage + 1
                })
            }

        }
        const paginate = pageNumber =>{
            this.setState({
                currentPage:pageNumber
            })
            
        }
        return(
        <div>
           
            
            <Grid container spacing={24}>
                <Grid item xs = {12}>
                    <div>
                        
                    </div>
                </Grid>
                <Grid item xs={12}>
                <div>
                    <Paper style={{textAlign:'center', padding:10}} >
                    <Grid container>
                        <Grid item xs={4}>
                        <Typography className='sectionTable' variant="subheading" gutterBotto style={{display:'flex', textAlign:'center', justifyContent:'center'}}>
                         Status <HelpOutlineIcon/>   
                        </Typography>
                        </Grid>
                        <Grid item xs={4}>
                        <Typography className='sectionTable' variant="subheading" gutterBottom style={{textAlign:'center', display:'flex', justifyContent:'center'}}>
                         Hour <QueryBuilderIcon/>
                        </Typography>
                        </Grid>
                        <Grid item xs={4}>
                        <Typography className='sectionTable'variant="subheading" gutterBottom style={{alignContent:'center', display:'flex', justifyContent:'center'}}>
                         Path  <FolderOpenIcon/>
                        </Typography>
                        </Grid>
                        
                            </Grid>
                    </Paper>
                </div>
                </Grid>
                <Grid item xs={12}>
                {
                this.state.loading == true?
                <CircularProgress/>
                
                :null
            }
                    <div>
                        {
                            currentLog.map(logs =>(
                                <ExpansionPanel defaultExpanded={false} key={logs._id}>
                                    <ExpansionPanelSummary expandIcon={<ArrowDropDownIcon/>}>
                                        <Grid item xs={4}>
                                            <div>
                                                <Typography>
                                                    {
                                                        logs.status == 'successful'?
                                                             
                                                            <CheckCircleIcon style={{color:'#38A905'}}/>
                                                        :null
                                                    }
                                                     {
                                                        logs.status != 'successful'?
                                                             
                                                            <CancelIcon style={{color:'#C80F0A'}}/>
                                                        :null
                                                    }
                                                </Typography>
                                            </div>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <div>
                                                <Typography>
                                                    {logs.hour}
                                                </Typography>
                                            </div>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <div>
                                                <Typography style={{overflow:'hidden'}}>
                                                    {logs.pathLocation}
                                                </Typography>
                                            </div>
                                        </Grid>
                                        

                                    </ExpansionPanelSummary>

                                        <Divider/>
                                        
                                        <ExpansionPanelDetails>
                                            <Grid item xs={12}>
                                                <div>
                                                   <Typography>
                                                       {logs.message}
                                                   </Typography>
                                                </div>
                                                <div>
                                                {
                                                    logs._id == this.state.logs[0]._id || logs._id ==  this.state.logs[1]._id || logs._id ==  this.state.logs[2]._id?
                                                    
                                                    <Button
                                                    type ='download' 
                                                    href={`#`}
                                                    style={{background:'#07594A', color:'white', marginTop:20}}>Download <GetAppIcon style={{marginLeft:5}}/> </Button>
                                                    
                                                    :null
                                                }
                                                 </div>
                                            </Grid>
                                        </ExpansionPanelDetails>

                                </ExpansionPanel>
                            ))
                        }
                    </div>

                </Grid>



            </Grid>
            {
                pageNumbers.length > 1?
            <Grid className='Grid' container justify='center'>
            <div className='buttonContainer' style={{background:'white', borderRadius:5}}>
                        <Button onClick = {() => back()}>
                        <ArrowBackIosIcon style={{color:'black', width:15}}/>
                        </Button>
            {
                pageNumbers.map(number => (
                    
                    <Button onClick = {() => paginate(number)} style={{background: this.state.currentPage == number? '#08594A' : 'white', color: this.state.currentPage == number ? 'white' : 'black'}}> 
                        {number}
                    </Button>
                ))
            }
            <Button onClick = {() => next()}>
                <ArrowForwardIosIcon style={{color:'black', width:15}}/>                
            </Button>
            </div>
            
        </Grid>
        :null
           }
        </div>
        )

    }
}