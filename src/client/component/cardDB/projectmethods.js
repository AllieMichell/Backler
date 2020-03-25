import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Projectupinfo from './startupinfo';


const propTypes = {

};


class CardMethods extends Component {
  constructor(props) {
    super(props);
    const idproject = props.match.params.idproject;
    this.state = {
      dbIp: '',
      dbName: '',
      dbPassword: '',
      dbPort: '',
      dbStatus: '',
      dbTime: '',
      dbType: '',
      dbUser: '',
      localPath: '',
      remothePath: '',
      serverHost: '',
      serverName: '',
      serverPassword: '',
      serverPort: '',
      sshConection: boolean,
      sshConection: '',
    };
  }

  componentDidMount() {
    const idproject = this.props.params.idproject;
    fetch(`http://${process.env.IP_API}/buckler/api/projects/project/${idproject}`)
      .then(response => response.json())
      .then((project) => {
        if (project.success) {
          this.setState(() => ({
            startupname: project.
            description: project.startup[0].description,
            website: project.startup[0].website,
            clients: project.startup[0].clients,
          }));
        } else {
          this.props.history.push('/home');
        }
      });
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
  }

  render() {
    return (
      <div>
        <Grid constainer spacing={24}>
          <Card>
            <CardContent>
              <Projectinfo
                handleChange={this.handleChange}
              />
            </CardContent>
          </Card>

        </Grid>
      </div>
    );
  }
}


CardMethods.propTypes = {
  match: PropTypes.object.isRequired
};


export default CardMethods;
