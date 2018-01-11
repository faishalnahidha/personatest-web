import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Redirect } from 'react-router';
import classnames from 'classnames';

import { NewPlayers } from '../../api/new-players.js';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Hidden from 'material-ui/Hidden';
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
import { grey, blueGrey } from 'material-ui/colors';

import { myPrimaryColor } from '../themes/primary-color-palette.js';

const styles = theme => ({
  root: {
    position: 'fixed',
    display: 'flex',
    width: '100%',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: grey[50]
    //background: 'linear-gradient(90deg, #7474bf, #348ac7)'
  },
  paper: {
    overflow: 'hidden',
    borderRadius: 4
    //background: 'linear-gradient(135deg, #7474bf, #348ac7)'
    //backgroundColor: 'transparent'
  },
  paperContentContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing.unit * 6
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing.unit * 4
    }
    // [theme.breakpoints.down('xs')]: {
    //   padding: theme.spacing.unit * 2
    // }
  },
  formContainer: {
    backgroundColor: 'rgba(255,255,255,.1)',
    [theme.breakpoints.up('md')]: {
      height: 480
    },
    [theme.breakpoints.down('sm')]: {
      height: 'auto'
    }
  },
  petunjukContainer: {
    //color: '#fff'
    //backgroundColor: myPrimaryColor[500],
    [theme.breakpoints.up('md')]: {
      height: 480
    },
    [theme.breakpoints.down('sm')]: {
      height: 'auto'
    },

    // background:
    //   'linear-gradient(90deg, rgba(116,116,191,1), rgba(52,138,199,1))'
    // height: 480,
    position: 'relative',
    backgroundSize: 'auto',
    backgroundPosition: 'center',
    backgroundImage: 'url("/img/mulai-tes-bg.jpg")',
    backgroundAttachment: 'fixed'
  },
  petunjuk: {
    zIndex: 2
  },
  overlay: {
    height: '100%',
    width: '100%',
    background:
      'linear-gradient(30deg, rgba(116,116,191,1), rgba(52,138,199,.625))',
    position: 'absolute',
    top: 0,
    left: 0
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
    marginTop: theme.spacing.unit * 4,
    background: 'linear-gradient(90deg, #7474bf, #348ac7)'
  },
  subText: {
    color: myPrimaryColor[400],
    fontSize: 23
  },
  whiteText: {
    color: '#fff'
  }
});

// NewPlayerPage represents page for submitting username
// before do Persona Test
class MulaiTesPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      age: '',
      //sex: null,
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
      return <Redirect to={`/tes/${id}`} />;
    }

    return (
      <div className={classes.root}>
        <Grid container spacing={0} justify={'center'} alignItems={'center'}>
          <Grid item xs={11} sm={6} md={9} lg={7} xl={5}>
            <Paper className={classes.paper}>
              <Grid container spacing={0}>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={7}
                  className={classnames(
                    classes.paperContentContainer,
                    classes.petunjukContainer
                  )}
                >
                  <div className={classes.overlay} />
                  <div className={classes.petunjuk}>
                    <Typography
                      type="display1"
                      color="primary"
                      className={classes.whiteText}
                    >
                      Selamat datang
                    </Typography>
                    <Typography
                      className={classnames(classes.subText, classes.whiteText)}
                      gutterBottom
                    >
                      di Persona Test
                    </Typography>
                    <Hidden xsDown>
                      <Typography
                        type="body1"
                        style={{ marginTop: 8 }}
                        gutterBottom
                        className={classes.whiteText}
                      >
                        Pilih satu di antara dua pilihan jawaban pada kolom di
                        bawah baris pertanyaan. Tidak ada jawaban benar ataupun
                        salah pada pertanyaan yang disediakan.
                      </Typography>
                      <Typography type="body1" className={classes.whiteText}>
                        <strong>Kejujuran anda </strong>dalam menjawab
                        pertanyaan-­pertanyaan akan menentukan keakuratan dari
                        hasil analisis kepribadian anda.
                      </Typography>
                    </Hidden>
                  </div>
                </Grid>
                <Grid item xs={12} sm={12} md={5}>
                  <form
                    onSubmit={this.handleSubmit}
                    className={classnames(
                      classes.paperContentContainer,
                      classes.formContainer
                    )}
                  >
                    <div>
                      <Typography type="caption" gutterBottom>
                        Silahkan isi profil anda
                      </Typography>
                      <TextField
                        required
                        fullWidth
                        name="name"
                        label="Nama"
                        value={this.state.name}
                        onChange={this.handleChange}
                        margin="normal"
                      />
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
                    </div>
                    <Button
                      raised
                      className={classes.button}
                      color="primary"
                      type="submit"
                      value="Submit"
                    >
                      Mulai Tes
                    </Button>
                  </form>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

MulaiTesPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MulaiTesPage);
