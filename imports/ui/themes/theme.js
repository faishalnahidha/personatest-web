import { createMuiTheme } from 'material-ui/styles';
import { myPrimaryColor } from './primary-color-palette.js';
import { mySecondaryColor } from './secondary-color-palette.js';

export const myTheme = createMuiTheme({
  palette: {
    primary: {
      light: myPrimaryColor[300],
      main: myPrimaryColor[500],
      dark: myPrimaryColor[700],
    },
    secondary: {
      light: mySecondaryColor[300],
      main: mySecondaryColor[500],
      dark: mySecondaryColor[700],
    },
  },
});
