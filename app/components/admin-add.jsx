import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import firebase from 'firebase';

import styles from './admin-add.scss';

export default class Add extends React.Component {
    state = { showOther: false };

    submit = this.submit.bind(this);

    submit() {
        const name = this.name.getValue();
        const email = this.email.getValue();
        const vegan = this.vegan.isChecked();
        const vegetarian = this.vegetarian.isChecked();
        const lactos = this.lactos.isChecked();
        const gluten = this.gluten.isChecked();
        const other = this.other.getValue();

        if (email === '' || name === '') return;

        firebase
            .database()
            .ref('attendees')
            .push({
                name,
                email,
                diet: {
                    vegan,
                    vegetarian,
                    'lactos-free': lactos,
                    'gluten-free': gluten,
                    other,
                },
                address: '',
            })
            .then(() => {
                this.name.input.value = '';
                this.email.input.value = '';
                this.other.input.value = '';
                this.vegan.setChecked(false);
                this.vegetarian.setChecked(false);
                this.lactos.setChecked(false);
                this.gluten.setChecked(false);
            });
    }

    render() {
        return (
            <form className={styles.addForm} onSubmit={this.submit}>
                <TextField
                    ref={n => (this.name = n)}
                    floatingLabelText="name"
                    type="text"
                />
                <TextField
                    ref={n => (this.email = n)}
                    floatingLabelText="email"
                    type="email"
                />
                <Checkbox ref={n => (this.vegan = n)} label="Vegan" />
                <Checkbox ref={n => (this.vegetarian = n)} label="Vegetarian" />
                <Checkbox ref={n => (this.lactos = n)} label="Lactos Free" />
                <Checkbox ref={n => (this.gluten = n)} label="Gluten Free" />
                <Checkbox
                    onCheck={e => {
                        console.log(e);
                        this.setState({ showOther: e.target.checked });
                    }}
                    label="Other"
                />
                <div className={!this.state.showOther ? 'hidden' : ''}>
                    <TextField
                        ref={n => (this.other = n)}
                        floatingLabelText="Dietary Needs"
                        multiLine
                    />
                </div>
                <RaisedButton onClick={this.submit} label="Save" />
            </form>
        );
    }
}
