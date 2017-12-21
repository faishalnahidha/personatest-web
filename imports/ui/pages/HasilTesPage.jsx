import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';

import { PublicContents } from '../../api/public-contents.js';

import Parser from 'html-react-parser';
import domToReact from 'html-react-parser/lib/dom-to-react';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { CircularProgress } from 'material-ui/Progress';

import MainResult from '../components/MainResult.jsx';
import TestProgressPanel from '../components/TestProgressPanel.jsx';

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

class HasilTesPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { resultLoading, resultContents, newPlayer, classes } = this.props;

    console.log('resultLoading? ' + resultLoading);

    if (!resultLoading) {
      const mainType = PublicContents.findOne({ _id: newPlayer.result.type });
      const altType1 = PublicContents.findOne({
        _id: newPlayer.result.alternativeType1
      });
      const altType2 = PublicContents.findOne({
        _id: newPlayer.result.alternativeType2
      });

      //console.log('resultContents: ' + JSON.stringify(resultContents));

      return (
        <div>
          <div className={classes.contentRoot}>
            <Grid container spacing={16} justify="center">
              <Grid item xs={12} sm={10} md={8} lg={6}>
                <MainResult content={mainType} />
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

HasilTesPage.propTypes = {
  classes: PropTypes.object.isRequired,
  resultLoading: PropTypes.bool,
  //resultContents: PropTypes.array,
  newPlayer: PropTypes.object.isRequired
};

export default withStyles(styles)(HasilTesPage);
