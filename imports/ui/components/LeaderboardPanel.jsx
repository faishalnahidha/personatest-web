import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { withStyles } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';
import { CircularProgress } from 'material-ui/Progress';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import List, { ListItem, ListItemText, ListItemAvatar } from 'material-ui/List';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  paper: {
    height: 240,
    paddingTop: theme.spacing.unit * 2,
    borderRadius: 4,
    overflow: 'auto',
  },
});

class LeaderboardPanel extends Component {
  renderList() {
    return this.props.topUsers.map(user => (
      <ListItem key={user.username}>
        <ListItemAvatar>
          <Avatar alt={user.username} src={user.profile.profilePicture} />
        </ListItemAvatar>
        <ListItemText primary={user.username} secondary={user.gameProfile.score} />
      </ListItem>
    ));
  }

  render() {
    const { classes, topUsers } = this.props;

    return (
      <Paper className={classes.paper}>
        <Grid container spacing={0}>
          <Grid item xs={6} sm={12} md={12}>
            <Typography variant="body2" style={{ paddingLeft: 16 }}>
              Persona Leaderboard
            </Typography>
          </Grid>
          <Grid item xs={6} sm={12} md={12}>
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
        // limit: 10,
      },
    )
    .fetch(),
}))(withStyles(styles)(LeaderboardPanel));

// export default withTracker(withStyles(styles))(LeaderboardPanel);
