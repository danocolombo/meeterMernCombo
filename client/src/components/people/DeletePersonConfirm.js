import React from 'react';

import PropTypes from 'prop-types';

const ConfirmPersonDelete = ({
    deleteResponse,
    userName
}) => {
    const handleDeleteConfirm = () => {
        deleteResponse('DELETE');
    };
    const handleDeleteCancel = () => {
        deleteResponse("CANCEL");
    }
    return (
        <>
            <h3>Confirm Delete</h3>
            <p>You need to confirm you want 
                to delete <strong><i>{userName}</i></strong>.
            </p>
            <p>Deleting the user will remove their records. Any
                meeting assignments or references will not be lost,
                but training and information about the person will
                be deleted.
            </p>
            <br />
            

            <p>Please confirm</p>
            <div>
                <i
                    className={'fas fa-check pl-2 my'}
                    onClick={handleDeleteConfirm}
                ></i>
                <i
                    className={'pl-2 fa fa-ban my'}
                    onClick={handleDeleteCancel}
                ></i>
            </div>
        </>
    );
};
ConfirmPersonDelete.propTypes = {
    deleteResponse: PropTypes.func.isRequired,
    userName: PropTypes.string.isRequired,
};
export default ConfirmPersonDelete;
