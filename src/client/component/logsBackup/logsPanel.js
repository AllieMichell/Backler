/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';


const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    marginTop: 5,
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
    colorButton: {
      color: '#00695c'
    },
  },
  successful: {
    "'&:hover'": {
      color: '#00695c'
    }
  },
  textIp: {
    wordBreak: 'break-all'
  },
  columLog: {
    marginTop: 30
  },
  columInfo: {
    marginBottom: 20
  },
  button: {
    backgroundColor: '#00695c',
    color: '#ffffff'
  },
  headingText: {
    background: '#00695c',
    // columnCount: 3,
    padding: '10px',
    textAlign: '-webkit-center',
  },
  textHead: {
    color: '#ffffff',
    textAlign: '-webkit-center',
  }

});

const LogsPanel = props => (
  <div>
    <Grid container spacing={24}>
      <Grid item xs={12}>
        <div>
          <Typography component="h2" variant="display1">
          Last Backups
          </Typography>
        </div>
      </Grid>

      <Grid item xs={12}>
        <div>
          <Paper className={props.classes.headingText}>
            <Grid container>
              <Grid item xs={4}>
                <Typography variant="subheading" gutterBottom className={props.classes.textHead}>
                       Project
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="subheading" gutterBottom className={props.classes.textHead}>
                       Type
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="subheading" gutterBottom className={props.classes.textHead}>
                       Status
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </div>
      </Grid>

      <Grid item xs={12}>
        <div>
          {props.logs.map(log => (
            <ExpansionPanel defaultExpanded={false} key={log._id}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Grid item xs={4}>
                  <div className={props.classes.column}>
                    <Typography className={props.classes.heading}>
                      {log.projectName}
                    </Typography>
                  </div>
                </Grid>
                <Grid item xs={4}>
                  <div className={props.classes.column}>
                    <Typography>

                      {log.typeFile}
                    </Typography>
                  </div>
                </Grid>
                <Grid item xs={4}>
                  <div>
                    <div>
                      {(() => {
                        switch (log.status) {
                          case 'successful':
                            return (
                              <svg
                                style={{ width: '27px', height: '27px' }}
                                viewBox="0 0 24 24"
                              >
                                <path
                                  fill="#558b2f"
                                  d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z"
                                />
                              </svg>
                            );
                          case 'error':
                            return (
                              <svg
                                style={{ width: '27px', height: '27px' }}
                                viewBox="0 0 24 24"
                              >
                                <path
                                  fill="#d32f2f"
                                  d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z"
                                />
                              </svg>
                            );
                          case 'warning':
                            return (
                              <svg
                                style={{ width: '27px', height: '27px' }}
                                viewBox="0 0 24 24"
                              >
                                <path fill="#ffab00" d="M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z" />
                              </svg>
                            );
                          default:
                            return null;
                        }
                      })()}
                    </div>
                  </div>
                </Grid>

              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid item xs={12}>
                  <div>
                    <div className={props.classes.columInfo}>
                      <Typography>
                  IP:
                        {' '}
                        {log.ip}
                      </Typography>
                      <Typography>
                  Hour:
                        {' '}
                        {log.hour}
                      </Typography>
                      <Typography>
                  Path:
                        {' '}
                        {log.pathLocation}
                      </Typography>
                    </div>
                    <Divider />
                    <div className={props.classes.columLog}>
                      <Typography>
                  Log:
                        {' '}
                        {log.message}
                      </Typography>
                    </div>
                  </div>
                </Grid>
              </ExpansionPanelDetails>
              <Divider />

            </ExpansionPanel>
          ))}

        </div>
      </Grid>
    </Grid>
  </div>


);

LogsPanel.propTypes = {
  logs: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LogsPanel);
