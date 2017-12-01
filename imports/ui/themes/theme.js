import React from 'react';
import { createMuiTheme } from 'material-ui/styles';
import { deepPurple, blue, green } from 'material-ui/colors';
import { myPrimaryColor } from './primary-color-palette.js';
import { mySecondaryColor } from './secondary-color-palette.js';

export const myTheme = createMuiTheme({
  palette: {
    primary: myPrimaryColor,
    secondary: mySecondaryColor
  }
});
