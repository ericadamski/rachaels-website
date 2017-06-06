import React from 'react';

// import styles from './hero.scss';

export default () => {
    return (
        <div className={styles.hero}>
            <div className={styles.heroBackground} />
            <div className={styles.heroText}>
                <h1>
                    Rachael Lawless
                    <br />
                    &
                    <br />
                    Mattie Doucette Pilles
                    <br />
                    are getting
                    <br />
                    <span className={styles.heroMarried}>married!</span>
                </h1>
            </div>
        </div>
    );
};
