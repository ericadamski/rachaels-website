import React from 'react';

import './section.css';

export default class Section extends React.Component {
    render() {
        const { title, body, __html } = this.props;

        return (
            <section className="section">
                <h3 className="section__title">{ title }</h3>
                <div className="section__content">
                    { body.split('\n').map(para => <p>{ para }</p>) }
                    <div dangerouslySetInnerHTML={{__html}} />
                </div>
            </section>
        );
    }
}
