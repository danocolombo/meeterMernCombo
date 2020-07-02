import React, { useState } from 'react';
// import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';

const EditGroup = ({
    _id,
    genderValue,
    titleValue,
    locationValue,
    facilitatorValue,
    handleAction,
}) => {
    const [gender, setGender] = useState(genderValue);
    const [title, setTitle] = useState(titleValue);
    const [location, setLocation] = useState(locationValue);
    const [facilitator, setFacilitator] = useState(facilitatorValue);
    const getValue = () => {
        return this.state.role;
    };
    const handleChange = (e) => {
        switch (e.name) {
            case 'gender':
                setGender(e.value);
                break;
            case 'title':
                setTitle(e.value);
                break;
            case 'location':
                setLocation(e.value);
                break;
            case 'facilitator':
                setFacilitator(e.value);
                break;
            default:
                break;
        }
    };
    const handleRoleSet = (e) => {
        // e.preventDefault();
        // alert('setting permissions!!');
        // console.log('------------');
        // console.log('UserConfirmation :: handleRoleSet');
        // console.log('user: ' + userName);
        // console.log('role:' + role);
        // console.log('------------');
        // if (role) {
        //     handleAction(role);
        // }
    };
    // const handleRoleCancel = () => {
    //     const cancelValue = 'CANCEL';
    //     setRole('');
    //     handleAction(cancelValue);
    // };
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    return (
        <>
            {_id ? <h3>Edit Default Group</h3> : <h3>Update Group</h3>}

            <p>
                Gender:
                <select value={gender} onChange={handleSelectChange}>
                    <option value='f'>Female</option>
                    <option value='m'>Males</option>
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
                {/* <Button onClick={handleUpdate}>SET</Button>
                <Button onClick={handleCancel}>CANCEL</Button> */}
            </p>
        </>
    );
};
UserCoEditGroupnfirm.propTypes = {
    editOrigin: PropTypes.string.isRequired,
    genderValue: PropTypes.string.isRequired,
    titleValue: PropTypes.string.isRequired,
    locationValue: PropTypes.string.isRequired,
    facilitatorValue: PropTypes.string.isRequired,
    handleAction: PropTypes.func.isRequired,
};
export default EditGroup;
