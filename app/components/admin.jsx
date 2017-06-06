import React from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';
import firebase from 'firebase';

import Add from './admin-add.jsx';

// import styles from '../main.scss';

export default class Admin extends React.Component {
    static propTypes = { open: PropTypes.bool, close: PropTypes.func };
    state = { authed: false, authError: null };

    auth = this.auth.bind(this);

    auth() {
        const email = this.email.input.value;
        const pass = this.password.input.value;

        firebase
            .auth()
            .signInWithEmailAndPassword(email, pass)
            .then(user => {
                this.setState({ authed: true });
            })
            .catch(e => this.setState({ authError: e.message }));
    }

    render() {
        const actions = [
            <RaisedButton
                primary
                label="Close"
                onTouchTap={this.props.close}
            />,
        ];

        return (
            <Dialog
                title="Admin"
                actions={actions}
                modal={false}
                open={this.props.open}
                onRequestClose={this.props.close}
                autoScrollBodyContent={true}
            >
                <form
                    onSubmit={this.auth}
                    className={`${styles.authForm} ${this.state.authed
                        ? 'hidden'
                        : ''}`}
                >
                    <TextField
                        ref={n => (this.email = n)}
                        type="email"
                        floatingLabelText="Email"
                        errorText={this.state.authError}
                        required
                    />
                    <TextField
                        ref={n => (this.password = n)}
                        type="password"
                        floatingLabelText="Password"
                        required
                    />
                    <RaisedButton onClick={this.auth} label="sign in" />
                </form>
                <div className={!this.state.authed ? 'hidden' : ''}>
                    <Add />
                    {/* <Search /> */}
                </div>
            </Dialog>
        );
    }
}
