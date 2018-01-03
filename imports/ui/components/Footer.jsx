import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { grey } from 'material-ui/colors';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';

import { drawerWidth } from '../components/MenuDrawer.jsx';

const styles = theme => ({
  footer: {
    marginTop: theme.spacing.unit * 2,
    backgroundColor: grey[300],
    width: '100%',
    minHeight: 200
  }
});

function Footer(props) {
  const { classes } = props;
  return <div className={classes.footer} />;
}

export default withStyles(styles)(Footer);
