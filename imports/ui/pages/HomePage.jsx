import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';

import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import MenuDrawer, { drawerWidth } from '../components/MenuDrawer.jsx';

const styles = theme => ({
  root: {
    padding: 0,
  },
  introSection: {
    position: 'relative',
    width: '100%',
    height: '100vh',
    background: 'linear-gradient(90deg, #7474bf, #348ac7)',
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
    const { classes } = this.props;
    const { isDrawerOpen } = this.state;

    return (
      <div className={classes.root}>
        <Header headerTitle="" handleDrawerOpen={this.handleDrawerOpen} />
        <MenuDrawer
          isOpen={isDrawerOpen}
          handleDrawerOpen={this.handleDrawerOpen}
          forceMobileDrawer
        />
        <Grid
          container
          spacing={0}
          justify="center"
          alignItems="center"
          className={classes.introSection}
        >
          <Button raised color="default" href="/mulai-tes">
            Mulai Persona Test
          </Button>
          <Button color="default" href="/otentikasi">
            Masuk
          </Button>
        </Grid>
      </div>
    );
  }
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomePage);
