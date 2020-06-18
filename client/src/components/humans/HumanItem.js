import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteHuman } from '../../actions/human';

const HumanItem = ({ deleteHuman, human: { _id, name, email, phone } }) => (
    <div className='PersonBox'>
        <div className='DeleteTarget'>
            <a
                id='deleteHuman'
                title='-'
                href='/#'
                onClick={() => deleteHuman(_id)}
            >
                <i className='fas fa-minus-circle'></i>
            </a>
        </div>
        <div>
            <Link to={`/EditHuman/${_id}`}>{name}</Link>
            <br />
            {/* only show phone field if there is a number for the user */}
            {phone ? (
                <Fragment>
                    <i className='fas fa-phone-square'></i>&nbsp;&nbsp;
                    {phone}
                    <br />
                </Fragment>
            ) : (
                <font></font>
            )}
            {email ? (
                <Fragment>
                    <i className='fas fa-envelope-square'></i>&nbsp;&nbsp;
                    {email}
                    <br />
                </Fragment>
            ) : (
                <font></font>
            )}
        </div>
    </div>
);

HumanItem.propTypes = {
    human: PropTypes.object.isRequired,
    deleteHuman: PropTypes.func.isRequired
};

export default connect(null, { deleteHuman })(HumanItem);
//post bg-white p-1 my-1
