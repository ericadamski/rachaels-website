import React from 'react';
import FlatButton from 'material-ui/FlatButton';

import {
    Toolbar,
    ToolbarGroup,
    ToolbarSeparator,
    ToolbarTitle,
} from 'material-ui/Toolbar';

import Container from './container.jsx';

import styles from './header.scss';

export default ({ openAdmin }) => {
    return (
        <div className={styles.header}>
            <div className={styles.title}>
                <h3>Rachael and Matt's Wedding</h3>
            </div>
            <div className={styles.links}>
                <a href="#rsvp">RSVP</a>
                <FlatButton label="admin" onClick={openAdmin} />
            </div>
        </div>
    );
};
