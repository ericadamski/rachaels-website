import React from 'react';

import './container.css';

export default ({ children, className }) =>
    <div className={`container ${className}`}>{children}</div>;
