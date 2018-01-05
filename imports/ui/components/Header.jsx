import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { findDOMNode } from 'react-dom';

import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Popover from 'material-ui/Popover';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import Divider from 'material-ui/Divider';
import { CircularProgress } from 'material-ui/Progress';
import Menu from 'material-ui-icons/Menu';

import anime from 'animejs';

import { drawerWidth } from '../components/MenuDrawer.jsx';

const styles = theme => ({
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  hide: {
    display: 'none'
  },
  appBar: {
    background:
      'linear-gradient(90deg, rgba(116,116,191,1), rgba(52,138,199,1))',
    transition: theme.transitions.create(['margin', 'width', 'box-shadow'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarTop: {
    //backgroundColor: 'transparent',
    boxShadow: 'none'
  },
  appBarDown: {},
  appBarShift: {
    [theme.breakpoints.up('lg')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      })
    }
  },
  toolbar: {
    // [theme.breakpoints.up('md')]: {
    //   minHeight: 72
    // },
    // [theme.breakpoints.down('md')]: {
    //   minHeight: 64
    // }
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
  },
  linearProgress: {
    top: 64
  }
});

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openChip: false,
      isScroll: false
    };
  }

  componentDidMount() {
    this.chipPopoverAchorEl = findDOMNode(this.refs.chip);
    document.addEventListener('scroll', () => {
      this.handleScroll();
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.score !== this.props.score) {
      // console.log(
      //   `thisPropsScore: ${this.props.score} | nextPropsScore: ${
      //     nextProps.score
      //   }`
      // );
      const animateScore = anime({
        targets: '#animateScore',
        label: nextProps.score,
        round: 1,
        easing: 'easeInOutExpo'
      });
    }
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', () => {
      this.handleScroll();
    });
  }

  handleScroll() {
    const isScroll = window.scrollY > 50;
    if (isScroll !== this.state.isTop) {
      this.setState({ isScroll });
    }
  }

  renderRightIcon() {
    const { newPlayerName, classes, secondaryAccent } = this.props;

    if (newPlayerName == undefined) {
      return;
    } else if (newPlayerName === ' ') {
      return <CircularProgress color="accent" size={32} />;
    } else {
      const avatarLetter = newPlayerName.charAt(0);

      return (
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
      );
    }
  }

  AvatarChipPopover = () => (
    <div>
      <Typography
        type="title"
        align="center"
        className={this.props.classes.chipPopover}
        style={{ color: this.props.secondaryAccent }}
      >
        {this.props.newPlayerName}
      </Typography>
      <Divider />
      <Typography
        type="body1"
        align="center"
        className={this.props.classes.chipPopover}
      >
        Skor : {this.props.score}
      </Typography>
    </div>
  );

  render() {
    const {
      classes,
      headerTitle,
      newPlayerName,
      score,
      secondaryAccent,
      isDrawerOpen,
      handleDrawerOpen
    } = this.props;
    const { isScroll } = this.state;

    const avatarLetter = newPlayerName ? newPlayerName.charAt(0) : ' ';

    return (
      <AppBar
        className={classnames(classes.appBar, {
          [classes.appBarTop]: !isScroll,
          [classes.appBarDown]: isScroll,
          [classes.appBarShift]: isDrawerOpen
        })}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            className={classnames(
              classes.menuButton,
              isDrawerOpen && classes.hide
            )}
            color="contrast"
            aria-label="Menu"
            onClick={handleDrawerOpen}
          >
            <Menu />
          </IconButton>
          <Typography type="title" color="inherit" className={classes.flex}>
            {headerTitle}
          </Typography>
          {this.renderRightIcon()}
          <Popover
            open={this.state.openChip}
            anchorEl={this.chipPopoverAchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            onClose={() => this.setState({ openChip: false })}
            classes={{ paper: classes.popoverPaper }}
          >
            <this.AvatarChipPopover />
          </Popover>
        </Toolbar>
      </AppBar>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  headerTitle: PropTypes.string.isRequired,
  newPlayerName: PropTypes.string,
  score: PropTypes.number,
  secondaryAccent: PropTypes.string
};

export default withStyles(styles)(Header);
