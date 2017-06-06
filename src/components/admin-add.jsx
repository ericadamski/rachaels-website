import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import firebase from 'firebase';

import './admin-add.css';

export default class Add extends React.Component {
  state = { members: [{}] };

  members = [{}];

  submit = this.submit.bind(this);
  add = this.add.bind(this);

  add() {
    this.setState(({ members }) => {
      members.push({});
      this.members = members;

      return { members };
    });
  }

  submit() {
    const email = this.email.getValue();

    const members = this.members.map(member => ({
      name: member.nameRef.getValue(),
      diet: {
        vegan: member.veganRef.isChecked(),
        vegetarian: member.vegetarianRef.isChecked(),
        'lactose free': member.lactoseRef.isChecked(),
        'gluten free': member.glutenRef.isChecked(),
        other: member.otherRef.getValue(),
      },
    }));

    if (email === '') return;

    firebase
      .database()
      .ref('attendees')
      .push({
        email,
        members,
        address: '',
      })
      .then(() => {
        this.email.input.value = null;
        this.members = [{}];
        this.setState({ members: [{}] });
      });
  }

  render() {
    return (
            <form className="add-form" onSubmit={this.submit}>
              <TextField
                  ref={n => this.email = n}
                  floatingLabelText="email"
                  type="email"
              />
              { this.state.members.map((member, i) => {
                return (
                    <div key={i}>
                      <TextField
                          ref={n => this.members[i].nameRef = n}
                          floatingLabelText="name"
                          type="text"
                      />
                      <Checkbox ref={n => this.members[i].veganRef = n} label="Vegan" />
                      <Checkbox ref={n => this.members[i].vegetarianRef = n} label="Vegetarian" />
                      <Checkbox ref={n => this.members[i].lactoseRef = n} label="Lactose Free" />
                      <Checkbox ref={n => this.members[i].glutenRef = n} label="Gluten Free" />
                      <Checkbox
                          onCheck={e => this.setState({ [i]: e.target.checked })}
                          label="Other"
                      />
                      <div className={!this.state[i] ? 'hidden' : ''}>
                          <TextField
                              ref={n => this.members[i].otherRef = n}
                              floatingLabelText="Extra Dietary Needs"
                              multiLine
                          />
                      </div>
                    </div>
                    );
              })
                }
                <RaisedButton onClick={this.submit} label="Save" />
                <RaisedButton onClick={this.add} label="Add" />
            </form>
        );
  }
}
