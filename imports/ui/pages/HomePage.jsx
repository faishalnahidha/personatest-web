import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';

import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import MenuDrawer, { drawerWidth } from '../components/MenuDrawer.jsx';

const styles = theme => ({
  root: {
    display: 'flex',
    height: '100vh',
    alignItems: 'center',
    padding: 0,
  },
});

function HomePage(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Header headerTitle="Persona Web" />
      <Grid container spacing={0} justify="center" alignItems="center">
        <Button raised color="primary" href="/mulai-tes">
          Mulai Persona Test
        </Button>
      </Grid>
    </div>
  );
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomePage);
