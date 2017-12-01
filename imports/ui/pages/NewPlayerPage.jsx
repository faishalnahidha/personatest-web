import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';

import { NewPlayers } from '../../api/new-players.js';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
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
    padding: theme.spacing.unit * 4,
    paddingTop: theme.spacing.unit * 8
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
      sex: undefined
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    const isAgeInvalid =
      name == 'age' && (value < 1 || value > 99) && value != '';
    if (!isAgeInvalid) {
      this.setState({
        [name]: value
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    const name = this.state.name.trim();
    const age = this.state.age;
    const sex = this.state.sex;

    Meteor.call('newPlayers.insert', name, age, sex);

    // NewPlayers.insert({
    //   name: name,
    //   age: age,
    //   sex: sex
    // });

    this.setState({
      name: '',
      age: '',
      sex: undefined
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={0} justify={'center'} alignItems={'center'}>
          <Grid item xs={11} sm={9} md={6} lg={5} xl={4}>
            <Paper className={classes.paper}>
              <form onSubmit={this.handleSubmit}>
                <Grid container>
                  <Grid item xs={12}>
                    <Typography type="headline" align="center">
                      Selamat datang di Persona Test
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12}>
                    <Typography type="subheading" align="center">
                      Silahkan isi profil anda
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="name"
                      label="Nama"
                      value={this.state.name}
                      onChange={this.handleChange.bind(this)}
                      margin="normal"
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={24}
                  alignItems={'flex-end'}
                  justify={'center'}
                >
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      name="age"
                      label="Usia"
                      value={this.state.age}
                      onChange={this.handleChange.bind(this)}
                      type="number"
                      max="99"
                      min="1"
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
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
                </Grid>
                <Grid container justify={'flex-end'}>
                  <Grid item xs={12} sm={3}>
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
