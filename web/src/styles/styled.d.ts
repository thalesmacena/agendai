/* eslint @typescript-eslint/no-empty-interface: "off" */

import 'styled-components';

interface Theme {
  colors: {
    backgroundHeader: string;
    textInput: string;
    primary: string;
    secondary: string;
    error: string;
    divider: string;
    red: string;
    strongInHeader: string;
    textInHeader: string;
    textUnavaliable: string;
  };
  background: string;
  inputBackground: string;
  placeholder: string;
  boxShadow: string;
  backgroundModal: string;
  boxShadowModal: string;
  borderModal: string;
  backgroundOverlay: string;
}

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
