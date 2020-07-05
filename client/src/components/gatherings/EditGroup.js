import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { TextField, IconButton } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import { addGroup, getGroup, deleteGroup } from '../../actions/group';
const initialState = {
    _id: '',
    title: '',
    mid: 0,
    gender: 'x',
    location: '',
    facilitator: '',
    cofacilitator: '',
    attendance: 0,
    notes: '',
};
const EditGroup = ({ addGroup, getGroup, group: { group, loading } }) => {
    const [formData, setFormData] = useState(initialState);
    const {
        _id,
        title,
        mid,
        gender,
        location,
        facilitator,
        cofacilitator,
        attendance,
        notes,
    } = formData;
    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div>
            <header className='grpHeader'>
                <h2>Open Share Group</h2>
            </header>
            <select
                key='2'
                className='DGF-Gender'
                name='gender'
                value={gender}
                onChange={(e) => onChange(e)}
            >
                <option value='0'>** Select Gender</option>
                <option value='f'>Women's</option>
                <option value='m'>Men's</option>
                <option value='x'>Mixed</option>
            </select>
            <div className='grpTitle'>
                <TextField
                    id='title'
                    name='title'
                    label='Group title'
                    // variant='outlined'
                    fullWidth
                    value={title}
                    onChange={(e) => onChange(e)}
                />
            </div>
            <div className='grpLocation'>
                <TextField
                    id='location'
                    label='Location'
                    name='location'
                    fullWidth
                    value={location}
                    // variant='outlined'
                    onChange={(e) => onChange(e)}
                />
            </div>
            <div className='grpFacilitator'>
                <TextField
                    id='facilitator'
                    label='Facilitator'
                    name='facilitator'
                    value={facilitator}
                    fullWidth
                    // variant='outlined'
                    onChange={(e) => onChange(e)}
                />
            </div>
            <div className='grpCoFacilitator'>
                <TextField
                    id='cofacilitator'
                    name='cofacilitator'
                    value={cofacilitator}
                    fullWidth
                    label='Co-Facilitator'
                    // variant='outlined'
                    onChange={(e) => onChange(e)}
                />
            </div>
            <div className='grpNotes'>
                <TextField
                    id='notes'
                    name='notes'
                    value={notes}
                    label='Notes'
                    fullWidth
                    multiline
                    rows='2'
                    // variant='outlined'
                    onChange={(e) => onChange(e)}
                />
            </div>
            <i className={'pl-2 fas fa-check my-1'}></i>
            <i className={'pl-3 fa fa-ban'}></i>
            <IconButton variant='outlined' size='small' aria-label='cancel'>
                <CancelIcon />
            </IconButton>
        </div>
    );
};

EditGroup.propTypes = {
    addGroup: PropTypes.func.isRequired,
    getGroup: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
    group: state.group,
    auth: state.auth,
});
export default connect(mapStateToProps, { addGroup, getGroup })(
    withRouter(EditGroup)
);
