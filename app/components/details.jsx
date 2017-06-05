import React from 'react';

import styles from './details.scss';

export default () => {
    return (
        <div className={styles.information}>
            <div className={styles.informationCenter}>
                Wednesday, August 9th, 2017
                <br />
                Please arrive by 2:00pm
                <br />
                Ceremony starts at 2:30pm
            </div>
            <br />
            <div className={styles.informationMap}>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2846.0025377973166!2d-76.99327118494897!3d44.494614805632615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cd2dc1946d90d81%3A0xbafb84fee124f8d!2sSalmon+River+Studios!5e0!3m2!1sen!2sca!4v1496705604588"
                    frameBorder="0"
                    style={{ border: 0 }}
                    allowFullScreen
                />
            </div>
        </div>
    );
};
