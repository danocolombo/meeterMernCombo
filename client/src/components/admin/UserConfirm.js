import React, { Fragment } from 'react';
import SelectInput from '@material-ui/core/Select/SelectInput';
import { Button } from '@material-ui/core';

const userConfirm = (props) => {
    //================================================
    // presume you will get the user info from props
    //================================================
    const { name, uid } = props;
    const handleRoleSet = (e) => {
        // e.preventDefault();
        // alert('setting permissions!!');
        props.handleAction();
    };
    return (
        <>
            <h3>Please confirm...</h3>
            <p>
                {uid} {name}
            </p>
            <p>Please select a role to assign to the user.</p>
            <form>
                <select>
                    <option>Owner</option>
                    <option>Manager</option>
                    <option>User</option>
                </select>
                {/* <Button onClick={props.handleAction}>SET</Button> */}
                <Button onClick={handleRoleSet}>SET</Button>
            </form>
        </>
    );
};
export default userConfirm;
