import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import {
  TweenMax, TweenLite, Sine
} from 'gsap';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Link, Redirect } from 'react-router-dom';
import Logs from '../logsBackup/logs';
import './home.css';
import Lottie from 'react-lottie';
import bucklerAnimate from './cloud.json';
import Fab from '@material-ui/core/Fab';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

const styles = theme => ({
  TypographyBox:{
    padding:20,
    marginTop:0
  },
  root: {
    width: '100%',
    maxWidth: 500,
  },
  textButton: {
    marginLeft: '10px',
    marginTop: '5px',
    color: '#ffffff'
  },
  buttonBackup: {
    backgroundColor: '#00796b',
    width:200,
    marginTop:-10,
    '&:hover': {
      backgroundColor: '#004d40',

    },

  },
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width:900
  },
});
const defaultOptions = {
  loop : true,
  autoplay: true,
  rendererSettings:{
      preserveAspectRatio: 'xMidYMid slice'
  }
}


class Intro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDialog: false
    };
  }

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
    return (
      <div style={{display:'block'}}>
        <Grid container className='firstContainer'>

        
         
        </Grid>
        <Grid container justify="center" spacing={24}>
         
          
                <Dialog
                  open={this.state.openDialog}
                  onClose={this.handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">Continue with the backup</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                   ¿Are you sure to perform this action?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                    Cancel
                    </Button>
                    <Button component={Link} to="/running-backup" refresh="true" onClick={this.handleCloseBackup} color="primary" autoFocus>
                    Accept
                    </Button>
                  </DialogActions>
                </Dialog>
          </Grid>
          <Grid item xs={12}>
            <Logs />
          
          </Grid>

        <Fab variant='extended' color='blue' aria-label="Backup" style={{ background:'linear-gradient(to right, #1488cc, #2b32b2)', color:'white'}} onClick={this.handleClickOpen} className='float'>< CloudDownloadIcon style={{marginRight:10}}/>Backup </Fab>
      </div>
    );
  }
}

Intro.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Intro);
