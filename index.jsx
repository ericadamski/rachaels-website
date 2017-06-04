import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { render } from 'react-dom';

import Main from './app/main.jsx';

render(
    <MuiThemeProvider
        muiTheme={getMuiTheme({
            palette: {
                primary1Color: '#A5C2D0',
                primary2Color: '#A5C2D0',
                primary3Color: '#A5C2D0',
                accent1Color: '#FBE35C',
                // accent2Color: grey100,
                // accent3Color: grey500,
                textColor: '#595C68',
                alternateTextColor: '#F9F9F9',
            },
        })}
    >
        <Main />
    </MuiThemeProvider>,
    document.getElementById('main')
);
