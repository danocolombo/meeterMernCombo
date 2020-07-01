import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deletePerson } from '../../actions/people';

const PersonItem = ({
    deletePerson,
    deleteAction,
    person: { _id, name, email, phone },
}) => (
    <div className='PersonBox'>
        <div className='DeleteTarget'>
            <Fragment>
                <i
                    className='fa fa-trash'
                    onClick={() => deleteAction(_id, name)}
                ></i>
            </Fragment>
            {/* <a
                id='deletePerson'
                title='-'
                href='#'
                onClick={() => deleteAction(_id, name)}
            >
                <i className='fas fa-minus-circle'></i>
            </a> */}
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

PersonItem.propTypes = {
    person: PropTypes.object.isRequired,
    deletePerson: PropTypes.func.isRequired,
    deleteAction: PropTypes.func.isRequired,
};

export default connect(null, { deletePerson })(PersonItem);
//post bg-white p-1 my-1
