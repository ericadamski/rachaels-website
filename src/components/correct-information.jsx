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
        attendee: PropTypes.shape({
            name: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
            diet: PropTypes.shape({
                vegetarian: PropTypes.bool.isRequired,
                vegan: PropTypes.bool.isRequired,
                'gluten free': PropTypes.bool.isRequired,
                'lactose free': PropTypes.bool.isRequired,
                other: PropTypes.string.isRequired,
            }).isRequired,
            address: PropTypes.string.isRequired,
        }),
    };

    state = { attendee: null, showOther: false };

    componentWillReceiveProps(props) {
        let other = false;

        if (props.attendee && props.attendee.diet.other !== '') other = true;

        this.setState({
            attendee: props.attendee,
            showOther: other,
        });
    }

    rsvp = this.rsvp.bind(this);

    update = this.update.bind(this);

    rsvp(e, value) {
        this.setState(({ attendee }) => {
            attendee.rsvp = value;

            return { attendee };
        });
    }

    update() {
        const name = this.name.getValue();
        const other = this.other.getValue();
        const address = this.address.getValue();

        const vegan = this.vegan.isChecked();
        const vegetarian = this.vegetarian.isChecked();
        const lactose = this.lactose.isChecked();
        const gluten = this.gluten.isChecked();

        firebase
            .database()
            .ref(`attendees/${this.state.attendee.id}`)
            .update({
                name,
                address,
                diet: {
                    vegan,
                    vegetarian,
                    'lactose free': lactose,
                    'gluten free': gluten,
                    other,
                },
                rsvp: this.state.attendee.rsvp,
            })
            .then(() => {
                this.props.close();
            });
    }

    render() {
        const { attendee } = this.state;
        const diet = (attendee || {}).diet;

        const actions = [
            <FlatButton primary label="Save" onClick={this.update} />,
            <FlatButton label="Cancel" onClick={this.props.close} />,
        ];

        return (
            <Dialog
                title="Details"
                actions={actions}
                modal={false}
                open={!!this.state.attendee}
                onRequestClose={this.props.close}
                autoScrollBodyContent={true}
            >
                <div className="rsvp">
                    <RadioButtonGroup
                        name="rsvp"
                        onChange={this.rsvp}
                        defaultSelected={(attendee || {}).rsvp || false}
                        style={{ width: '100%' }}
                    >
                        <RadioButton
                            label="Coming"
                            checkedIcon={<span>🎉</span>}
                            value={true}
                        />
                        <RadioButton
                            label="Not Coming"
                            checkedIcon={<span>😭</span>}
                            value={false}
                        />
                    </RadioButtonGroup>
                </div>
                <div className={!(attendee || {}).rsvp ? 'hidden' : ''}>
                    <h2>Help us fill out some more details!</h2>
                    <TextField
                        fullWidth
                        ref={n => (this.name = n)}
                        floatingLabelText="Name"
                        type="text"
                        defaultValue={(attendee || {}).name}
                    />
                    <TextField
                        fullWidth
                        disabled
                        ref={n => (this.email = n)}
                        floatingLabelText="Email"
                        type="email"
                        value={(attendee || {}).email}
                    />
                    <TextField
                        fullWidth
                        ref={n => (this.address = n)}
                        floatingLabelText="Mailing Address"
                        type="text"
                        defaultValue={(attendee || {}).address}
                    />
                    <Checkbox
                        ref={n => (this.vegan = n)}
                        label="Vegan"
                        defaultChecked={(diet || {}).vegan}
                    />
                    <Checkbox
                        ref={n => (this.vegetarian = n)}
                        label="Vegetarian"
                        defaultChecked={(diet || {}).vegetarian}
                    />
                    <Checkbox
                        ref={n => (this.lactose = n)}
                        label="Lactose Free"
                        defaultChecked={(diet || {})['lactose free']}
                    />
                    <Checkbox
                        ref={n => (this.gluten = n)}
                        label="Gluten Free"
                        defaultChecked={(diet || {})['gluten free']}
                    />
                    <Checkbox
                        onCheck={e =>
                            this.setState({ showOther: e.target.checked })}
                        label="Other"
                        defaultChecked={(diet || {}).other !== ''}
                    />
                    <div className={!this.state.showOther ? 'hidden' : ''}>
                        <TextField
                            fullWidth
                            ref={n => (this.other = n)}
                            floatingLabelText="Extra Dietary Needs"
                            multiLine
                            defaultValue={(diet || {}).other}
                        />
                    </div>
                </div>
            </Dialog>
        );
    }
}
