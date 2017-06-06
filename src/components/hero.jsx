import React from 'react';

import './hero.css';

export default () => {
  return (
        <div className="hero">
            <div className="hero__background" />
            <div className="hero__text">
                <h1>
                    Rachael Lawless
                    <br />
                    &
                    <br />
                    Mattie Doucette Pilles
                    <br />
                    are getting
                    <br />
                    <span className="hero__married">married!</span>
                </h1>
            </div>
        </div>
    );
};
