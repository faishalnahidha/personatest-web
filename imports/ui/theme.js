import React from 'react';
import { createMuiTheme } from 'material-ui/styles';
import { deepPurple, blue, green } from 'material-ui/colors';

const myPrimaryColor = '#311B92';

export const myTheme = createMuiTheme({
  palette: {
    primary: {
      ...deepPurple,
      A400: myPrimaryColor,
      A500: myPrimaryColor,
      A800: myPrimaryColor
    },
    secondary: green
  }
});
