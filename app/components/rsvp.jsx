import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import * as firebase from 'firebase';

import { head as first } from 'ramda';

import styles from './rsvp.scss';

import Container from './container.jsx';
import Information from './correct-information.jsx';

const config = {
    apiKey: process.env.FIRE_API_KEY,
    authDomain: process.env.FIRE_AUTH_DOMAIN,
    databaseURL: process.env.FIRE_DATABASE_URL,
    projectId: process.env.FIRE_PROJECT_ID,
    storageBucket: process.env.FIRE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIRE_MESSAGING_SENDER_ID,
};

firebase.initializeApp(config);

export default class Rsvp extends React.Component {
    state = { rsvped: false, attendee: null };

    submit = this.submit.bind(this);

    submit() {
        const { value } = this.email.input;

        if (!value) return this.setState({ error: 'Please enter an email.' });
        else this.setState({ error: null });

        firebase
            .database()
            .ref('attendees')
            .orderByChild('email')
            .equalTo(value)
            .once('value')
            .then(snapshot => {
                const attendee = first(snapshot.val());

                if (!attendee) {
                    this.setState({
                        error: `Unable to find the email ${value} in our list 😔`,
                    });
                } else {
                    console.log(attendee);
                    this.setState({ attendee });
                }
            })
            .catch(e =>
                this.setState({
                    error: `Unable to find the email ${value} in our list 😔`,
                })
            );
    }

    render() {
        const { attendee, error } = this.state;

        return (
            <div id="rsvp" className={styles.rsvp}>
                <h2>Let Us Know If You Can Attend!</h2>
                <Container
                    className={`${styles.rsvpInner} ${attendee
                        ? 'hidden'
                        : ''}`}
                >
                    <TextField
                        floatingLabelText="Email"
                        hintText="Please enter your Email to RSVP"
                        type="email"
                        ref={n => (this.email = n)}
                        errorText={error}
                        fullWidth
                    />
                    <br />
                    <RaisedButton
                        onClick={this.submit}
                        className={styles.rsvpButton}
                    >
                        RSVP
                    </RaisedButton>
                </Container>
                <Information attendee={attendee} />
            </div>
        );
    }
}
