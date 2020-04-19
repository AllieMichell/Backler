import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import LogsPanel from './logsPanel';
import Loading from '../loading/loading';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
//import dotenv from '@dotenv';

const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: 'transparent',
        marginTop:-50

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
        marginTop: 20
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
    },
    colorButton: {
        backgorundColor: '#00695c'
    },
    textIp: {
        wordBreak: 'break-all'
    },
    logBox: {
        opacity: 0.3,
    },
    textButton: {
        marginLeft: '10px',
        marginTop: '5px',
        color: '#ffffff'
    },
    buttonBackup: {
        backgroundColor: '#00796b',
        '&:hover': {
            backgroundColor: '#004d40',
        },
    },
    paper: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
    progress: {
        margin: theme.spacing.unit * 4,
        color: '#004d40'
    },
});

class logsBackup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            log: [],
            isLoading: false
        };
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        const config = {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        };
        fetch(`http://${process.env.IP_API}/backler/api/logs/getLogs`, config)
            .then(response => response.json())
            .then((json) => {
                console.log(json);
                console.log(process.env.IPAPI);
                if (json.status) {
                    this.setState({
                        log: json.Logs,
                        isLoading: false
                    });
                } else {
                    console.log('error');
                }
            });
    }

    render() {
        const numerLogs = this.state.log.length;
        const { classes } = this.props;
        const { isLoading } = this.state;
        if (isLoading) {
            return ( < div > < CircularProgress className = { classes.progress }
                /></div > );
        }

        return ( <div className = { classes.root } >
            < Grid container justify = "center"
            spacing = { 24 } >
                <Grid item xs = {4}>
                <Card >
                    <CardContent>
                        <Typography variant="h5" component="h2" style={{fontSize:50 , fontWeight:'bold'}}>
                            {numerLogs}
                        </Typography>
                        <Typography color="textSecondary" style={{fontSize:15 , fontWeight:'bold'}}  gutterBottom> 
                            Bases de Datos
                        </Typography>
                    </CardContent>
                </Card>
                </Grid>
                <Grid item xs = {4}>
                <Card >
                    <CardContent>
                        <Typography variant="h5" component="h2" style={{fontSize:50 , fontWeight:'bold', color:'green'}}>
                            {numerLogs}
                        </Typography>
                        <Typography color="textSecondary" style={{fontSize:15 , fontWeight:'bold'}}  gutterBottom> 
                            Backups exitosos
                        </Typography>
                    </CardContent>
                </Card>
                </Grid>
                <Grid item xs = {4}>
                <Card >
                    <CardContent>
                        <Typography variant="h5" component="h2" style={{fontSize:50 , fontWeight:'bold', color:'red'}}>
                            {0}
                        </Typography>
                        <Typography color="textSecondary" style={{fontSize:15 , fontWeight:'bold'}}  gutterBottom> 
                            Errores
                        </Typography>
                    </CardContent>
                </Card>
                </Grid>
            <Grid item xs = { 12 } >
            <LogsPanel logs = { this.state.log }
            styles = { classes }
            /> </Grid> </Grid> </div>
        );
    }
}

logsBackup.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(logsBackup);