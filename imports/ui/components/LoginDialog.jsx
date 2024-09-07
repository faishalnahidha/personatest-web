import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

import { myPrimaryColor } from '../themes/primary-color-palette';

const styles = {
  dialog: {
    width: 200,
  },
  buttonMasuk: {
    width: '100%',
    marginTop: 16,
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
      // eslint-disable-next-line react/no-unused-state
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
        // eslint-disable-next-line react/no-unused-state
        this.setState({ errors });
      } else {
        this.props.onClose();
      }
    });

    // this.setState({
    //   id: id,
    //   redirect: true
    // });
  };

  render() {
    const { isOpen, onClose, classes } = this.props;

    return (
      <Dialog
        maxWidth="xs"
        open={isOpen}
        onClose={onClose}
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
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default withStyles(styles)(LoginDialog);
