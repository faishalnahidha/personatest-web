import React, { Component } from 'react';
import PropTypes from 'prop-types';

import NewPlayers from '../../api/new-players.js';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import { FormControl, FormHelperText } from 'material-ui/Form';
import NumberInput from 'material-ui-number-input';

const styles = theme => ({
  root: {
    display: 'flex',
    width: '100vw',
    height: '100vh',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(45deg, #7474bf, #348ac7)'
  },
  paper: {
    height: 250
  },
  formContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: theme.spacing.unit * 2
  }
});

// NewPlayerPage represents page for submitting username
// before do Persona Test
class NewPlayerPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      age: ''
    };
  }

  handleChange = stateProp => event => {
    this.setState({
      [stateProp]: event.target.value
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={0} justify={'center'} alignItems={'center'}>
          <Grid item xs={11} sm={10} md={7} lg={5} xl={5}>
            <Paper className={classes.paper}>
              <div className={classes.formContainer}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Nama"
                  value={this.state.name}
                  onChange={this.handleChange('name')}
                  margin="normal"
                />
                <TextField
                  required
                  id="age"
                  label="Usia"
                  value={this.state.age}
                  onChange={this.handleChange('age')}
                  type="number"
                  margin="normal"
                />
              </div>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

NewPlayerPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NewPlayerPage);
