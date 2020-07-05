import React, { Fragment, useEffect } from 'react';
import { getClientUsers } from '../../actions/admin';
const DisplayUsersComp = ({ cid }) => {
    useEffect(() => {
        if (cid) {
            console.log('DisplayUsersComp...' + cid);
        }
    });
    return [
        <Fragment>
            <hr />
            <p>
                DisplayUsersComp.js
                <br />
                <b>Funcional Component</b>
            </p>
            <p>FC here, and we got {cid}</p>
        </Fragment>,
    ];
};
export default DisplayUsersComp;
