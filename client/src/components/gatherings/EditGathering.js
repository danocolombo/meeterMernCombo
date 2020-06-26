import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createGathering, getGathering } from '../../actions/gathering';
import { getGroups } from '../../actions/group';
import GroupListItem from './GroupListItem';
import { getMtgConfigs } from '../../actions/admin';
// import ServantSelect from './ServantSelect';
// import GroupList from './GroupList';
import Spinner from '../layout/Spinner';

const initialState = {
    _id: '',
    meetingId: '',
    meetingDate: '',
    facilitator: '',
    meetingType: '',
    supportRole: '',
    worship: '',
    title: '',
    meal: '',
    avContact: '',
    mealCoordinator: 'TBD',
    cafeCoordinator: 'TBD',
    mealCount: 0,
    attendance: 0,
    donations: 0,
    greeter1: '',
    greeter2: '',
    resources: '',
    announcements: '',
    closing: '',
    security: '',
    newcomers: 0,
    nursery: 0,
    nurseryCoordinator: '',
    children: 0,
    childrenCoordinator: '',
    youth: 0,
    youthCoordinator: '',
    setup: '',
    cleanup: '',
    transportation: '',
    security: '',
    notes: '',
};

const EditGathering = ({
    gathering: { gathering, servants, loading, newGathering },
    auth: { activeClient, activeRole, activeStatus },
    group: { groups, groupLoading },
    meeter: { mtgConfigs },
    // mtgConfigs,
    createGathering,
    getGathering,
    getGroups,
    getMtgConfigs,
    match,
    history,
}) => {
    const [formData, setFormData] = useState(initialState);
    useEffect(() => {
        getGroups(match.params.id);

        getMtgConfigs(activeClient);
        // console.log('just ran getGroups');
    }, [activeClient, getGroups, getMtgConfigs, match.params.id]);
    useEffect(() => {
        if (!gathering) {
            getGathering(match.params.id);
            // getGroups(match.params.id);
        }
        if (!loading) {
            const gatheringData = { ...initialState };
            for (const key in gathering) {
                if (key in gatheringData) gatheringData[key] = gathering[key];
            }
            setFormData(gatheringData);
        }

        if (_id) setFormData({ ...formData, meetingId: _id });
    }, [loading, gathering, activeClient]);

    const {
        _id,
        meetingDate,
        meetingType,
        facilitator,
        supportRole,
        title,
        worship,
        avContact,
        meal,
        mealCoordinator,
        mealCount,
        cafeCoordinator,
        attendance,
        donations,
        greeter1,
        greeter2,
        resources,
        announcements,
        closing,
        newcomers,
        nursery,
        nurseryCoordinator,
        children,
        childrenCoordinator,
        youth,
        youthCoordinator,
        setup,
        cleanup,
        transportation,
        security,
        notes,
    } = formData;

    const onChange = (e) => {
        if (e.target === 'phone') {
            console.log('phonephonephonephone');
        }
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onServantChange = (servantSelected) => {
        //we are assuming Facilitator
        setFormData({ ...formData, [facilitator]: servantSelected });
        console.log('back from servantSelect. value: ' + servantSelected);
    };
    const onSubmit = (e) => {
        e.preventDefault();
        if (formData['meetingType'] === 'Testimony')
            delete formData['supportRole'];
        createGathering(formData, history, activeClient, true);
        window.scrollTo(0, 0);
    };

    // DANO
    console.log('donations: ' + mtgConfigs['donations']);
    console.log('type of mtgConfigs: ' + typeof mtgConfigs);
    console.table(mtgConfigs);
    const util = require('util');
    console.log(
        'mtgConfigs: ' +
            util.inspect(mtgConfigs, { showHidden: false, depth: null })
    );
    return loading ? (
        <Spinner />
    ) : (
        // function inside(){
        //     console.log('inside');
        // }
        <Fragment>
            <h1 className='large text-primary'>Your Meeting</h1>
            {/* <p className='lead'>
                <i className='fas fa-user' /> Have at it...
                <br />
            </p> */}
            <div>mealCnt configuration:{mtgConfigs['mealCnt']}</div>
            <small>* = required field</small>
            <form className='form' onSubmit={onSubmit}>
                <div>
                    <h4>Meeting Date **</h4>
                    <input
                        className='mDate'
                        type='date'
                        name='meetingDate'
                        value={meetingDate.slice(0, 10)}
                        onChange={(e) => onChange(e)}
                    />
                </div>
                <h4>Facilitator</h4>
                <input
                    type='text'
                    placeholder='Responsible party for meeting'
                    name='facilitator'
                    value={facilitator}
                    onChange={onChange}
                />
                {/* <select
                    value={facilitator}
                    name='facilitator'
                    onChange={onChange}
                >
                    {servants.map((s) => (
                        <option key={s.name} value={s.name}>
                            {s.name}
                        </option>
                    ))}
                </select> */}
                <div className='form-group'>
                    <h4>Meeting Type **</h4>
                    <select
                        key='2'
                        name='meetingType'
                        value={meetingType}
                        onChange={(e) => onChange(e)}
                    >
                        <option value='0'>** Select the type of meeting</option>
                        <option value='Lesson'>Lesson</option>
                        <option value='Testimony'>Testimony</option>
                        <option value='Special'>Special</option>
                        <option value='Teaching'>Teaching</option>
                        <option value='Other'>Other</option>
                    </select>
                    <small className='form-text'>
                        What kind of meeting is this?
                    </small>
                </div>
                <div className='form-group'>
                    {displayTitle()}
                    <input
                        type='text'
                        placeholder={diplayTitleHint()}
                        name='title'
                        value={title ? title : ' '}
                        onChange={onChange}
                    />
                    <small className='form-text'>{diplayTitleSubtitle()}</small>
                </div>
                {meetingType === 'Lesson' && (
                    <Fragment>
                        <input
                            type='text'
                            placeholder=''
                            name='supportRole'
                            value={supportRole}
                            onChange={onChange}
                        />

                        {/* <select
                            value={supportRole}
                            name='supportRole'
                            onChange={onChange}
                        >
                            {servants.map((s) => (
                                <option key={s.name} value={s.name}>
                                    {s.name}
                                </option>
                            ))}
                        </select> */}
                        <small className='form-text'>
                            Who is teaching the lesson?
                        </small>
                    </Fragment>
                )}
                {/* SHOW AVContact TEXTBOX IF CONFIGURED        */}
                {/* --- ???????????????????????????? ----- */}
                {(mtgConfigs['avContact'] === true ? (
                    <div className='form-group'>
                        <h4>Audio/Visual Contact</h4>
                        <input
                            type='text'
                            placeholder='who is doing tech?'
                            name='avContact'
                            value={avContact}
                            onChange={onChange}
                        />
                        <small className='form-text'>Tech contact</small>
                    </div>
                ) : null)}
                <div className='form-group'>
                    <h4>Worship</h4>
                    <input
                        type='text'
                        placeholder='Worship provided by...'
                        name='worship'
                        value={worship}
                        onChange={onChange}
                    />
                    <small className='form-text'>Worship supplied by...</small>
                </div>
                <div className='form-group'>
                    <h4>Attendance</h4>
                    <input
                        type='number'
                        id='attendance'
                        name='attendance'
                        value={attendance}
                        min='0'
                        max='200'
                        onChange={(e) => onChange(e)}
                    />
                    <small className='form-text'>
                        Number of people attending general meeting?
                    </small>
                </div>
                <h4>Newcomers</h4>
                <input
                    type='number'
                    id='newcomers'
                    name='newcomers'
                    value={newcomers}
                    min='0'
                    max='200'
                    onChange={(e) => onChange(e)}
                />
                <small className='form-text'>Number of newcomers?</small>
                {/* SHOW DONATIONS IF CONFIGURED        */}
                {/* --- ???????????????????????????? ----- */}
                {(mtgConfigs['donations'] === true ? (
                    <div className='form-group'>
                        <h4>Donations</h4>
                        <input
                            type='number'
                            id='donations'
                            name='donations'
                            value={donations}
                            min='0.00'
                            step='0.01'
                            max='500'
                            onChange={(e) => onChange(e)}
                        />
                        <small className='form-text'>
                            Amount of donations received?
                        </small>
                    </div>
                ) : null)}
                {/* SHOW MEAL DESCRIPTION IF CONFIGURED        */}
                {/* --- ???????????????????????????? ----- */}
                {(mtgConfigs['meal'] === true ? (
                    <div className='form-group'>
                        <h4>Meal</h4>
                        <input
                            type='text'
                            placeholder='Dinner plans...'
                            name='meal'
                            value={meal}
                            onChange={onChange}
                        />
                        <small className='form-text'>Dinner provided</small>
                    </div>
                ) : null)}
                {/* SHOW MEAL COORDINATOR IF CONFIGURED        */}
                {/* --- ???????????????????????????? ----- */}
                {(mtgConfigs['mealContact'] === true ? (
                    <div className='form-group'>
                        <h4>Meal Contact</h4>
                        <input
                            type='text'
                            placeholder=''
                            name='mealCoordinator'
                            value={mealCoordinator}
                            onChange={onChange}
                        />
                    </div>
                ) : null)}
                {/* SHOW MEAL COUNT IF CONFIGURED        */}
                {/* --- ???????????????????????????? ----- */}
                {(mtgConfigs['mealCnt'] === true ? (
                    <div className='form-group'>
                        <h4>Meal Count</h4>
                        <input
                            type='number'
                            id='mealCount'
                            name='mealCount'
                            value={mealCount}
                            min='0'
                            max='200'
                            onChange={(e) => onChange(e)}
                        />
                        <small className='form-text'>
                            Number of people served?
                        </small>
                    </div>
                ) : null)}
                {/* SHOW CAFE COUNT IF CONFIGURED        */}
                {/* --- ???????????????????????????? ----- */}
                {(mtgConfigs['cafeCount'] === true ? (
                    <div className='form-group'>
                        <h4>Cafe Attendees</h4>
                        <input
                            type='number'
                            id='cafeCount'
                            name='cafeCount'
                            value={mealCount}
                            min='0'
                            max='200'
                            onChange={(e) => onChange(e)}
                        />
                        <small className='form-text'>
                            Number of people served?
                        </small>
                    </div>
                ) : null)}
                {/* SHOW CAFE COORDINATOR IF CONFIGURED        */}
                {/* --- ???????????????????????????? ----- */}
                {(mtgConfigs['cafeContact'] === true ? (
                    <div className='form-group'>
                        <h4>Cafe Coordinator</h4>
                        <input
                            type='text'
                            placeholder=''
                            name='cafeCoordinator'
                            value={cafeCoordinator}
                            onChange={onChange}
                        />
                        <small className='form-text'>Cafe coordinator</small>
                    </div>
                ) : null)}
                {/* SHOW GREETER 1 IF CONFIGURED        */}
                {/* --- ???????????????????????????? ----- */}
                {(mtgConfigs['greeterContact1'] === true ? (
                    <div className='form-group'>
                        <h4>Greeter</h4>
                        <input
                            type='text'
                            placeholder=''
                            name='greeter1'
                            value={greeter1}
                            onChange={onChange}
                        />
                        <small className='form-text'>Greeter</small>
                    </div>
                ) : null)}
                {/* SHOW GREETER 2 IF CONFIGURED        */}
                {/* --- ???????????????????????????? ----- */}
                {(mtgConfigs['greeterContact2'] === true ? (
                    <div className='form-group'>
                        <h4>Greeter</h4>
                        <input
                            type='text'
                            placeholder=''
                            name='greeter2'
                            value={greeter2}
                            onChange={onChange}
                        />
                        <small className='form-text'>Greeter</small>
                    </div>
                ) : null)}
                {/* SHOW RESOURCES CONTACT IF CONFIGURED        */}
                {/* --- ???????????????????????????? ----- */}
                {(mtgConfigs['resourceContact'] === true ? (
                    <div className='form-group'>
                        <h4>Resources Contact</h4>
                        <input
                            type='text'
                            placeholder=''
                            name='resources'
                            value={resources}
                            onChange={onChange}
                        />
                        <small className='form-text'>Resources Contact</small>
                    </div>
                ) : null)}
                {/* SHOW ANNOUNCEMENTS CONTACT IF CONFIGURED        */}
                {/* --- ???????????????????????????? ----- */}
                {(mtgConfigs['announcementsContact'] === true ? (
                    <div className='form-group'>
                        <h4>Announcements Contact</h4>
                        <input
                            type='text'
                            placeholder=''
                            name='announcements'
                            value={announcements}
                            onChange={onChange}
                        />
                        <small className='form-text'>Announcements Contact</small>
                    </div>
                ) : null)}
                {/* SHOW CLOSING CONTACT IF CONFIGURED        */}
                {/* --- ???????????????????????????? ----- */}
                {(mtgConfigs['closingContact'] === true ? (
                    <div className='form-group'>
                        <h4>Closing Contact</h4>
                        <input
                            type='text'
                            placeholder=''
                            name='closing'
                            value={closing}
                            onChange={onChange}
                        />
                        <small className='form-text'>Closing Contact</small>
                    </div>
                ) : null)}
                {/* SHOW NURSERY COUNT IF CONFIGURED        */}
                {/* --- ???????????????????????????? ----- */}
                {(mtgConfigs['nurseryCnt'] === true ? (
                    <div className='form-group'>
                    <h4>Nursery Count</h4>
                    <input
                        type='number'
                        id='nursery'
                        name='nursery'
                        value={nursery}
                        min='0'
                        max='200'
                        onChange={(e) => onChange(e)}
                    />
                    <small className='form-text'>Number of kids in nursery?</small>
                    </div>
                ) : null )}
                {/* SHOW NURSERY COORDINATOR IF CONFIGURED        */}
                {/* --- ???????????????????????????? ----- */}
                {(mtgConfigs['nurseryContact'] === true ? (
                    <div className='form-group'>
                        <h4>Nursery Contact</h4>
                        <input
                            type='text'
                            placeholder=''
                            name='nurseryCoordinator'
                            value={nurseryCoordinator}
                            onChange={onChange}
                        />
                        <small className='form-text'>Nursery Contact</small>
                    </div>
                ) : null)}
                {/* SHOW CHILDREN COUNT IF CONFIGURED        */}
                {/* --- ???????????????????????????? ----- */}
                {(mtgConfigs['childrenCnt'] === true ? (
                    <div className='form-group'>
                        <h4>Children Count</h4>
                        <input
                            type='number'
                            id='children'
                            name='children'
                            value={children}
                            min='0'
                            max='200'
                            onChange={(e) => onChange(e)}
                        />
                        <small className='form-text'>
                            Number of kids in childcare?
                        </small>
                    </div>
                ): null )}
                {/* SHOW CHILDREN COORDINATOR IF CONFIGURED        */}
                {/* --- ???????????????????????????? ----- */}
                {(mtgConfigs['childrenContact'] === true ? (
                    <div className='form-group'>
                        <h4>Childern Contact</h4>
                        <input
                            type='text'
                            placeholder=''
                            name='childrenCoordinator'
                            value={childrenCoordinator}
                            onChange={onChange}
                        />
                        <small className='form-text'>Children Contact</small>
                    </div>
                ) : null)}
                {/* SHOW YOUTH COUNT IF CONFIGURED        */}
                {/* --- ???????????????????????????? ----- */}
                {(mtgConfigs['youthCnt'] === true ? (
                    <div className='form-group'>
                        <h4>Youth Count</h4>
                        <input
                            type='number'
                            id='youth'
                            name='youth'
                            value={youth}
                            min='0'
                            max='200'
                            onChange={(e) => onChange(e)}
                        />
                        <small className='form-text'>Number of kids in youth?</small>
                    </div>
                ) : null )}
                {/* SHOW YOUTH COORDINATOR IF CONFIGURED        */}
                {/* --- ???????????????????????????? ----- */}
                {(mtgConfigs['youthContact'] === true ? (
                    <div className='form-group'>
                        <h4>Youth Contact</h4>
                        <input
                            type='text'
                            placeholder=''
                            name='youthCoordinator'
                            value={youthCoordinator}
                            onChange={onChange}
                        />
                        <small className='form-text'>Youth Contact</small>
                    </div>
                ) : null)}
                {/* SHOW SETUP IF CONFIGURED        */}
                {/* --- ???????????????????????????? ----- */}
                {(mtgConfigs['setup'] === true ? (
                    <div className='form-group'>
                        <h4>Transportation Coordinator</h4>
                        <input
                            type='text'
                            placeholder=''
                            name='setup'
                            value={setup}
                            onChange={onChange}
                        />
                        <small className='form-text'>Setup Coordinator</small>
                    </div>
                ):null )}
                {/* SHOW CLEANUP IF CONFIGURED        */}
                {/* --- ???????????????????????????? ----- */}
                {(mtgConfigs['cleanup'] === true ? (
                    <div className='form-group'>
                        <h4>Clean-up Coordinator</h4>
                        <input
                            type='text'
                            placeholder=''
                            name='cleanup'
                            value={cleanup}
                            onChange={onChange}
                        />
                        <small className='form-text'>Clean-up point of contact</small>
                    </div>
                ):null )}
                {/* SHOW TRANSPORTATION IF CONFIGURED        */}
                {/* --- ???????????????????????????? ----- */}
                {(mtgConfigs['transportation'] === true ? (
                    <div className='form-group'>
                        <h4>Transportation Coordinator</h4>
                        <input
                            type='text'
                            placeholder=''
                            name='transportation'
                            value={transportation}
                            onChange={onChange}
                        />
                        <small className='form-text'>Transportation</small>
                    </div>
                ):null )}
                {/* SHOW SECURITY IF CONFIGURED        */}
                {/* --- ???????????????????????????? ----- */}
                {(mtgConfigs['securityContact'] === true ? (
                    <div className='form-group'>
                        <h4>Security Coordinator</h4>
                        <input
                            type='text'
                            placeholder=''
                            name='security'
                            value={security}
                            onChange={onChange}
                        />
                        <small className='form-text'>Security point of contact</small>
                    </div>
                ):null )}
                <div className='form-group'>
                        <div className='form-group'>
                            <h4>Notes</h4>
                            <textarea
                                placeholder='Description and notes for meeting'
                                name='notes'
                                value={notes}
                                onChange={(e) => onChange(e)}
                            ></textarea>
                        </div>
                    </div>
                {FormButtons()}
                <hr />
                <h2>
                    Open-Share Groups
                    {activeStatus === 'approved' && activeRole !== 'guest' ? (
                        <Link to={`/EditGroup/${_id}/0`}>
                            <div class='waves-effect waves-light btn'>
                                <i class='material-icons left green'>
                                    add_circle_outline
                                </i>

                                <span className='meeterNavTextHighlight'>
                                    {'  '}NEW
                                </span>
                            </div>
                        </Link>
                    ) : null}
                </h2>
            </form>
            <div>
                {groups &&
                    groups.map((group) => (
                        <GroupListItem
                            key={group._id}
                            mid={group.mid}
                            group={group}
                        />
                    ))}
            </div>
        </Fragment>
    );

    function displayTitle() {
        switch (meetingType) {
            case 'Lesson':
                return <h4>Lesson</h4>;

            case 'Testimony':
                return <h4>Who's Testimony?</h4>;

            default:
                return <h4>Description</h4>;
        }
    }

    function diplayTitleHint() {
        switch (meetingType) {
            case 'Lesson':
                return 'What is the lesson?';

            case 'Testimony':
                return "Who's testimony?";

            default:
                return <h4>Description</h4>;
        }
    }
    function diplayTitleSubtitle() {
        switch (meetingType) {
            case 'Lesson':
                return 'Which lesson is being given?';

            case 'Testimony':
                return "Who's testimony is being shared?";

            default:
                return 'Please provide a description of the event';
        }
    }
    function FormButtons() {
        var returnValue = [];
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        var mDate = new Date(meetingDate.slice(0, 10));
        // console.log('mDate:' + mDate);
        // console.log('today:' + today);
        if (mDate >= today) {
            console.log('greater than or equal');
            if (activeStatus === 'approved' && activeRole !== 'guest') {
                returnValue = [
                    <>
                        <input type='submit' className='btn btn-primary my-1' />
                        <Link className='btn btn-light my-1' to='/gatherings'>
                            Go Back
                        </Link>
                    </>,
                ];
            } else {
                returnValue = [
                    <>
                        <Link className='btn btn-light my-1' to='/gatherings'>
                            Go Back
                        </Link>
                    </>,
                ];
            }
        } else {
            returnValue = [
                <>
                    <input type='submit' className='btn btn-primary my-1' />
                    <Link
                        className='btn btn-light my-1'
                        to='/gatherings/historyView'
                    >
                        Go Back
                    </Link>
                </>,
            ];
        }
        return [
            <>
                <table>{returnValue}</table>
            </>,
        ];
    }

    // function displayTeacher() {
    //     if (meetingType === 'Lesson') {
    //         return [
    //             <h4>Teacher</h4>,
    //             <input
    //                 type='text'
    //                 placeholder='teacher...'
    //                 name='title'
    //                 value={supportRole}
    //                 onChange={onChange}
    //             />,
    //             <small className='form-text'>Who taught the lesson?</small>,
    //         ];
    //     }
    //     return null;
    // }
    // function displayFacilitator() {
    //     {
    //         console.log(servants.length);
    //         var peeps = '';
    //         servants.forEach((peep) => {
    //             peeps = peeps + peep;
    //         });
    //         const sample =
    //             "<option value='Junior Developer'>Junior Developer</option>";
    //         console.log(peeps);
    //         return [
    //             <div className='form-group'>
    //                 ,
    //                 <select name='status' value='{status}' onChange={onChange}>
    //                     ,<option>* Select Professional Status</option>,{sample},
    //                 </select>
    //                 ,
    //                 <small className='form-text'>
    //                     , 'Give us an idea of where you are at in your career',
    //                 </small>
    //                 ,
    //             </div>,
    //         ];
    //     }
    // }
};

EditGathering.propTypes = {
    createGathering: PropTypes.func.isRequired,
    getGathering: PropTypes.func.isRequired,
    getGroups: PropTypes.func.isRequired,
    getMtgConfigs: PropTypes.func.isRequired,
    gathering: PropTypes.object.isRequired,
    group: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    meeter: PropTypes.object.isRequired,
    // mtgConfigs: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    gathering: state.gathering,
    servants: state.servants,
    group: state.group,
    auth: state.auth,
    meeter: state.meeter,
    // mtgConfigs: state.meeter.mtgConfigs,
});

export default connect(mapStateToProps, {
    createGathering,
    getGathering,
    getGroups,
    getMtgConfigs,
})(withRouter(EditGathering));
