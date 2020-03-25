import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import CloseIcon from '@material-ui/icons/Close';
import classNames from 'classnames';
import Loading from '../loading/loading';
import Logs from '../logsBackup/logs';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: 'transparent'
  },
  margin: {
    margin: theme.spacing.unit,
  },

});

const variantIcon = {
  success: CheckCircleIcon,
  error: ErrorIcon,
};

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

function MySnackbarContent(props) {
  const {
    classes, className, message, onClose, variant, ...other
  } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
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
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

class logsBackup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: [],
      isLoading: false,
      error: false,
      open: true,
      test: false,
    };
  }

  componentDidMount() {
    console.log('entro en el proceso');
    
    this.timer = setInterval(
      () => this.setState(prevState => ({ isLoading: !prevState.test })),
      10000,
    );
    console.log('salio del proceso');
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };

  renderDiv() {
    if (this.state.isLoading) {
      return (
        <div>
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            open={this.state.open}
            autoHideDuration={6000}
            onClose={this.handleClose}
          >
            <MySnackbarContentWrapper
              onClose={this.handleClose}
              variant="success"
              message="Backup completed"
            />
          </Snackbar>
          <Logs />
          <div>
              run
          </div>
        </div>
      );
    }
    return (<Loading />);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        {this.renderDiv()}
      </div>
    );
  }
}

logsBackup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(logsBackup);
