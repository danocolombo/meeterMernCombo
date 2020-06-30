import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';

const UserConfirm = ({ userName, handleAction }) => {
    // const { user, key } = props;
    const [role, setRole] = useState('');
    const getValue = () => {
        return this.state.role;
    };
    const handleSelectChange = (e) => {
        // this.setRole({role:e.target.value});
        // console.log('role selected: ' + e.target.value);
        // console.log('useState role: ' + role);
        setRole(e.target.value);
        // console.log('useState role (after setRole): ' + role);
        // this.setRole({role:e.target.value});
    };
    const handleRoleSet = (e) => {
        // e.preventDefault();
        // alert('setting permissions!!');
        // console.log('------------');
        // console.log('UserConfirmation :: handleRoleSet');
        // console.log('user: ' + userName);
        // console.log('role:' + role);
        // console.log('------------');
        if (role) {
            handleAction(role);
        }
    };
    const handleRoleCancel = () => {
        const cancelValue = 'CANCEL';
        handleAction(cancelValue);
    };
    return (
        <>
            <p>Please confirm your appoval for</p>
            <p style={{ 'padding-left': 50 }}>
                <strong>{userName}</strong>
            </p>
            <br />
            <p>Select a role for {userName}</p>
            <form>
                <select value={role} onChange={handleSelectChange}>
                    <option value=''></option>
                    <option value='owner'>Owner</option>
                    <option value='manager'>Manager</option>
                    <option value='guest'>User</option>
                </select>
                {/* <Button onClick={props.handleAction}>SET</Button> */}
                <Button onClick={handleRoleSet}>SET</Button>
                <Button onClick={handleRoleCancel}>CANCEL</Button>
            </form>
        </>
    );
};
UserConfirm.propTypes = {
    userName: PropTypes.string.isRequired,
    handleAction: PropTypes.func.isRequired,
};
export default UserConfirm;
