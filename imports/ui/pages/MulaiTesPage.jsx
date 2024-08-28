import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Redirect } from 'react-router';
import classnames from 'classnames';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Hidden from 'material-ui/Hidden';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import { grey } from 'material-ui/colors';
import ArrowBack from 'material-ui-icons/ArrowBack';

import { myPrimaryColor } from '../themes/primary-color-palette';

const styles = theme => ({
  root: {
    position: 'fixed',
    display: 'flex',
    width: '100%',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    zIndex: -10,
    position: 'fixed',
    width: '100%',
    height: '100%',

    backgroundPosition: 'center',
    backgroundImage: 'url("/img/login-bg-kraken.jpg")',
    backgroundAttachment: 'fixed',
    [theme.breakpoints.up('md')]: {
      backgroundSize: '100% auto',
    },
    [theme.breakpoints.down('sm')]: {
      backgroundSize: 'auto 100%',
    },
  },
  paper: {
    overflow: 'hidden',
    // borderRadius: 4,
    backdropFilter: 'blur(8px)',
    // backgroundColor: 'rgba(255,255,255,.5)',
    backgroundColor: 'rgba(255,255,255,1)',
  },
  paperContentContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  formContainer: {
    justifyContent: 'center',

    [theme.breakpoints.up('lg')]: {
      height: 600,
      margin: 'auto 96px',
    },
    [theme.breakpoints.down('md')]: {
      height: 600,
      margin: 'auto 80px',
    },
    [theme.breakpoints.down('sm')]: {
      height: 'auto',
      margin: theme.spacing.unit * 4,
    },
  },
  petunjukContainer: {
    position: 'relative',
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing.unit * 6,
      height: 600,
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing.unit * 3,
      height: 'auto',
    },
    // backgroundColor: 'rgba(255,255,255,1)',
  },
  petunjukContent: {
    zIndex: 2,
  },
  overlay: {
    height: '100%',
    width: '100%',
    background: 'linear-gradient(30deg, rgba(255,255,255,.92), rgba(255,255,255,.66))',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -9,
  },
  button: {
    width: '100%',
    marginTop: theme.spacing.unit * 4,
    // background: 'linear-gradient(90deg, #7474bf, #348ac7)',
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
  },
  displayText: {
    fontWeight: 300,
    lineHeight: 'normal',
    paddingBottom: 8,
    [theme.breakpoints.up('md')]: {
      fontSize: 45,
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 34,
    },
  },
  subText: {
    fontWeight: 300,
    fontSize: 24,
  },
  purpleText: {
    color: myPrimaryColor[500],
  },
  leftContentParagraph: {
    fontWeight: 400,
    color: grey[800],
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing.unit * 2,
      width: '66%',
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing.unit,
      width: '100%',
    },
  },
});

// NewPlayerPage represents page for submitting username
// before do Persona Test
class MulaiTesPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      age: '',
      id: null,
      redirect: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    /**
     * name in this event is not state.name, but properties of
     * input form to identify which input
     */
    const { value, name } = event.target;
    const isAgeInvalid = name === 'age' && value !== '' && (value < 1 || value > 99);

    if (!isAgeInvalid) {
      this.setState({
        [name]: value,
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    const name = this.nameInput.value.trim();
    const { age } = this.state;
    const id = Meteor.apply('newPlayers.insert', [name, age], {
      returnStubValue: true,
    });

    this.setState({
      id,
      redirect: true,
    });
  }

  handleBackButton = () => {
    this.props.history.go(-1);
  };

  render() {
    const { classes } = this.props;
    const { redirect, id } = this.state;

    if (redirect) {
      return <Redirect to={`/tes/${id}`} />;
    }

    return (
      <div className={classes.root}>
        <div className={classes.background} />
        <div className={classes.overlay} />
        <Grid container spacing={0} justify="center" alignItems="center">
          <Grid item xs={11} sm={6} md={11} lg={10} xl={7}>
            <Paper className={classes.paper}>
              <Grid container spacing={0}>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={7}
                  className={classnames(classes.paperContentContainer, classes.petunjukContainer)}
                >
                  {/* <div className={classes.overlay} /> */}
                  <div className={classes.petunjukContent}>
                    <Hidden smDown>
                      <IconButton
                        color="primary"
                        className={classes.backButton}
                        aria-label="Back to previous page"
                        onClick={this.handleBackButton}
                      >
                        <ArrowBack />
                      </IconButton>
                    </Hidden>
                    <Typography
                      gutterBottom
                      className={classnames(classes.displayText)}
                    >
                      Selamat datang di Persona Test
                    </Typography>
                    <Hidden xsDown>
                      <Typography
                        variant="body1"
                        gutterBottom
                        className={classnames(classes.leftContentParagraph)}
                      >
                        <strong>Pilih satu </strong>di antara dua pilihan jawaban pada kolom di
                        bawah baris pertanyaan. Tidak ada jawaban benar ataupun salah pada
                        pertanyaan yang disediakan.
                      </Typography>
                    </Hidden>
                    <Typography variant="body1" className={classnames(classes.leftContentParagraph)}>
                      <strong>Kejujuran anda </strong>dalam menjawab pertanyaan-pertanyaan akan
                      menentukan keakuratan dari hasil analisis kepribadian anda.
                    </Typography>
                  </div>
                </Grid>
                <Grid item xs={12} sm={12} md={5}>
                  <form
                    onSubmit={this.handleSubmit}
                    className={classnames(classes.paperContentContainer, classes.formContainer)}
                  >
                    <div>
                      <Typography variant="body1" gutterBottom>
                        Silahkan isi profil anda
                      </Typography>
                      <TextField
                        required
                        fullWidth
                        type="text"
                        label="Nama"
                        margin="normal"
                        inputRef={(c) => {
                          this.nameInput = c;
                        }}
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
                      variant="raised"
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
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withStyles(styles)(MulaiTesPage);
