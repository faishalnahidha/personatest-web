import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Hidden from 'material-ui/Hidden';
import Drawer from 'material-ui/Drawer';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';

import MenuDrawerList from '../components/MenuDrawerList.jsx';
import { getPersonalityNameWithLetter } from '../../lib/get-personality-name';

/* drawer width for large(lg) screen and above */
export const drawerWidth = 256;

const styles = theme => ({
  drawerPaper: {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100vh',
    background: theme.palette.background.paper,
    [theme.breakpoints.up('lg')]: {
      width: drawerWidth,
    },
    [theme.breakpoints.down('md')]: {
      width: 320,
    },
    [theme.breakpoints.down('xs')]: {
      width: 280,
    },
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 16px',
    ...theme.mixins.toolbar,
  },
  chevronButton: {
    marginRight: theme.spacing.unit * -2,
  },
});

function MenuDrawer(props) {
  const {
    isOpen, currentUser, handleDrawerOpen, forceMobileDrawer, classes,
  } = props;

  let privateList = [];
  let privateListName;
  if (currentUser) {
    const personalityId = currentUser.profile.personalityType.toLowerCase();
    privateListName = getPersonalityNameWithLetter(currentUser.profile.personalityType);

    privateList = [
      {
        text: 'Kelebihan Alami dalam Pekerjaan',
        linkTo: `/artikel/${personalityId}/kelebihan-alami`,
      },
      {
        text: 'Lingkungan Kerja Ideal',
        linkTo: `/artikel/${personalityId}/lingkungan-kerja-ideal`,
      },
      {
        text: 'Karir yang Menarik Bagi Anda',
        linkTo: `/artikel/${personalityId}/karir-yang-menarik`,
      },
      {
        text: 'Bos Ideal',
        linkTo: `/artikel/${personalityId}/bos-ideal`,
      },
      {
        text: 'Tantangan Kepribadian',
        linkTo: `/artikel/${personalityId}/tantangan-kepribadian`,
      },
    ];
  }

  const handleDrawerClose = () => {
    handleDrawerOpen();
  };

  const drawerDesktop = (
    <Drawer type="persistent" classes={{ paper: classes.drawerPaper }} anchor="left" open={isOpen}>
      <div className={classes.drawerInner}>
        <div className={classes.drawerHeader}>
          <Typography type="title">Persona Web</Typography>
          <IconButton onClick={handleDrawerClose} className={classes.chevronButton}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <MenuDrawerList profilKhususList={privateList} profilKhususName={privateListName} />
      </div>
    </Drawer>
  );

  const drawerMobile = (
    <Drawer
      type="temporary"
      classes={{ paper: classes.drawerPaper }}
      anchor="left"
      open={isOpen}
      onClose={handleDrawerClose}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
    >
      <div className={classes.drawerInner}>
        <div className={classes.drawerHeader}>
          <Typography type="title">Persona Web</Typography>
        </div>
        <Divider />
        <MenuDrawerList
          profilKhususList={privateList}
          handleDrawerClose={handleDrawerClose}
          profilKhususName={privateListName}
        />
      </div>
    </Drawer>
  );

  if (forceMobileDrawer) {
    return <div className={classes.drawer}>{drawerMobile}</div>;
  }

  return (
    <div className={classes.drawer}>
      <Hidden lgUp>{drawerMobile}</Hidden>
      <Hidden mdDown>{drawerDesktop}</Hidden>
    </div>
  );
}

MenuDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  currentUser: PropTypes.object,
  handleDrawerOpen: PropTypes.func,
  forceMobileDrawer: PropTypes.bool,
};

export default withStyles(styles)(MenuDrawer);
