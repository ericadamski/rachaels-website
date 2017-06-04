import React from 'react';
import PropTypes from 'prop-types';

export default class Information extends React.Component {
    static propTypes = {
        attendee: PropTypes.shape({
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

    componentWillReceiveProps(props) {
        this.setState({
            attendee: props.attendee,
        });
    }

    render() {
        if (!this.props.attendee) return null;
        return <div>{JSON.stringify(this.state.attendee)}</div>;
    }
}
