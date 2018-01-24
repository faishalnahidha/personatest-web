import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';

import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import MenuDrawer from '../components/MenuDrawer.jsx';

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
          justify="center"
          alignItems="center"
          className={classes.introSection}
        >
          <Button raised color="default" href="/mulai-tes">
            Mulai Persona Test
          </Button>
        </Grid>
      </div>
    );
  }
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
  currentUser: PropTypes.object,
};

export default withStyles(styles)(HomePage);
