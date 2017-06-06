import React from 'react';

// import styles from './container.scss';

export default ({ children, className }) =>
    <div className={`${styles.container} ${className}`}>{children}</div>;
