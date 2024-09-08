import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';

import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon,
} from 'react-share';

import { myPrimaryColor } from '../themes/primary-color-palette';

const styles = {
  flexContainer: {
    display: 'flex',
    flexGrow: 1,
    marginBottom: 8,
  },
  socialMediaButton: {
    margin: 4,
  },
};

const CopyIcon = () => (
  <svg
    style={{
 width: 18, height: 18, marginRight: 8, marginLeft: -4,
}}
    viewBox="0 0 24 24"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path fill={myPrimaryColor[500]} d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
  </svg>
);

class ShareDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openSnackbarCopied: false,
    };
  }

  render() {
    const {
      classes, isOpen, onClose, param, ...other
    } = this.props;

    // url for shared link. In production it will be https://test.persona.my.id/tes/CODE
    const url = `${window.location.origin}/tes/${param}`;
    // console.log(`parameter: ${param}`);

    return (
      <div>
        <Dialog
          open={isOpen}
          onClose={onClose}
          aria-labelledby="share-dialog-title"
          {...other}
        >
          <DialogTitle id="share-dialog-title">Bagikan Hasil Tes</DialogTitle>
          <DialogContent>
            <div className={classes.flexContainer}>
              <FacebookShareButton
                url={url}
                title="My Persona Test"
                hashtag="#PersonaMyId #KenaliDirimu"
                className={classes.socialMediaButton}
              >
                <FacebookIcon size={48} round />
              </FacebookShareButton>
              <TwitterShareButton
                url={url}
                title="My Persona Test"
                hashtag="#PersonaMyId #KenaliDirimu"
                className={classes.socialMediaButton}
              >
                <TwitterIcon size={48} round />
              </TwitterShareButton>
              <LinkedinShareButton
                url={url}
                summary=""
                source="Persona Test"
                className={classes.socialMediaButton}
              >
                <LinkedinIcon size={48} round />
              </LinkedinShareButton>
              <WhatsappShareButton
                url={url}
                title="My Persona Test"
                separator=" | "
                className={classes.socialMediaButton}
              >
                <WhatsappIcon size={48} round />
              </WhatsappShareButton>
            </div>
            <CopyToClipboard
              text={url}
              onCopy={() => this.setState({ openSnackbarCopied: true })}
            >
              <Button
                color="primary"
                variant="outlined"
                fullWidth
              ><CopyIcon />Salin Link
              </Button>
            </CopyToClipboard>
          </DialogContent>
        </Dialog>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={this.state.openSnackbarCopied}
          autoHideDuration={3000}
          onClose={() => this.setState({ openSnackbarCopied: false })}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Link disalin!</span>}
        />
      </div>
    );
  }
}

ShareDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  param: PropTypes.string,
};

export default withStyles(styles)(ShareDialog);
