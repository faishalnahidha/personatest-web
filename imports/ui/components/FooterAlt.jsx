import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { grey } from 'material-ui/colors';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

import { drawerWidth } from './MenuDrawer.jsx';

const styles = theme => ({
  footer: {
    [theme.breakpoints.up('sm')]: {
      padding: '40px',

    },
    [theme.breakpoints.down('xs')]: {
      padding: '24px 16px 24px 8px',
    },
    marginTop: theme.spacing.unit * 5,
    backgroundColor: grey[100],
    width: '100%',
    minHeight: 120,
  },
  buttonLink: {
    // color: '#fff',
    textTransform: 'none',
  },
  text: {
    // color: '#fff',
  },
  footerShift: {
    [theme.breakpoints.up('lg')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
  },
});

function FooterAlt(props) {
  const { classes, isDrawerOpen } = props;
  return (
  // <div className={classes.footer} >
    <div className={classnames(classes.footer, {
        [classes.footerShift]: isDrawerOpen,
      })}
    >
      <Grid
        container
        spacing={24}
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item xs={12} sm={6} md={6}>
          <Button color="primary" href="https://persona.my.id/" target="_blank" className={classes.buttonLink}>Buku Persona</Button>
          <Button color="primary" href="https://persona.my.id/blog/" target="_blank" className={classes.buttonLink}>Blog</Button>
          <Button color="primary" href="https://www.instagram.com/persona.id/" target="_blank" className={classes.buttonLink}>Instagram</Button>
        </Grid>
        <Grid item xs={12} sm={6} md={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Typography variant="body1" className={classes.text}>Persona © 2016–2024</Typography>
        </Grid>
      </Grid>
    </div>
  );
}

FooterAlt.propTypes = {
  classes: PropTypes.object.isRequired,
  isDrawerOpen: PropTypes.bool,
};

export default withStyles(styles)(FooterAlt);
