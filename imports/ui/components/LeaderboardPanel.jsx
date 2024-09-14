import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  paper: {
    height: 240,
    paddingTop: theme.spacing.unit * 2,
    borderRadius: 4,
    overflow: 'auto',
  },
  listItem: {
    paddingLeft: theme.spacing.unit * 2.0,
  },
});

class LeaderboardPanel extends Component {
  renderList() {
    const { classes } = this.props;

    return this.props.topUsers.map(user => (
      <ListItem className={classes.listItem} key={user.username}>
        <Avatar alt={user.username} src={user.profile.profilePicture} />
        <ListItemText primary={user.username} secondary={user.gameProfile.score} />
      </ListItem>
    ));
  }

  render() {
    const { classes, topUsers } = this.props;

    return (
      <Paper className={classes.paper}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Typography variant="body2" style={{ paddingLeft: 16 }}>
              Persona Leaderboard
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {topUsers ? (
              <List dense>{this.renderList()}</List>
            ) : (
              <CircularProgress className={classes.progress} />
            )}
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

LeaderboardPanel.propTypes = {
  classes: PropTypes.object.isRequired,
  topUsers: PropTypes.array,
};

export default withTracker(() => ({
  topUsers: Meteor.users
    .find(
      {},
      {
        sort: { 'gameProfile.score': -1 },
        fields: {
          username: 1,
          'profile.profilePicture': 1,
          'gameProfile.score': 1,
        },
        limit: 10,
      },
    )
    .fetch(),
}))(withStyles(styles)(LeaderboardPanel));

// export default withTracker(withStyles(styles))(LeaderboardPanel);
