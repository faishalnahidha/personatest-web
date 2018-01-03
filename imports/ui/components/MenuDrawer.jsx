import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Hidden from 'material-ui/Hidden';
import Drawer from 'material-ui/Drawer';
import List from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';

/* drawer width for large(lg) screen and above */
export const drawerWidth = 256;

const styles = theme => ({
  drawerPaper: {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100vh',
    width: drawerWidth,
    [theme.breakpoints.up('lg')]: {
      width: drawerWidth
    },
    [theme.breakpoints.down('lg')]: {
      width: 320
    },
    [theme.breakpoints.down('sm')]: {
      width: 280
    }
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 16px',
    ...theme.mixins.toolbar
  },
  chevronButton: {
    marginRight: -16
  }
});

function MenuDrawer(props) {
  const { isOpen, handleDrawerOpen, classes } = props;

  const drawerDesktop = (
    <Drawer
      type="persistent"
      classes={{ paper: classes.drawerPaper }}
      anchor="left"
      open={isOpen}
    >
      <div className={classes.drawerInner}>
        <div className={classes.drawerHeader}>
          <Typography type="title">Persona Web</Typography>
          <IconButton
            onClick={handleDrawerOpen}
            className={classes.chevronButton}
          >
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
      </div>
    </Drawer>
  );

  const drawerMobile = (
    <Drawer
      type="temporary"
      classes={{ paper: classes.drawerPaper }}
      anchor="left"
      open={isOpen}
      onClose={handleDrawerOpen}
      ModalProps={{
        keepMounted: true // Better open performance on mobile.
      }}
    >
      <div className={classes.drawerInner}>
        <div className={classes.drawerHeader}>
          <Typography type="title">Persona Web</Typography>
        </div>
        <Divider />
      </div>
    </Drawer>
  );

  return (
    <div className={classes.drawer}>
      <Hidden lgDown>{drawerDesktop}</Hidden>
      <Hidden lgUp>{drawerMobile}</Hidden>
    </div>
  );
}

MenuDrawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleDrawerOpen: PropTypes.func
};

export default withStyles(styles)(MenuDrawer);
