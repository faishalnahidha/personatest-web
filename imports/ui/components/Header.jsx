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
import Divider from 'material-ui/Divider';
import Menu from 'material-ui-icons/Menu';

import anime from 'animejs';

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
    height: 32
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
    minWidth: 200
  },
  chipPopover: {
    margin: theme.spacing.unit
  }
});

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openChip: false
    };
  }

  componentDidMount() {
    this.chipPopoverAchorEl = findDOMNode(this.refs.chip);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.score !== this.props.score) {
      console.log('nextProps');
      const animateScore = anime({
        targets: '#animateScore',
        label: nextProps.score,
        round: 1,
        easing: 'easeInOutExpo'
      });
    }
  }

  AvatarChipPopover() {
    const { newPlayer, score, classes, secondaryAccent } = this.props;

    return (
      <div>
        <Typography
          type="title"
          align="center"
          className={classes.chipPopover}
          style={{ color: secondaryAccent }}
        >
          {newPlayer}
        </Typography>
        <Divider />
        <Typography type="body1" align="center" className={classes.chipPopover}>
          Skor : {score}
        </Typography>
      </div>
    );
  }

  render() {
    const { classes, newPlayer, score, secondaryAccent } = this.props;
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
            id="animateScore"
            className={classes.chip}
            classes={{ label: classes.chipLabel }}
            avatar={
              <Avatar
                className={classes.avatar}
                style={{ backgroundColor: secondaryAccent }}
              >
                {avatarLetter}
              </Avatar>
            }
            label={this.props.score}
            onClick={() => this.setState({ openChip: true })}
          />
          <Popover
            open={this.state.openChip}
            anchorEl={this.chipPopoverAchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            onRequestClose={() => this.setState({ openChip: false })}
            classes={{ paper: classes.popoverPaper }}
          >
            {this.AvatarChipPopover()}
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
