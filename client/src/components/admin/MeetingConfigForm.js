import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormGroup, FormControlLabel, Button } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import Spinner from '../layout/Spinner';
import {
    toggleConfig,
    getMtgConfigs,
    updateMeetingConfigs,
} from '../../actions/admin';
import { SET_DEFAULT_GROUPS } from '../../actions/types';

const initialState = {
    setup: true,
    transportation: true,
    avContact: true,
    greeterContact1: true,
    greeterContact2: true,
    resourceContact: true,
    announcementsContact: true,
    closingContact: true,
    mealCnt: true,
    meal: true,
    mealContact: true,
    cafeCnt: true,
    cafeContact: true,
    nurseryCnt: true,
    nurseryContact: true,
    childrenCnt: true,
    childrenContact: true,
    youthCnt: true,
    youthContact: true,
    donations: true,
    securityContact: true,
    cleanup: true,
};
const MeetingConfig = ({
    toggleConfig,
    getMtgConfigs,
    updateMeetingConfigs,
    auth: { activeClient },
    meeter: { mtgConfigs, loading },
    history,
}) => {
    const [formData, setFormData] = useState(initialState);
    useEffect(() => {
        getMtgConfigs();
        //now update formData from redux
        setFormData({
            ...formData,
            setup: mtgConfigs.setup ? 1 : 0,
            transportation: mtgConfigs.transportation ? 1 : 0,
            avContact: mtgConfigs.avContact ? 1 : 0,
            greeterContact1: mtgConfigs.greeterContact1 ? 1 : 0,
            greeterContact2: mtgConfigs.greeterContact2 ? 1 : 0,
            resourceContact: mtgConfigs.resourceContact ? 1 : 0,
            announcementsContact: mtgConfigs.announcementsContact ? 1 : 0,
            closingContact: mtgConfigs.closingContact ? 1 : 0,
            mealCnt: mtgConfigs.mealCnt ? 1 : 0,
            meal: mtgConfigs.meal ? 1 : 0,
            mealContact: mtgConfigs.mealContact ? 1 : 0,
            cafeCnt: mtgConfigs.cafeCnt ? 1 : 0,
            cafeContact: mtgConfigs.cafeContact ? 1 : 0,
            nurseryCnt: mtgConfigs.nurseryCnt ? 1 : 0,
            nurseryContact: mtgConfigs.nurseryContact ? 1 : 0,
            childrenCnt: mtgConfigs.childrenCnt ? 1 : 0,
            childrenContact: mtgConfigs.childrenContact ? 1 : 0,
            youthCnt: mtgConfigs.youthCnt ? 1 : 0,
            youthContact: mtgConfigs.youthContact ? 1 : 0,
            donations: mtgConfigs.donations ? 1 : 0,
            securityContact: mtgConfigs.securityContact ? 1 : 0,
            cleanup: mtgConfigs.cleanup ? 1 : 0,
        });
    }, [loading, getMtgConfigs, mtgConfigs]);
    // const [formData, setFormData] = useState(initialState);
    // const { donations, cafe, cafeFac } = formData;

    //create intial formData
    const {
        setup,
        transportation,
        avContact,
        greeterContact1,
        greeterContact2,
        resourceContact,
        announcementsContact,
        closingContact,
        mealCnt,
        meal,
        mealContact,
        cafeCnt,
        cafeContact,
        nurseryCnt,
        nurseryContact,
        childrenCnt,
        childrenContact,
        youthCnt,
        youthContact,
        donations,
        securityContact,
        cleanup,
    } = formData;

    // const onChange = (e) => {
    //     setFormData({ ...FormData, [e.target.name]: e.target.value });
    // };
    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.checked });
    };
    const onSubmit = (e) => {
        e.preventDefault();
        updateMeetingConfigs(formData, history, activeClient, true);
    };
    return loading ? (
        <Spinner />
    ) : (
        <Fragment>
        <div className='post-form'>
            {/* <div className='bg-primary p'>
                <h3>Meeting Configurations</h3>
            </div> */}
            <form>
                <div className='MeetingConfigFormBox'>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={donations}
                                    onChange={handleChange}
                                    name='donations'
                                    color='primary'
                                />
                            }
                            label='Donations'
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={setup}
                                    onChange={handleChange}
                                    name='setup'
                                    color='primary'
                                />
                            }
                            label='Setup Contact'
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={cleanup}
                                    onChange={handleChange}
                                    name='cleanup'
                                    color='primary'
                                />
                            }
                            label='Clean-up Contact'
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={transportation}
                                    onChange={handleChange}
                                    name='transportation'
                                    color='primary'
                                />
                            }
                            label='Transportation Contact'
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={avContact}
                                    onChange={handleChange}
                                    name='avContact'
                                    color='primary'
                                />
                            }
                            label='Audio/Visual Contact'
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={greeterContact1}
                                    onChange={handleChange}
                                    name='greeterContact1'
                                    color='primary'
                                />
                            }
                            label='Greeter 1 Contact'
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={greeterContact2}
                                    onChange={handleChange}
                                    name='greeterContact2'
                                    color='primary'
                                />
                            }
                            label='Greeter 2 Contact'
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={resourceContact}
                                    onChange={handleChange}
                                    name='resourceContact'
                                    color='primary'
                                />
                            }
                            label='Resources Contact'
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={announcementsContact}
                                    onChange={handleChange}
                                    name='announcementsContact'
                                    color='primary'
                                />
                            }
                            label='Announcements Contact'
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={closingContact}
                                    onChange={handleChange}
                                    name='closingContact'
                                    color='primary'
                                />
                            }
                            label='Closing Contact'
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={securityContact}
                                    onChange={handleChange}
                                    name='securityContact'
                                    color='primary'
                                />
                            }
                            label='Security Contact'
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={mealCnt}
                                    onChange={handleChange}
                                    name='mealCnt'
                                    color='primary'
                                />
                            }
                            label='Meal Count'
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={meal}
                                    onChange={handleChange}
                                    name='meal'
                                    color='primary'
                                />
                            }
                            label='Meal Description'
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={mealContact}
                                    onChange={handleChange}
                                    name='mealContact'
                                    color='primary'
                                />
                            }
                            label='Meal Contact/Coordinator'
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={cafeCnt}
                                    onChange={handleChange}
                                    name='cafeCnt'
                                    color='primary'
                                />
                            }
                            label='Cafe Numbers'
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={cafeContact}
                                    onChange={handleChange}
                                    name='cafeContact'
                                    color='primary'
                                />
                            }
                            label='Cafe Contact'
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={nurseryCnt}
                                    onChange={handleChange}
                                    name='nurseryCnt'
                                    color='primary'
                                />
                            }
                            label='Nursery Numbers'
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={nurseryContact}
                                    onChange={handleChange}
                                    name='nurseryContact'
                                    color='primary'
                                />
                            }
                            label='Nursery Contact'
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={childrenCnt}
                                    onChange={handleChange}
                                    name='childrenCnt'
                                    color='primary'
                                />
                            }
                            label='Children Numbers'
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={childrenContact}
                                    onChange={handleChange}
                                    name='childrenContact'
                                    color='primary'
                                />
                            }
                            label='Children Contact'
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={youthCnt}
                                    onChange={handleChange}
                                    name='youthCnt'
                                    color='primary'
                                />
                            }
                            label='Youth Numbers'
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={youthContact}
                                    onChange={handleChange}
                                    name='youthContact'
                                    color='primary'
                                />
                            }
                            label='Youth Contact'
                        />
                        <Button variant='contained' color='secondary'>
                            Save Configurations
                        </Button>
                    </FormGroup>
                </div>
            </form>
        </div>
        </Fragment>
    );
};

MeetingConfig.propTypes = {
    toggleConfig: PropTypes.func.isRequired,
    getMtgConfigs: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
    auth: state.auth,
    meeter: state.meeter,
});

export default connect(mapStateToProps, { toggleConfig, getMtgConfigs })(
    MeetingConfig
);
