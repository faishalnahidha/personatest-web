import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Redirect } from 'react-router';

import { NewPlayers } from '../../api/new-players.js';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Radio, { RadioGroup } from 'material-ui/Radio';
import {
  FormLabel,
  FormControl,
  FormControlLabel,
  FormHelperText
} from 'material-ui/Form';

const styles = theme => ({
  root: {
    display: 'flex',
    width: '100vw',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(45deg, #7474bf, #348ac7)'
  },
  paper: {
    padding: theme.spacing.unit * 4,
    borderRadius: 5
  },
  divider: {
    margin: '24px -32px 0'
  },
  radioButtonContainer: {
    display: 'flex',
    marginTop: theme.spacing.unit * 1,
    justifyContent: 'center'
  },
  button: {
    width: '100%',
    marginTop: theme.spacing.unit * 2
  }
});

// NewPlayerPage represents page for submitting username
// before do Persona Test
class NewPlayerPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      age: '',
      sex: null,
      id: null,
      redirect: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    /**
     * name in this event is not state.name, but properties of
     * input form to identify which input
     */
    const { value, name } = event.target,
      isAgeInvalid = name == 'age' && value != '' && (value < 1 || value > 99);

    if (!isAgeInvalid) {
      this.setState({
        [name]: value
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    const name = this.state.name.trim(),
      age = this.state.age,
      sex = this.state.sex,
      id = Meteor.apply('newPlayers.insert', [name, age, sex], {
        returnStubValue: true
      });

    console.log('newPlayerId: ' + id);

    this.setState({
      id: id,
      redirect: true
    });
  }

  render() {
    const { classes } = this.props;
    const { redirect, id } = this.state;

    if (redirect) {
      return <Redirect to={`/test/${id}`} />;
    }

    return (
      <div className={classes.root}>
        <Grid container spacing={0} justify={'center'} alignItems={'center'}>
          <Grid item xs={11} sm={6} md={3}>
            <Paper className={classes.paper}>
              <form onSubmit={this.handleSubmit}>
                <Grid item xs={12}>
                  <Typography type="headline" align="center">
                    Selamat datang di Persona Test
                  </Typography>
                </Grid>
                <Grid item xs={12} style={{ marginTop: 16 }}>
                  <Typography type="caption" align="center">
                    Silahkan isi profil anda
                  </Typography>
                </Grid>
                <Divider className={classes.divider} />
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="name"
                    label="Nama"
                    value={this.state.name}
                    onChange={this.handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="age"
                    label="Usia"
                    value={this.state.age}
                    onChange={this.handleChange}
                    type="number"
                    max="99"
                    min="1"
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} className={classes.radioButtonContainer}>
                  <FormControlLabel
                    control={
                      <Radio
                        name="sex"
                        checked={this.state.sex === 'Laki-laki'}
                        onChange={this.handleChange.bind(this)}
                        value={'Laki-laki'}
                        aria-label="L"
                      />
                    }
                    label="Laki-laki"
                  />
                  <FormControlLabel
                    control={
                      <Radio
                        name="sex"
                        checked={this.state.sex === 'Perempuan'}
                        onChange={this.handleChange.bind(this)}
                        value={'Perempuan'}
                        aria-label="P"
                      />
                    }
                    label="Perempuan"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    raised
                    className={classes.button}
                    color="primary"
                    type="submit"
                    value="Submit"
                  >
                    OK
                  </Button>
                </Grid>
              </form>
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
