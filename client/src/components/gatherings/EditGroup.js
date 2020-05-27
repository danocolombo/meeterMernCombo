import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormLabel } from '@material-ui/core';
import { FormControlLabel } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Input } from '@material-ui/core';
import { RadioGroup } from '@material-ui/core';
import { Radio } from '@material-ui/core';
import { createGroup, getGroup, deleteGroup } from '../../actions/group';
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

const EditGroup = ({
    group: { group, loading, newGroup},
    createGroup,
    getGroup,
    deleteGroup,
    match,
    history,
}) => {
    const [formData, setFormData] = useState(initialState);
        
    useEffect(() => {
        if (!group) {
            getGroup(match.params.gid);
        }
        if(!loading){
            const groupData = { ...initialState};
            for (const key in group){
                if (key in groupData) groupData[key] = group[key];
            }
            setFormData(groupData);
        }
        if (match.params.ig > 0) setFormData({...formData, groupId: match.params.gid});
        
    }, [ loading, getGroup, group]);

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

    // const getExistingGroup = (gid) => {
    //     // console.log('getExistingGroup: gid:' + gid);
    //     // const res = getGroup(gid);
    //     // // console.log('the response back was...');
    //     // // console.log('response:' + response.json);
    //     // return res();
    // };
    const handleGenderChange = (e) => {
        console.log('btnValue:' + e.target.value);
        setFormData({ ...formData, gender: e.target.value });
    };
    const handleChange = (event) => {
        console.log('event:' + event);
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };
    const onChange = (e) => {
        setFormData({ 
            ...formData, 
            [e.target.name]: e.target.value });

    };
        
    const onSubmit = (e) => {
        e.preventDefault();

        // let edit = false;
        // groupId != 0 ? (edit = true) : (edit = false);
        createGroup(formData, history, true);
        window.scrollTo(0, 0);
    };
    return (
        <Fragment>
            <form className='form' onSubmit={(e) => onSubmit(e)}>
                <div className='group-container'>
                    <header className='grpHeader'>
                        <h2>Open Share Group</h2>
                    </header>
                    {/* <div>
                        <input
                            type='hidden'
                            name='meetingId'
                            value={meetingId}
                        />
                    </div> */}
                    <div className='grpTitle'>
                        <TextField
                            id='title'
                            name='title'
                            label='Group title'
                            variant='outlined'
                            fullWidth
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
                            to={`/editGathering/${match.params.mid}`}
                        >
                            Go Back
                        </Link>
                    </div>
                    <div className='grpAttendance'>
                        <div className='input-field inline'>
                            <label
                                className='formLabellLeft'
                                htmlFor='grpAttendance'
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
                            fullWidth
                            value={location}
                            variant='outlined'
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
                                checked={gender === 'f'}
                                label='Female'
                                onChange={handleGenderChange}
                            />
                            <FormControlLabel
                                value='m'
                                control={<Radio />}
                                checked={gender === 'm'}
                                label='Male'
                                onChange={handleGenderChange}
                            />
                            <FormControlLabel
                                value='x'
                                control={<Radio />}
                                checked={gender === 'x'}
                                label='Mixed'
                                onChange={handleGenderChange}
                            />
                        </RadioGroup>
                    </div>
                    <div className='grpFacilitator'>
                        <TextField
                            id='facilitator'
                            label='Facilitator'
                            name='facilitator'
                            value={facilitator}
                            fullWidth
                            variant='outlined'
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
                            variant='outlined'
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
    group: PropTypes.object.isRequired,
    createGroup: PropTypes.func.isRequired,
    getGroup: PropTypes.func.isRequired,
    deleteGroup: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    group: state.group,
});

export default connect(mapStateToProps, { createGroup, getGroup, deleteGroup })(
    withRouter(EditGroup)
);
