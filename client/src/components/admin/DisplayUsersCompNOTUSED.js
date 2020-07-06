import React, { Fragment, useEffect } from 'react';
import { getClientUsers } from '../../actions/admin';
import Modal from '../layout/Modal/Modal';
import UserConfirm from './UserConfirm';
const DisplayUsersComp = ({ cid }) => {
    useEffect(() => {
        if (cid) {
            console.log('DisplayUsersComp...' + cid);
        }
    });
    return [
        <Fragment>
            <Modal>
                <UserConfirm user='Joe' uid='2233653ffh5677' />
            </Modal>
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
