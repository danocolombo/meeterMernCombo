import React, { Fragment } from 'react';
import SelectInput from '@material-ui/core/Select/SelectInput';
import { Button } from '@material-ui/core';

const userConfirm = (props) => {
    //================================================
    // presume you will get the user info from props
    //================================================
    const { name, uid } = props;
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
                <Button>SET</Button>
            </form>
        </>
    );
};
export default userConfirm;
