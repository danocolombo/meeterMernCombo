import React, { useState } from 'react';
// import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';

const initialState = {
    gender: '',
    title: '',
    location: '',
    facilitator: '',
};
const EditGroup = ({
    genderValue,
    titleValue,
    locationValue,
    facilitatorValue,
    handleAction,
}) => {
    const [formData, setFormData] = userState(initialState);
    const {
        _id: _id,
        gender: generValue,
        title: titleValue,
        location: locationValue,
        facilitator: facilitatorValue,
    } = formData;

    // const [gender, setGender] = useState(genderValue);
    // const [title, setTitle] = useState(titleValue);
    // const [location, setLocation] = useState(locationValue);
    // const [facilitator, setFacilitator] = useState(facilitatorValue);
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
        setRole('');
        handleAction(cancelValue);
    };
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    return (
        <>
            <h3>Update Group</h3>
            <p>
                Gender:
                <select value={gender} onChange={handleSelectChange}>
                    <option value='f'>Female</option>
                    <option value='m'>Male</option>
                    <option value='x'>Mixed</option>
                </select>
            </p>
            <p>
                <input
                    type='text'
                    placeholder='Group Title'
                    id='title'
                    name='title'
                    value={title}
                    onChange={onChange}
                />
            </p>
            <p>
                <input
                    type='text'
                    placeholder='Location'
                    id='location'
                    name='location'
                    value={location}
                    onChange={onChange}
                />
            </p>
            <p>
                <input
                    type='text'
                    placeholder='Facilitator'
                    id='facilitator'
                    name='facilitator'
                    value={facilitator}
                    onChange={onChange}
                />
            </p>
            <p>
                <Button onClick={handleUpdate}>SET</Button>
                <Button onClick={handleCancel}>CANCEL</Button>
            </p>
        </>
    );
};
UserCoEditGroupnfirm.propTypes = {
    genderValue: PropTypes.string.isRequired,
    titleValue: PropTypes.string.isRequired,
    locationValue: PropTypes.string.isRequired,
    facilitatorValue: PropTypes.string.isRequired,
    handleAction: PropTypes.func.isRequired,
};
export default EditGroup;
