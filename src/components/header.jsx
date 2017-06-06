import React from 'react';
import FlatButton from 'material-ui/FlatButton';

import './header.css';

export default ({ openAdmin }) => {
  return (
        <div className="header">
            <div className="title">
                <h3>Rachael and Matt's Wedding</h3>
            </div>
            <div className="links">
                <a href="#rsvp">RSVP</a>
                <FlatButton label="admin" onClick={openAdmin} />
            </div>
        </div>
    );
};
