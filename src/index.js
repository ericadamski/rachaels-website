import React from 'react';
import ReactDOM from 'react-dom';
import Main from './main';
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import './scss/base.css';

ReactDOM.render(<MuiThemeProvider
        muiTheme={getMuiTheme({
          palette: {
            primary1Color: '#A5C2D0',
            primary2Color: '#A5C2D0',
            primary3Color: '#A5C2D0',
            accent1Color: '#FBE35C',
            textColor: '#595C68',
            alternateTextColor: '#F9F9F9',
          },
        })}
    >
        <Main />
    </MuiThemeProvider>, document.getElementById('main'));
registerServiceWorker();
