import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';

import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Popover from 'material-ui/Popover';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import Menu from 'material-ui-icons/Menu';

import AvatarChipPopover from '../components/AvatarChipPopover.jsx';

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
  },
  avatar: {
    width: 32,
    height: 32,
    //background: 'linear-gradient(to right, #50c9c3, #96deda)'
    //backgroundColor: 'rgba(255, 255, 255, 0.5)'
    backgroundColor: '#20e3b2'
  },
  chip: {
    height: 32,
    color: 'fff',
    backgroundColor: 'rgba(255, 255, 255, 0.25)'
  },
  chipLabel: {
    color: '#fff'
  },
  popoverPaper: {
    width: 200
  }
});

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chipOpen: false,
      anchorEl: null
    };

    this.handleChipClick = this.handleChipClick.bind(this);
    this.handleChipClose = this.handleChipClose.bind(this);
  }

  handleChipClick() {
    this.setState({
      chipOpen: true,
      anchorEl: findDOMNode(this.refs.chip)
    });
  }

  handleChipClose() {
    this.setState({
      chipOpen: false
    });
  }

  render() {
    const { classes, newPlayer, score } = this.props;
    const avatarLetter = newPlayer.charAt(0);

    return (
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="contrast"
            aria-label="Menu"
          >
            <Menu />
          </IconButton>
          <Typography type="title" color="inherit" className={classes.flex}>
            Persona Test
          </Typography>

          <Chip
            ref="chip"
            className={classes.chip}
            classes={{ label: classes.chipLabel }}
            avatar={<Avatar className={classes.avatar}>{avatarLetter}</Avatar>}
            label={this.props.score}
            onClick={this.handleChipClick}
          />
          <Popover
            open={this.state.chipOpen}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            onRequestClose={this.handleChipClose}
            classes={{ paper: classes.popoverPaper }}
          >
            <AvatarChipPopover name={newPlayer} score={score} />
          </Popover>
        </Toolbar>
      </AppBar>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
