import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Link } from 'react-router-dom';

import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Dialog, { DialogContent, DialogTitle } from 'material-ui/Dialog';

import { myPrimaryColor } from '../themes/primary-color-palette';

const styles = {
  dialog: {
    width: 200,
  },
  buttonMasuk: {
    width: '100%',
    marginTop: 16,
    marginBottom: 8,
    // background: 'linear-gradient(90deg, #7474bf, #348ac7)',
  },
  linkContainer: {
    marginTop: 16,
    marginBottom: 16,
  },
  link: {
    color: myPrimaryColor[800],
    fontSize: '0.75rem',
    textDecoration: 'none',
  },
};

class LoginDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: '',
    };
  }

  handleSubmitMasuk = (event) => {
    event.preventDefault();

    const email = this.emailMasuk.value;
    const password = this.passwordMasuk.value;
    let errors = {};

    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        errors = err.reason;
        this.setState({ errors });
      } else {
        this.props.handleLoginDialogClose();
      }
    });

    // this.setState({
    //   id: id,
    //   redirect: true
    // });
  };

  render() {
    const { isLoginDialogOpen, handleLoginDialogClose, classes } = this.props;

    return (
      <Dialog
        maxWidth="xs"
        open={isLoginDialogOpen}
        onClose={handleLoginDialogClose}
        aria-labelledby="login-dialog-title"
      >
        <DialogTitle id="login-dialog-title">Masuk</DialogTitle>
        <DialogContent>
          <form onSubmit={this.handleSubmitMasuk}>
            <TextField
              margin="normal"
              id="email"
              label="Email"
              type="email"
              fullWidth
              inputRef={(c) => {
                this.emailMasuk = c;
              }}
            />
            <TextField
              margin="normal"
              id="password"
              label="Password"
              type="password"
              fullWidth
              inputRef={(c) => {
                this.passwordMasuk = c;
              }}
            />
            <div className={classes.linkContainer}>
              <Link to="/daftar" className={classes.link}>
                Belum mendaftar?
              </Link>
            </div>
            <Button
              variant="raised"
              color="primary"
              className={classes.buttonMasuk}
              type="submit"
              value="Submit"
            >
              Masuk
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    );
  }
}

LoginDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  isLoginDialogOpen: PropTypes.bool.isRequired,
  handleLoginDialogClose: PropTypes.func.isRequired,
};

export default withStyles(styles)(LoginDialog);
