import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link, Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';

import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import logo from '../../../icons/logo-Buckler-wh150.png';
import SettingsIcon from '@material-ui/icons/Settings';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import HomeIcon from '@material-ui/icons/Home';
import StorageIcon from '@material-ui/icons/Storage';
import './drawer.css'
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Tooltip from '@material-ui/core/Tooltip';







const drawerWidth = 60;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    background:'linear-gradient(to right, #141e30, #243b55)',
    zIndex: theme.zIndex.drawer + 1

  },
  iconLogo: {
    margin: 10,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    background:'#00796b'
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
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
  drawer:{
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    background:'#141E30'
  },
  toolbar:theme.mixins.toolbar
  ,

  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 100,
      '&:focus': {
        width: 200,
      },
    },
  },
  list: {
    width: 250,
  },
  bottom:{
    position:'absolute',
    bottom:5,
    right:10
  },
  bottomContainer:{
    textAlign:'center',
    alignContent:'center'
  }
});

class PermanentDrawerLeft extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false,
      left: false,
      openDialog: false,
      close: false,
      dbname: '',

    };
  }

  componentDidMount() {

    fetch('');

  }

  state = {

  };



  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  handleClickOpen = () => {
    this.setState({ openDialog: true });
  };

  handleClose = () => {
    this.setState({ openDialog: false });
  };

  handleCloseBackup = () => {
    this.setState({ openDialog: false });
  }

  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>
          <ListItem
            button
            component={Link}
            to="/home"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              <path d="M0 0h24v24H0z" fill="none" />
            </svg>
            <ListItemText>
                Home
            </ListItemText>
          </ListItem>
          <Divider />
          {/* <ListItem
            button
            component={Link}
            to="/backup_record"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fill="none" d="M0 0h24v24H0V0z" />
              <path d="M10 10.02h5V21h-5zM17 21h3c1.1 0 2-.9 2-2v-9h-5v11zm3-18H5c-1.1 0-2 .9-2 2v3h19V5c0-1.1-.9-2-2-2zM3 19c0 1.1.9 2 2 2h3V10H3v9z" />
            </svg>
            <ListItemText>
              Databases record
            </ListItemText>

          </ListItem> */}
          <ListItem
            button
            component={Link}
            to="/databases"
          >
            <svg width="24px" height="24px" viewBox="0 0 24 24">
              <path fill="#000000" d="M20,4A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4H20M11,13H9V15H11V13M19,13H13V15H19V13M7,9H5V11H7V9M19,9H9V11H19V9Z" />
            </svg>
            <ListItemText>
              Databases
            </ListItemText>

          </ListItem>
          <Divider/>
          {/* <Divider />
          <ListItem
            button
            component={Link}
            to="/users"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
              <path d="M0 0h24v24H0z" fill="none" />
            </svg>
            <ListItemText>
                Users
            </ListItemText>
          </ListItem> */}

            <ListItem 
            button
            component = {Link}
            to='/admin-panel'
            >
            <SettingsIcon/>
              <ListItemText>
                Settings
              </ListItemText>
            </ListItem>

            <ListItem 
            button
            component = {Link}
            to='/admin-panel2'
            >
            <SettingsIcon/>
              <ListItemText>
                Settings2
              </ListItemText>
            </ListItem>
        </List>
      </div>
    );

    return (
     

      <div className={classes.root}>
      
        <AppBar className={classes.appBar} position="fixed" >
          <Toolbar>
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
              Backer
            </Typography>
            <div className={classes.grow} />
            {/* <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{
                  'aria-label': 'search'
                }}
              />
            </div> */}
          </Toolbar>
        </AppBar>
        <Drawer variant='permanent' className='drawer'
        classes={{
          paper: classes.drawerPaper,
        }}
        style={{marginTop:20}}
        >
         <div className={classes.toolbar} />
              <List>
                <ListItem
                button
                component={Link}
                to='/home'
                >
                  <Tooltip title="Home" placement="right-start">
                <ListItemIcon style={{color:'white'}}>  <HomeIcon/> </ListItemIcon>
               </Tooltip> </ListItem>
                <ListItem
                button
                component={Link}
                to='/databases'
                >
                  <Tooltip title="Databases" placement="right-start">
                <ListItemIcon style={{color:'white'}}>  <StorageIcon/> </ListItemIcon>
               </Tooltip> </ListItem>
                <ListItem
                button
                component={Link}
                to='/admin-panel'
                >
                  <Tooltip title="Admin panel" placement="right-start">
                <ListItemIcon style={{color:'white'}} >  <SettingsIcon/> </ListItemIcon>
                </Tooltip></ListItem>
              </List>
        </Drawer>
        {/* <BottomNavigation className='bottom' position='fixed'>
      <BottomNavigationAction label="Home" value="recents" icon={<HomeIcon />}/>
      <BottomNavigationAction label="Databases" value="recents" icon={<StorageIcon />}/>
      <BottomNavigationAction label="Home" value="recents" icon={<SettingsIcon/>}/>
    </BottomNavigation> */}
       
        {/* <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
          >
            {sideList}
          </div>
        </Drawer> */}
      </div>
    );
  }
}
PermanentDrawerLeft.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PermanentDrawerLeft);
