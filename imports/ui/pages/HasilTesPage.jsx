import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import { CircularProgress } from 'material-ui/Progress';

import { PublicContents } from '../../api/public-contents.js';

import AlternativeResultCard from '../components/AlternativeResultCard.jsx';
import ContentProgressPanel from '../components/ContentProgressPanel.jsx';
import MainResultCard from '../components/MainResultCard.jsx';
import OverallProgressPanel from '../components/OverallProgressPanel.jsx';
import TestProgressPanel from '../components/TestProgressPanel.jsx';
import TestResultPanel from '../components/TestResultPanel.jsx';
import { drawerWidth } from '../components/MenuDrawer.jsx';

const styles = theme => ({
  contentRoot: {
    margin: 0,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up('md')]: {
      marginTop: 96,
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: 80,
    },
  },
  mainColumnContainer: {
    margin: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  mainColumnContainerShift: {
    [theme.breakpoints.up('lg')]: {
      marginLeft: drawerWidth,
    },
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  rightColumnContainer: {
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing.unit,
    },
  },
  altResultCardContainer: {
    padding: theme.spacing.unit,
  },
  bandingkanText: {
    marginBottom: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    [theme.breakpoints.up('xl')]: {
      marginTop: 200,
    },
    [theme.breakpoints.down('lg')]: {
      marginTop: 140,
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: 80,
    },
  },
});

const PRIVATE_CONTENTS_COUNT = 5;
const PUBLIC_CONTENTS_COUNT = 24;
const OVERALL_COUNT = 33;

class HasilTesPage extends Component {
  componentDidMount() {
    Session.set('headerTitle', 'Hasil Tes');
  }

  privateContentPercentage = () => {
    const { contentReadFlags } = this.props.newPlayer;
    let privateContentReadCount = 0;
    contentReadFlags.private.forEach((element) => {
      privateContentReadCount += element.flag ? 1 : 0;
    });

    return Math.floor(privateContentReadCount / PRIVATE_CONTENTS_COUNT * 100);
  };

  publicContentPercentage = () => {
    const { contentReadFlags } = this.props.newPlayer;
    let publicContentReadCount = 0;
    contentReadFlags.private.forEach((element) => {
      publicContentReadCount += element.flag ? 1 : 0;
    });

    contentReadFlags.public.forEach((element) => {
      publicContentReadCount += element.flag ? 1 : 0;
    });

    return Math.floor(publicContentReadCount / PUBLIC_CONTENTS_COUNT * 100);
  };

  overallContentPercentage = () => {
    const { contentReadFlags } = this.props.newPlayer;
    let overallCount = 3;
    contentReadFlags.private.forEach((element) => {
      overallCount += element.flag ? 1 : 0;
    });

    contentReadFlags.public.forEach((element) => {
      overallCount += element.flag ? 1 : 0;
    });

    return Math.floor(overallCount / OVERALL_COUNT * 100);
  };

  render() {
    const {
      resultLoading, resultContents, newPlayer, isDrawerOpen, classes,
    } = this.props;

    const isUserLogin = !!Meteor.userId();

    if (!resultLoading && newPlayer.result) {
      const mainType = PublicContents.findOne({ _id: newPlayer.result.type });
      const altType1 = PublicContents.findOne({
        _id: newPlayer.result.alternativeType1,
      });
      const altType2 = PublicContents.findOne({
        _id: newPlayer.result.alternativeType2,
      });

      return (
        <div className={classes.contentRoot}>
          <Grid container spacing={16} justify="center">
            {/* Main column */}
            <Grid
              item
              xs={12}
              sm={10}
              md={8}
              lg={6}
              className={classnames(classes.mainColumnContainer, {
                [classes.mainColumnContainerShift]: isDrawerOpen,
              })}
            >
              <Grid container spacing={0}>
                <MainResultCard content={mainType} />
                <Grid item xs={12}>
                  <Typography type="subheading" className={classes.bandingkanText}>
                    Bandingkan dengan tipe kepribadian lain
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider style={{ marginBottom: 16 }} />
                </Grid>
                <Grid item xs={12} sm={12} md={6} className={classes.altResultCardContainer}>
                  <AlternativeResultCard content={altType1} />
                </Grid>
                <Grid item xs={12} sm={12} md={6} className={classes.altResultCardContainer}>
                  <AlternativeResultCard content={altType2} />
                </Grid>
              </Grid>
            </Grid>
            {/* Right column */}
            <Grid item xs={12} sm={10} md={3} lg={2}>
              <div className={classes.rightColumnContainer}>
                <Grid container spacing={16} justify="center">
                  <Grid item xs={12} sm={6} md={12}>
                    <TestResultPanel
                      result={newPlayer.result}
                      personalityTypeLetter={mainType._id}
                      personalityTypeName={mainType.name}
                      personalityColorType={mainType.type}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={12}>
                    {isUserLogin ? (
                      <OverallProgressPanel
                        percentage={this.overallContentPercentage()}
                        name={newPlayer.name}
                      />
                    ) : (
                      <TestProgressPanel percentage={100} name={newPlayer.name} isTestFinished />
                    )}
                  </Grid>
                  {isUserLogin && (
                    <Grid item xs={12} sm={6} md={12}>
                      <ContentProgressPanel
                        testPercentage={100}
                        privateContentPercentage={this.privateContentPercentage()}
                        publicContentPercentage={this.publicContentPercentage()}
                      />
                    </Grid>
                  )}
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
  isDrawerOpen: PropTypes.bool.isRequired,
};

export default withStyles(styles)(HasilTesPage);
