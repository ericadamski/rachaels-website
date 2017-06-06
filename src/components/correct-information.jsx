import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/RaisedButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import firebase from 'firebase';

export default class Information extends React.Component {
  static propTypes = {
    close: PropTypes.func,
    attendees: PropTypes.shape({
      members: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        attending: PropTypes.bool,
        diet: PropTypes.shape({
          vegetarian: PropTypes.bool.isRequired,
          vegan: PropTypes.bool.isRequired,
          'gluten free': PropTypes.bool.isRequired,
          'lactose free': PropTypes.bool.isRequired,
          other: PropTypes.string.isRequired,
        }).isRequired,
      })).isRequired,
      email: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
    }),
  };

  state = { attendees: null };

  componentWillReceiveProps(props) {
    if (props.attendees) {
      const others = props.attendees.members.reduce((acc, member) => {
        acc[member.name] = member.diet.other !== '';

        return acc;
      }, {});

      this.setState({ attendees: props.attendees, ...others });

      this.attendees = Object.assign([], props.attendees.members);
    } else this.setState({ attendees: null });
  }

  rsvp = this.rsvp.bind(this);
  rsvpMember = this.rsvpMember.bind(this);

  update = this.update.bind(this);

  rsvpMember(memberIndex) {
    return (e, value) => {
      this.setState(({ attendees }) => {
        attendees.members[memberIndex].attending = value;

        return { attendees };
      });
    }
  }

  rsvp(e, value) {
    this.setState(({ attendees }) => {
      attendees.rsvp = value;

      return { attendees };
    });
  }

  update() {
    const address = this.address.getValue();

    const members = this.state.attendees.members.map(member => ({
      name: member.nameRef.getValue(),
      diet: {
        vegan: member.veganRef.isChecked(),
        vegetarian: member.vegetarianRef.isChecked(),
        'lactose free': member.lactoseRef.isChecked(),
        'gluten free': member.glutenRef.isChecked(),
        other: member.otherRef.getValue(),
      },
      attending: member.attending,
    }));

    firebase
      .database()
      .ref(`attendees/${this.state.attendees.id}`)
      .update({
        address,
        members,
        rsvp: this.state.attendees.rsvp,
      })
      .then(() => {
        this.props.close();
      });
  }

  render() {
    const { attendees } = this.state;

    if (!attendees) return null;

    const actions = [
      <FlatButton primary label="Save" onClick={this.update} />,
      <FlatButton label="Cancel" onClick={this.props.close} />,
    ];

    return (
            <Dialog
                title={`${attendees.members.length > 1 ? 'Is anyone in your party able to make it?' : 'Are you able to make it?'}`}
                actions={actions}
                modal={false}
                open={!!attendees}
                onRequestClose={this.props.close}
                autoScrollBodyContent={true}
            >
                <div className="rsvp">
                    <RadioButtonGroup
                        name="rsvp"
                        onChange={this.rsvp}
                        defaultSelected={(attendees || {}).rsvp || false}
                        style={{ width: '100%' }}
                    >
                        <RadioButton
                            label="Yes!"
                            checkedIcon={<span role="img">🎉</span>}
                            value={true}
                        />
                        <RadioButton
                            label="Unfortunately not."
                            checkedIcon={<span role="img">😭</span>}
                            value={false}
                        />
                    </RadioButtonGroup>
                </div>
                <div className={!(attendees || {}).rsvp ? 'hidden' : ''}>
                  <h2>We just need a little more information.</h2>
                  <TextField
                      fullWidth
                      disabled
                      ref={n => this.email = n}
                      floatingLabelText="Email"
                      type="email"
                      value={attendees.email}
                  />
                  <TextField
                      fullWidth
                      ref={n => this.address = n}
                      floatingLabelText="Mailing Address"
                      type="text"
                      defaultValue={attendees.address}
                  />
                  { attendees.members.map((attendee, i) => {
                    return  <div key={`${attendee.name}-${i}`}>
                        <h2>Will {attendee.name} be attending?</h2>
                        <RadioButtonGroup
                            name="rsvp"
                            onChange={this.rsvpMember(i)}
                            defaultSelected={attendee.attending}
                            style={{ width: '100%' }}
                        >
                            <RadioButton
                                label="Yes!"
                                checkedIcon={<span role="img">🎉</span>}
                                value={true}
                            />
                            <RadioButton
                                label="Unfortunately not."
                                checkedIcon={<span role="img">😭</span>}
                                value={false}
                            />
                        </RadioButtonGroup>
                        <div className={!attendee.attending ? 'hidden' : ''}>
                        <h3>Help us fill out some more details about {attendee.name}!</h3>
                        <TextField
                            fullWidth
                            ref={n => this.attendees[i].nameRef = n}
                            floatingLabelText="Name"
                            type="text"
                            defaultValue={attendee.name}
                        />
                        <Checkbox
                            ref={n => this.attendees[i].veganRef = n}
                            label="Vegan"
                            defaultChecked={attendee.diet.vegan}
                        />
                        <Checkbox
                            ref={n => this.attendees[i].vegetarianRef = n}
                            label="Vegetarian"
                            defaultChecked={attendee.diet.vegetarian}
                        />
                        <Checkbox
                            ref={n => this.attendees[i].lactoseRef = n}
                            label="Lactose Free"
                            defaultChecked={attendee.diet['lactose free']}
                        />
                        <Checkbox
                            ref={n => this.attendees[i].glutenRef = n}
                            label="Gluten Free"
                            defaultChecked={attendee.diet['gluten free']}
                        />
                        <Checkbox
                            onCheck={e =>
                                this.setState({ [attendee.name.toString()]: e.target.checked })}
                            label="Other"
                            defaultChecked={attendee.diet.other !== ''}
                        />
                        <div className={!this.state[attendee.name] ? 'hidden' : ''}>
                            <TextField
                                fullWidth
                                ref={n => this.attendees[i].otherRef = n}
                                floatingLabelText="Extra Dietary Needs"
                                multiLine
                                defaultValue={attendee.diet.other}
                            />
                        </div>
                      </div>
                    </div>;
                  })
              }
              </div>
            </Dialog>
        );
  }
}
