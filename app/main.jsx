import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { Header, Hero, Rsvp, Container, Admin, Details } from './components';

import styles from './main.scss';

injectTapEventPlugin();

export default class Main extends React.Component {
    state = { openAdmin: false };

    openAdmin = this.openAdmin.bind(this);

    openAdmin() {
        this.setState(state => ({ openAdmin: !state.openAdmin }));
    }

    render() {
        return (
            <div>
                <Header openAdmin={this.openAdmin} />
                <Container className={styles.page}>
                    <Hero />
                    <Details />
                    <Rsvp />
                    <Admin open={this.state.openAdmin} close={this.openAdmin} />
                </Container>
            </div>
        );
    }
}
