import React from 'react';

import styles from './hero.scss';

export default () => {
    return (
        <div className={styles.hero}>
            <div className={styles.background} />
            <div className={styles.heroText}>
                <h1>
                    Rachael Lawless and Mattie Doucette Pilles are getting
                    married!
                </h1>
            </div>
        </div>
    );
};
