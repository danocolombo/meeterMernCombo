import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { getClientUsers } from '../../actions/admin';

const DisplayUsers = ({ cid }) => {
    return [
        <Fragment>
            <p>seeking client info for {cid}</p>
            {showClient(cid)}
        </Fragment>,
    ];
};
function showClient(cid) {
    return [<ul>Step-by-Step: {cid}</ul>];
}
function availableClients(cid) {
    // const clients = getClientUsers(cid);
    // const util = require('util');
    // console.log('cid.activeClient: ' + cid.activeClient);
    // console.log(util.inspect(clients, { showHidden: false, depth: null }));
    console.log(
        'in components/admin/DisplayUsers :: availableClients(' + cid + ')'
    );
    var clients = {};
    if (cid) {
        clients = getClientUsers(cid);
        console.log('YES');
        const util = require('util');
        console.log(util.inspect(clients, { showHidden: false, depth: null }));
    }
    // console.log('clients: ' + typeof clients);
    return [
        <Fragment>
            <div>Wow, we are getting somewhere...</div>
        </Fragment>,
    ];
}
DisplayUsers.propTypes = {
    uid: PropTypes.object.isRequired,
};
export default DisplayUsers;
