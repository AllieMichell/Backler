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
import bucklerAnimate from './BucklerAnimate.json';

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
      <div>
        <Grid container className='firstContainer'>
          <Grid item xs={6} className='text-desktop' >
            <div style={{textAlign:'left'}}>
              <h3>
              Protect your databases every day
              </h3>
              <Button variant="contained" color="primary" className={classes.buttonBackup} onClick={this.handleClickOpen}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path fill="#ffffff" d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z" />
                  </svg>
                  <Typography component="h2" className={classes.textButton} gutterBottom>
                    Backup
                  </Typography>
                </Button>
            </div>
          </Grid>
          <Grid item xs ={6} className='animation'>
            <div>
            <Lottie options={{animationData:bucklerAnimate, ...defaultOptions }} style={{padding:30, width:300}}/>
            </div>
          </Grid>
          <Grid xs = {12} className = 'text-movil'>
              <h3>
                Protect your databases every day
              </h3>
              <Button variant="contained" color="primary" className={classes.buttonBackup} onClick={this.handleClickOpen}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path fill="#ffffff" d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z" />
                  </svg>
                  <Typography component="h2" className={classes.textButton} gutterBottom>
                    Backup
                  </Typography>
                </Button>
          </Grid>
        </Grid>
        <Grid container justify="center" spacing={24}>
         
          <Grid item xs={12}>
            <div className={classes.TypographyBox} style={{marginTop:0}}>
            <div className = 'backupIntro'>
                </div>
              <div className={classes.grow}>
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
              </div>
            </div>
          </Grid>
          <Grid item xs={12}>
            <Logs />
          </Grid>
        </Grid>

      </div>
    );
  }
}

Intro.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Intro);
