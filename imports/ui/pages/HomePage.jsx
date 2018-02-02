import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import MenuDrawer from '../components/MenuDrawer.jsx';

const styles = theme => ({
  root: {
    padding: 0,
    backgroundColor: '#e0e0e0',
  },
  introSection: {
    width: '100%',
    height: '100vh',
    background: 'linear-gradient(90deg, #7474bf, #348ac7)',
    overflow: 'hidden',
    color: '#fff',
  },
  imageContainer: {},
  image: {
    width: '100%',
    marginBottom: -8,
  },
  titleContainer: {
    marginTop: theme.spacing.unit * 10,
  },
  buttonMulai: {
    marginTop: theme.spacing.unit * 4,
  },
});

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDrawerOpen: false,
    };
  }

  handleDrawerOpen = () => {
    const isDrawerOpen = !this.state.isDrawerOpen;
    this.setState({ isDrawerOpen });
  };

  render() {
    const { currentUser, classes } = this.props;
    const { isDrawerOpen } = this.state;
    // console.log(`Session.get(newPlayerId): ${Session.get('newPlayerId')}`);

    return (
      <div className={classes.root}>
        <Header headerTitle="" currentUser={currentUser} handleDrawerOpen={this.handleDrawerOpen} />
        <MenuDrawer
          isOpen={isDrawerOpen}
          handleDrawerOpen={this.handleDrawerOpen}
          currentUser={currentUser}
          forceMobileDrawer
        />
        <Grid
          container
          spacing={0}
          direction="row"
          justify="center"
          alignItems="flex-end"
          className={classes.introSection}
        >
          <Grid item xs={11} sm={10} md={8} lg={6} className={classes.titleContainer}>
            <Grid container spacing={0} direction="column" alignItems="center">
              <Typography type="display2" color="inherit" align="center" gutterBottom>
                Persona - Panduan Karir
              </Typography>
              <Typography type="headline" color="inherit" align="center" gutterBottom>
                Panduan 16 Tipe Kepribadian & Bakat Manusia dalam Memilih Karir Terbaik
              </Typography>
              <Button
                raised
                color="secondary"
                component={Link}
                to="/mulai-tes"
                className={classes.buttonMulai}
              >
                Mulai Sekarang
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={11} md={10} lg={8} className={classes.imageContainer}>
            <img src="/img/home-image.png" alt="persona home" className={classes.image} />
          </Grid>
        </Grid>
        <Footer />
      </div>
    );
  }
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
  currentUser: PropTypes.object,
};

export default withStyles(styles)(HomePage);
