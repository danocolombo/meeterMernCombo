import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';

const PeopleRemove = ({ userName, handleAction }) => {
    // const { user, key } = props;
    // const [ role, setRole ] = useState('');
    // const getValue = () => {
    //     return this.state.role;
    // }
    const handleSelectChange = (e) => {
        // this.setRole({role:e.target.value});
        // console.log('role selected: ' + e.target.value);
        // console.log('useState role: ' + role);
        // setRole(e.target.value);
        // console.log('useState role (after setRole): ' + role);
        // this.setRole({role:e.target.value});
    };
    const handleConfirm = (e) => {
        // e.preventDefault();
        // alert('setting permissions!!');
        // console.log('------------');
        // console.log('UserConfirmation :: handleRoleSet');
        // console.log('user: ' + userName);
        // console.log('role:' + role);
        // console.log('------------');
        handleAction('CONFIRM');
    };
    const handleCancel = () => {
        const cancelValue = 'CANCEL';
        handleAction(cancelValue);
    };
    return (
        <>
            <h3>Confirm Removal</h3>
            <p>
                Are you sure you want to remove {userName}? You have the ability
                to set them 'inactive', if this is temporary action. That will
                save their personal information
            </p>
            <br />

            <Button onClick={handleConfirm}>DELETE</Button>
            <Button onClick={handleCancel}>CANCEL</Button>
        </>
    );
};
PeopleRemove.propTypes = {
    userName: PropTypes.string.isRequired,
    handleAction: PropTypes.func.isRequired,
};
export default PeopleRemove;
