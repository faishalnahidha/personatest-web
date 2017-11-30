import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

const styles = theme => ({
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  appBar: {
    background: 'linear-gradient(45deg, #7474bf, #348ac7)'
    //background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
  }
});

class Header extends Component {
  render() {
    return (
      <AppBar className={this.props.classes.appBar}>
        <Toolbar>
          <IconButton
            className={this.props.classes.menuButton}
            color="contrast"
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography
            type="title"
            color="inherit"
            className={this.props.classes.flex}
          >
            Persona Test
          </Typography>
          <Button color="contrast">Login</Button>
        </Toolbar>
      </AppBar>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
