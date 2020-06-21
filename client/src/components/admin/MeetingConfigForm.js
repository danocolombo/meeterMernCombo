import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Switch from '@material-ui/core/Switch';
import { toggleConfig } from '../../actions/admin';

const MeetingConfig = ({
    toggleConfig,
    auth: { activeClient },
    meeter: { mtgConfigs },
}) => {
    // const [formData, setFormData] = useState(initialState);
    // const { donations, cafe, cafeFac } = formData;
    const onChange = (e) => {
        // setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleChange = (event) => {
        // setState({ ...state, [event.target.name]: event.target.checked });
    };
    return (
        <div className='post-form'>
            {/* <div className='bg-primary p'>
                <h3>Meeting Configurations</h3>
            </div> */}
            <form>
                <div className='MeetingConfigFormBox'>
                    <div> configs here</div>
                    <Switch
                        checked={mtgConfigs.donations}
                        onChange={handleChange}
                        color='primary'
                        name='checkedA'
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                    Donations
                    <br />
                    <Switch
                        checked={mtgConfigs.cafe}
                        onChange={handleChange}
                        color='primary'
                        name='cafe'
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                    Cafe
                    <br />
                    <Switch
                        checked={mtgConfigs.transportation}
                        onChange={handleChange}
                        color='primary'
                        name='transportation'
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                    Transportation
                    <br />
                </div>
            </form>
        </div>
    );
};

MeetingConfig.propTypes = {
    toggleConfig: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
    auth: state.auth,
    meeter: state.meeter,
});

export default connect(mapStateToProps, { toggleConfig })(MeetingConfig);
