import React from 'react';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';

const styles = theme => ({
  root: {
    display: 'flex',
    height: '100vh',
    alignItems: 'center',
    padding: 0
  }
});

function HomePage(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Grid container spacing={0} justify="center" alignItems="center">
        <Button raised color="primary" href="/mulai-tes">
          Mulai Persona Test
        </Button>
      </Grid>
    </div>
  );
}

export default withStyles(styles)(HomePage);
