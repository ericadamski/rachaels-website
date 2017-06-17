import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';

import firebase from 'firebase';

import { Header, Hero, Rsvp, Container, Admin, Details, Section } from './components';

import './main.css';

injectTapEventPlugin();

export default class Main extends React.Component {
  state = { openAdmin: false, sections: [] };

  openAdmin = this.openAdmin.bind(this);

  openAdmin() {
    this.setState(state => ({ openAdmin: !state.openAdmin }));
  }

  componentDidMount() {
      firebase
        .database()
        .ref('sections')
        .once('value')
        .then(snapshot => {
            const sections = Object.values(snapshot.val()) || [];

            this.setState({ sections })
        });
  }

  render() {
    const { sections } = this.state;

    return (
            <div>
                <Header openAdmin={this.openAdmin} />
                <Container className="page">
                    <Hero />
                    <Details />
                    <Rsvp />
                    <div className="page__image--full-width page__section-1"/>
                    { sections.map(({ title, __html, body }) => <Section key={title} title={title} body={body} __html={__html} />) }
                    <div className="page__image--full-width page__section-2"/>
                    <Admin open={this.state.openAdmin} close={this.openAdmin} />
                </Container>
            </div>
        );
  }
}
