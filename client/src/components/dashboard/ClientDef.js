import React, { Fragment } from 'react';
//-----------------------------------------------------
//this displays the current cient setting. Then checks
//to see if the client has the ability to switch to other
//clients. If so, create a dropdown and allow a button to
//change the current system client value.
//-----------------------------------------------------
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/* eslint react/prop-types: 0 */
const ClientDef = ({ user }) => {
    // const { _id, name, defaultClient } = user;
    // const activeClient = defaultClient;
    // console.log('uid:' + uid);

    return [
        <>
            {showActiveClient(user)}
            {/* {showFuture(gatherings)} */}
            {/* CLIENT: {defaultClient}
            {checkForMultiClient(_id, defaultClient)} */}
            WOW
        </>,
    ];
};
function allFutureGatherings(gatherings) {
    const theList = gatherings.map((g) => (
        <li>
            {g.meetingDate} - {g.meetingType}
        </li>
    ));
    return <ul>{theList}</ul>;
}
function checkForMultiClient(_id, defaultClient) {
    //this checks client table to see if the current user
    //is capable of switching to other clients
    //===================================================
}

function showActiveClient(user) {
    console.log('user._id: ' + user._id);
    return [<h4>One step at a time</h4>];
}
function showDate(d) {
    //return 'mm/dd/yyyy';
    let date = new Date(d);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dt = date.getDate() + 1;
    let nDate = month + '/' + dt + '/' + year;
    return nDate;
}

ClientDef.propTypes = {
    user: PropTypes.array.isRequired,
};
const mapStateToProps = (state) => ({
    user: state.auth.user,
});

export default connect(mapStateToProps)(ClientDef);
