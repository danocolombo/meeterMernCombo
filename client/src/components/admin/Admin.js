import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import DisplayUsers from './DisplayUsers';

import { getClientInfo } from '../../actions/admin';

const Admin = ({ getClientInfo, auth: { activeClient } }) => {
    // useEffect(() => {
    //     if (activeClient) {
    //         getClientInfo({ activeClient });
    //     }
    // }, [getClientInfo]);
    return (
        <Fragment>
            <Fragment>
                <h2 className='large text-primary'>
                    <i className='far fa fa-cogs'></i> Admin
                </h2>
                Let's get info about {activeClient}
                <DisplayUsers cid={activeClient} />
            </Fragment>
        </Fragment>
    );
};

Admin.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { getClientInfo })(Admin);
