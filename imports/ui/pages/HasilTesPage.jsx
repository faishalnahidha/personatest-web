import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

import { PublicContents } from '../../api/public-contents.js';

import Parser from 'html-react-parser';
import domToReact from 'html-react-parser/lib/dom-to-react';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import { CircularProgress } from 'material-ui/Progress';

import MainResultCard from '../components/MainResultCard.jsx';
import AlternativeResultCard from '../components/AlternativeResultCard.jsx';
import TestProgressPanel from '../components/TestProgressPanel.jsx';
import TestResultPanel from '../components/TestResultPanel.jsx';
import { drawerWidth } from '../components/MenuDrawer.jsx';

const styles = theme => ({
  contentRoot: {
    margin: 0,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up('md')]: {
      marginTop: 96
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: 80
    }
  },
  mainColumnContainer: {
    margin: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  mainColumnContainerShift: {
    [theme.breakpoints.up('lg')]: {
      marginLeft: drawerWidth
    },
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  rightColumnContainer: {
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing.unit
    }
  },
  altResultCardContainer: {
    padding: theme.spacing.unit
  },
  bandingkanText: {
    margin: '48px 8px 16px 8px'
  }
});

class HasilTesPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      resultLoading,
      resultContents,
      newPlayer,
      isDrawerOpen,
      classes
    } = this.props;

    if (!resultLoading && newPlayer.result) {
      const mainType = PublicContents.findOne({ _id: newPlayer.result.type });
      const altType1 = PublicContents.findOne({
        _id: newPlayer.result.alternativeType1
      });
      const altType2 = PublicContents.findOne({
        _id: newPlayer.result.alternativeType2
      });

      return (
        <div className={classes.contentRoot}>
          <Grid container spacing={16} justify="center">
            {/* Main column*/}
            <Grid
              item
              xs={12}
              sm={10}
              md={8}
              lg={6}
              className={classnames(classes.mainColumnContainer, {
                [classes.mainColumnContainerShift]: isDrawerOpen
              })}
            >
              <Grid container spacing={0}>
                <MainResultCard content={mainType} />
                <Grid item xs={12}>
                  <Typography
                    type="subheading"
                    className={classes.bandingkanText}
                  >
                    Bandingkan dengan tipe kepribadian lain
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider style={{ marginBottom: 16 }} />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={6}
                  className={classes.altResultCardContainer}
                >
                  <AlternativeResultCard content={altType1} />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={6}
                  className={classes.altResultCardContainer}
                >
                  <AlternativeResultCard content={altType2} />
                </Grid>
              </Grid>
            </Grid>
            {/* Right column*/}
            <Grid item xs={12} sm={10} md={3} lg={2}>
              <div className={classes.rightColumnContainer}>
                <Grid container spacing={16} justify="center">
                  <Grid item xs={12} sm={6} md={12}>
                    <TestResultPanel
                      result={newPlayer.result}
                      playerName={newPlayer.name}
                      personalityType={`${mainType.name} (${mainType._id})`}
                      personalityColorType={mainType.type}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={12}>
                    <TestProgressPanel percentage={100} name={newPlayer.name} />
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </div>
      );
    }

    return <CircularProgress />;
  }
}

HasilTesPage.propTypes = {
  classes: PropTypes.object.isRequired,
  resultLoading: PropTypes.bool,
  resultContents: PropTypes.array,
  newPlayer: PropTypes.object.isRequired,
  isDrawerOpen: PropTypes.bool.isRequired
};

export default withStyles(styles)(HasilTesPage);
