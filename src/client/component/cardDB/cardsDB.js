import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import {InputBase} from '@material-ui/core'
//import CardsByName from './cardsbynameDB';
import { makeStyles } from '@material-ui/core/styles';
import Loading from '../loading/loading';
import AccountCircle from '@material-ui/icons/AccountCircle';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import { fade } from '@material-ui/core/styles/colorManipulator';
import notFound from '../../../icons/not-found2.png'
import GetAppIcon from '@material-ui/icons/GetApp';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import axios from 'axios';
import './cards.css'
// const useStyles = makeStyles( theme => ({
//   margin:{
//     margin:theme.spacing(1),
//   },
// }));
const styles = theme => ({
  card: {
    margin: 20,
    pading:10,
    },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    marginLeft: '20px'
  },
  button: {
    backgroundColor: '#00796b',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#004d40',
    },

    
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor:'white',
    '&:hover': {
      backgroundColor: 'white',
    },
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
      boxShadow: '6px 10px 15px -9px rgba(0,0,0,0.46)',
      
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
      inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 200,
      '&:focus': {
        width: 200,
      },
    },
  },
    
    grow: {
    flexGrow: 1,
    alignContent:'center'
  }
});

class RecipeReviewCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: [],
      isLoading: false,
      expanded: false,
      search:'',
      data: {},
      nameProject:'hols',
      idProject:'5d6ed1ce955c1d14ec4d26d3'
    };
  }
  updateSearch(e){
    this.setState({search: e.target.value.substr(0,50)});
  }

  
  componentDidMount() {
    this.setState({ isLoading: true });
    fetch(`http://${process.env.IP_API}/backler/api/projects/projectsList`)
      .then(response => response.json())
      .then((json) => {
        console.log(json);
        this.setState({
          logs: json,
          isLoading: false,
          anchorEl: null
        });
      });  
  }

  // searchdb(e){
  //   fetch(`http://localhost:3100/Buckler/api/projects/nameP/${'Buckler'}`)
  // .then(response => response.json())
  // .then( (json) => {
  //   console.log(json);
  //   this.setState({
  //     data: json
  //   });
  // });
  // }



  



  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    // const getDownload = axios.get(`http://${process.env.IP_API}/buckler/api/functions/downloadProjectID/${this.state.idProject}`)
    // const getDownloadString = String(getDownload);
    const { classes } = this.props;
    const { logs, isLoading, anchorEl } = this.state;
    // const styl = useStyles();
    
      var filteredLogs = this.state.logs;
    
       if(this.state.search.length >=2){
       filteredLogs = this.state.logs.filter(

      (project) => {     
      return project.projectName.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
      // return project.dbType.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
      //return project.serverName.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
       
      } );}
      const showMessage = () => {
        if(filteredLogs.length <= 0){
          return <div style = {{marginTop: 140}}>
            <img src ={notFound} width = {100}></img>
            <Typography style = {{color:"#585858", fontSize:24}} variant="h3" gutterBottom>
              No results found</Typography>
          </div>
        } 
      }
    

    if (isLoading) {
      return <Loading />;
    }
  
    return (
      <div >
        
        <Grid container justify = 'center' style={{marginBottom: 30}}>  
       <Grid item xs= {6}>
        <div className={classes.grow} />
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
              className='search'
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{
                  'aria-label': 'search'
                }}
                value={this.state.search}
                onChange={this.updateSearch.bind(this)}
              />
            </div> 
            <div>{showMessage()}</div>
            </Grid>
            </Grid>

              
            
        {/* <div style = {{paddingBottom:20}}>
        <Grid xs={6} style={{background:"red"}} container justify = 'center'  alignItems="flex-end">
          <Grid item  >
          <SearchIcon />
          </Grid>
          <Grid item xs = {6}>
            <TextField 
            id="input-with-icon-grid"
            label="Search by name" 
            type ='text'
            value = {this.state.search}
            onChange ={this.updateSearch.bind(this)}
            />
          </Grid>
        </Grid>
      </div> */}
   
        <Grid container>

           { filteredLogs.map(item => (
              <Grid item xs={12} sm={6} md={4} style={{padding:20}} >
                  <Card>
                  <CardActionArea 
                  component={Link}
                  to={`/project-backup/${item._id}`}
                  >
                  {(() => {
                          switch (item.dbType) {
                            case 'mysql':
                              return (
                                <CardMedia
                                component="img"
                                alt="Contemplative Reptile"
                                height="150"
                                image="https://lrodrigo.sgs.lncc.br/wp/wp-content/uploads/2013/07/mysql-banner.png"
                                title="Contemplative Reptile"
                              />
                              );
                            case 'mongodb':
                              return (
                                <CardMedia 
                                  className='mongodb'
                                  component="img"
                                  alt="Contemplative Reptile"
                                  height="150"
                                  image="https://safenet.gemalto.es/uploadedImages/images/Logos/mongodb-logo.png"
                                  title="Contemplative Reptile"
                                />

                              );
                            case 'jenkins':
                              return (
                                <CardMedia
                                  component="img"
                                  alt="Contemplative Reptile"
                                  height="150"
                                  image="https://cdn.nearsoft.com/uploads/2019/12/jenkins-banner.png"
                                  title="Contemplative Reptile"
                                />
                              );
                            default:
                              return null;
                          }
                        })()}
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {item.projectName}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        {item.localPath}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions style={{display:'flex', justifyContent:'center'}}>
                    <Button size="small" color="primary"
                     component={Link}
                     to={`/project-backup/${item._id}`}
                    >
                      See More
                    </Button>
                    <Button size="small" color="primary"
                    href={`http://${process.env.IP_API}/buckler/api/functions/downloadProjectID/${item._id}`}  
                    >
                      Download
                      <GetAppIcon style={{fontSize:17}}/>
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
           ))}

        </Grid>

      </div>

      
    );
    
  }
}

RecipeReviewCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecipeReviewCard);
