import React from 'react';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import * as firebase from 'firebase';

import { head as first } from 'ramda';

import './rsvp.css';

import Container from './container.jsx';
import Information from './correct-information.jsx';

const config = {
  apiKey: process.env.REACT_APP_FIRE_API_KEY,
  authDomain: process.env.REACT_APP_FIRE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIRE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIRE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIRE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIRE_MESSAGING_SENDER_ID,
};

firebase.initializeApp(config);

export default class Rsvp extends React.Component {
  state = { rsvped: false, attendees: null };

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
        const val = snapshot.val();
        const attendees = {
          id: first(Object.keys(val)),
          ...first(Object.values(val)),
        };

        if (!attendees) {
          this.setState({error: `Unable to find the email ${value} in our list 😔` });
        } else if (attendees.rsvp) {
          this.email.input.value = '';
          this.setState({
            rsvped: true,
            continue: this.makeContinue(attendees),
          });
        } else {
          this.setState({ attendees });
        }
      })
      .catch(e => {
        this.email.input.value = '';
        this.setState({error: `Unable to find the email ${value} in our list 😔` });
      });
  }

  close = this.close.bind(this);

  close() {
    this.setState({ attendees: null, rsvped: false });
  }

  makeContinue(attendees) {
    return () => {
      this.setState({ attendees, rsvped: false });
    };
  }

  render() {
    const { attendees, error } = this.state;

    return (
            <div id="rsvp" className="rsvp">
                <h2>Let Us Know If You Can Attend!</h2>
                <Container
                    className={`rsvp__inner ${attendees
                        ? 'hidden'
                        : ''}`}
                >
                    <TextField
                        floatingLabelText="Email"
                        hintText="Please enter your Email to RSVP"
                        type="email"
                        ref={n => this.email = n}
                        errorText={error}
                        fullWidth
                    />
                    <br />
                    <RaisedButton
                        onClick={this.submit}
                        className="rsvp__button"
                    >
                        RSVP
                    </RaisedButton>
                </Container>
                <Information attendees={attendees} close={this.close} />
                <Dialog
                    title="You've Already RSVP'ed"
                    actions={[
                      <FlatButton label="Cancel" onClick={this.close} />,
                      <FlatButton
                            primary
                            label="Continue"
                            onClick={this.state.continue}
                        />,
                    ]}
                    modal={false}
                    open={this.state.rsvped}
                    onRequestClose={this.close}
                >
                    It looks like you have already RSVP'ed to our wedding! If
                    you would like to change any of you're information anyway
                    please
                    click continue.
                </Dialog>
            </div>
        );
  }
}
