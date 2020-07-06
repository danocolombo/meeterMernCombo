import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { deletePerson } from '../../actions/people';

const PersonItem = ({ person: { _id, name, email, phone }, deleteResponse }) => {
    const handleDeleteRequest = () => {
        deleteResponse(_id, name);
    }
    
    return (
    <div className='PersonBox'>
        <div className='DeleteTarget'>
        <i
                        className={'fa fa-trash my'}
                        onClick={handleDeleteRequest}
                    ></i>
        </div>
        <div>
            <Link to={`/EditPerson/${_id}`}>{name}</Link>
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
};

PersonItem.propTypes = {
    person: PropTypes.object.isRequired,
    deletePerson: PropTypes.func.isRequired,
};

export default PersonItem;
//post bg-white p-1 my-1
