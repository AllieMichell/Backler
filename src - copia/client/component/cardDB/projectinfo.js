import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import InlineEdit from 'react-edit-inplace';
import TextField from '@material-ui/core/TextField';


const Projectinfo = props => (
  <div>
    <Grid container justify="center" spacing={24}>
      <Grid item xs={12}>
        <div style={{ textAlign: 'center' }}>
          <InlineEdit

            paramName="message"


            style={{
              minWidth: 150,
              display: 'inline-block',
              margin: '0 auto 16px auto',
              padding: 0,
              fontSize: 40,
              outline: 0,
              border: 0,
              fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
              color: 'grey'
            }}
          />
        </div>
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="outlined-name"
          label="Name"

          margin="normal"
          variant="outlined"
        />
      </Grid>
    </Grid>
  </div>
);


Projectinfo.propTypes = {
};


export default Projectinfo;
