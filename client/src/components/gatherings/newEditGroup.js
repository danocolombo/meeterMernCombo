import React from 'react';
import PropTypes from 'prop-types';

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
    return (
        <div>
            <header className='grpHeader'>
                <h2>Open Share Group</h2>
            </header>
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
        </div>
    );
};

EditGroup.propTypes = {
    addGroup: PropTypes.func.isRequired,
    getGroup: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, { addGroup, getGroup })(
    withRouter(EditGroup)
);
