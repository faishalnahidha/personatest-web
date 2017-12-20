import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import Parser from 'html-react-parser';
import domToReact from 'html-react-parser/lib/dom-to-react';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { CircularProgress } from 'material-ui/Progress';

import Header from '../components/Header.jsx';
import MainResult from '../components/MainResult.jsx';
import TestProgressPanel from '../components/TestProgressPanel.jsx';
import { secondaryAccentGenerator } from '../../other/secondary-accent.js';

const styles = theme => ({
  contentRoot: {
    flexGrow: 1,
    margin: 0,
    marginTop: 80,
    padding: theme.spacing.unit * 1
  },
  paper: {
    padding: '16px 0',
    borderRadius: 5
  },
  rightColumnContainer: {
    position: 'sticky',
    top: 88,
    padding: 0
  }
});

class ResultPage extends Component {
  componentWillReceiveProps(nextProps) {
    if (!nextProps.loading && nextProps.newPlayerExists) {
      this.secondaryAccent = secondaryAccentGenerator(
        nextProps.newPlayer._id.charAt(0).toUpperCase()
      );

      return true;
    }
  }

  render() {
    const {
      loading,
      newPlayer,
      newPlayerExists,
      publicContent,
      classes
    } = this.props;

    console.log('loading: ' + loading);

    if (!loading && newPlayerExists) {
      return (
        <div>
          <Header
            newPlayer={newPlayer.name}
            score={newPlayer.score}
            secondaryAccent={this.secondaryAccent}
          />
          <div className={classes.contentRoot}>
            <Grid container spacing={16} justify="center">
              <Grid item xs={12} sm={10} md={8} lg={6}>
                <MainResult content={publicContent} />
              </Grid>
              <Grid item xs={12} sm={10} md={3} lg={2}>
                <Grid
                  container
                  spacing={0}
                  className={classes.rightColumnContainer}
                >
                  <Grid item xs={12}>
                    <Paper className={classes.paper}>
                      <TestProgressPanel
                        percentage={10}
                        name={newPlayer.name}
                      />
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </div>
      );
    }

    return <CircularProgress />;
  }
}

export default withStyles(styles)(ResultPage);
