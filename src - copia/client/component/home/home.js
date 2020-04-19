import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '../navbar/drawer';
import './home.css'
import HomeIcon from '@material-ui/icons/Home';
import StorageIcon from '@material-ui/icons/Storage';
import SettingsIcon from '@material-ui/icons/Settings';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { Link, Redirect } from 'react-router-dom';

const styles = theme => ({
  root: {
    flexGrow: 1,
    overflowY: 'hidden',
    position: 'relative',
    display: 'flex',
  }
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="App">
        <Drawer />
        <br />
        <main className='content'>{this.props.children}</main>
        <div className='containerBottom'>
        <BottomNavigation className='bottom' position='fixed'>
      <BottomNavigationAction button component={Link} to='/home' label="Home" value="recents" icon={<HomeIcon />}/>
      <BottomNavigationAction button component={Link} to='/databases' label="Databases" value="recents" icon={<StorageIcon />}/>
      <BottomNavigationAction button component={Link} to='/admin-panel' label="admin-panel" value="recents" icon={<SettingsIcon/>}/>
    </BottomNavigation> 
    </div>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Home);
