import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const HomeRoute = ({ exact = true, path }) => (
  <Route
    exact={exact}
    path={path}
    render={() => (
      <Redirect
        to={{
          pathname: '/home'
        }}
      />
    )}
  />
);

HomeRoute.propTypes = {
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool.isRequired
};

export default HomeRoute;
