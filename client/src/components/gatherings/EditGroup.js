import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FormLabel } from '@material-ui/core';
import { FormControlLabel } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Input } from '@material-ui/core';
import { RadioGroup } from '@material-ui/core';
import { Radio } from '@material-ui/core';
import { connect } from 'react-redux';
import { createGroup } from '../../actions/group';

const EditGroup = ({ gathering, createGroup }, match, history) => {
    const [formData, setFormData] = useState({
        title: '',
        groupId: 0,
        meetingId: gathering._id,
        gender: '',
        location: '',
        facilitator: '',
        cofacilitator: '',
        attenance: 0,
        notes: '',
    });

    const {
        title,
        groupId,
        meetingId,
        gender,
        location,
        facilitator,
        cofacilitator,
        attendance,
        notes,
    } = formData;

    const handleChange = (event) => {
        console.log('event:' + event);
        setFormData(event.target.value);
    };
    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = (e) => {
        e.preventDefault();
        let edit = false;
        groupId != 0 ? (edit = true) : (edit = false);
        createGroup(formData, history, edit);
    };
    return (
        <Fragment>
            <form className='form' onSubmit={(e) => onSubmit(e)}>
                <div className='group-container'>
                    <header className='grpHeader'>
                        <h2>Open Share Group</h2>
                    </header>
                    <div>
                        <input
                            type='hidden'
                            name='meetingId'
                            value={meetingId}
                        />
                    </div>
                    <div className='grpTitle'>
                        <TextField
                            id='title'
                            name='title'
                            label='Group title'
                            variant='outlined'
                            fullWidth='true'
                            value={title}
                            onChange={(e) => onChange(e)}
                        />
                    </div>
                    <div className='grpButtons'>
                        {/* <Button
                            variant='contained'
                            color='primary'
                            size='small'
                            className='pl10 py-2'
                        >
                            Save
                        </Button> */}
                        <input type='submit' className='btn btn-primary my-1' />
                        {'      '}
                        <Link
                            className='btn btn-light my-1'
                            to={`/editGathering/${gathering._id}`}
                        >
                            Go Back
                        </Link>
                    </div>
                    <div className='grpAttendance'>
                        <div class='input-field inline'>
                            <label
                                className='formLabellLeft'
                                for='grpAttendance'
                            >
                                Attendance
                            </label>
                            <Input
                                id='attendance'
                                label='attendance'
                                name='attendance'
                                value={attendance}
                                type='number'
                                text-align='right'
                                className='attendance'
                                onChange={(e) => onChange(e)}
                            />
                        </div>
                    </div>
                    <div className='grpLocation'>
                        <TextField
                            id='location'
                            label='Location'
                            name='location'
                            value={location}
                            variant='outlined'
                            fullWidth='true'
                            onChange={(e) => onChange(e)}
                        />
                    </div>
                    <div className='grpGender'>
                        <FormLabel component='legend'>Gender</FormLabel>
                        <RadioGroup
                            aria-label='gender'
                            name='gender'
                            onChange={handleChange}
                        >
                            <FormControlLabel
                                value='f'
                                control={<Radio />}
                                label='Female'
                            />
                            <FormControlLabel
                                value='m'
                                control={<Radio />}
                                label='Male'
                            />
                            <FormControlLabel
                                value='x'
                                control={<Radio />}
                                label='Mixed'
                            />
                        </RadioGroup>
                    </div>
                    <div className='grpFacilitator'>
                        <TextField
                            id='facilitator'
                            label='Facilitator'
                            name='facilitator'
                            value={facilitator}
                            variant='outlined'
                            fullWidth='true'
                            onChange={(e) => onChange(e)}
                        />
                    </div>
                    <div className='grpCoFacilitator'>
                        <TextField
                            id='cofacilitator'
                            name='cofacilitator'
                            value={cofacilitator}
                            label='Co-Facilitator'
                            variant='outlined'
                            fullWidth='true'
                            onChange={(e) => onChange(e)}
                        />
                    </div>
                    <div className='grpNotes'>
                        <TextField
                            id='notes'
                            name='notes'
                            value={notes}
                            label='Notes'
                            multiline
                            rows='2'
                            fullWidth='true'
                            variant='outlined'
                            onChange={(e) => onChange(e)}
                        />
                    </div>
                </div>
            </form>
        </Fragment>
    );
    function getGroups() {
        // return [<div>GROUP:{match.params.gid}</div>];
        return 'T';
    }
    function giveRequestDetails() {
        return [
            <div>
                BURP
                {/* Meeting:{match.params.mid}
                <br />
                Group: {match.params.gid} */}
            </div>,
        ];
    }
};

EditGroup.propTypes = {
    gathering: PropTypes.object.isRequired,
    createGroup: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    gathering: state.gathering.gathering,
});

export default connect(mapStateToProps, { createGroup })(withRouter(EditGroup));
