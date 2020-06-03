import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';

const initialState = {
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: '',
};

const EditProfile = ({
    profile: { profile, loading },
    createProfile,
    getCurrentProfile,
    history,
}) => {
    const [formData, setFormData] = useState(initialState);

    const [displaySocialInputs, toggleSocialInputs] = useState(false);

    useEffect(() => {
        if (!profile) getCurrentProfile();
        if (!loading) {
            const profileData = { ...initialState };
            for (const key in profile) {
                if (key in profileData) profileData[key] = profile[key];
            }
            setFormData(profileData);
        }
    }, [loading, getCurrentProfile, profile]);

    const {
        company,
        website,
        location,
        status,
        skills,
        githubusername,
        bio,
        twitter,
        facebook,
        linkedin,
        youtube,
        instagram,
    } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        createProfile(formData, history, true);
    };

    return (
        <Fragment>
            <h1 className='large text-primary'>Edit Your Profile</h1>
            <p className='lead'>
                <i className='fas fa-user' /> Add some changes to your profile
            </p>
            <small>* = required field</small>
            <form className='form' onSubmit={onSubmit}>
                <div className='form-group'>
                    <select name='status' value={status} onChange={onChange}>
                        <option>* Select Your Ministry Role</option>
                        <option value='Minstry Leader'>Ministry Leader</option>
                        <option value='Assimilation Coach'>
                            Assimilation Coach
                        </option>
                        <option value='Encouragement Coach'>
                            Encouragement Coach
                        </option>
                        <option value='Training Coach'>Training Coach</option>
                        <option value='Leader'>Leader</option>
                        <option value='Volunteer'>Volunteer</option>
                        <option value='Unknown'>Unknown</option>
                        <option value='Other'>Other</option>
                    </select>
                    <small className='form-text'>What is your role</small>
                </div>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='What are your areas of recovery?'
                        name='company'
                        value={company}
                        onChange={onChange}
                    />
                    <small className='form-text'>Recovery Areas</small>
                </div>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='How many years'
                        name='website'
                        value={website}
                        onChange={onChange}
                    />
                    <small className='form-text'>
                        How long have you been in recovery?
                    </small>
                </div>
                {/* <div className='form-group'>
                    <input
                        type='text'
                        placeholder='Location'
                        name='location'
                        value={location}
                        onChange={onChange}
                    />
                    <small className='form-text'>
                        City & state suggested (eg. Boston, MA)
                    </small>
                </div> */}
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='* Skills/Gifts/Passions'
                        name='skills'
                        value={skills}
                        onChange={onChange}
                    />
                    <small className='form-text'>
                        Please use comma separated values (eg. Prayer, Teaching,
                        Serving, Greeting, etc.)
                    </small>
                </div>
                {/* <div className='form-group'>
                    <input
                        type='text'
                        placeholder='Github Username'
                        name='githubusername'
                        value={githubusername}
                        onChange={onChange}
                    />
                    <small className='form-text'>
                        If you want your latest repos and a Github link, include
                        your username
                    </small>
                </div> */}
                <div className='form-group'>
                    <textarea
                        placeholder='Any other details you care to share'
                        name='bio'
                        value={bio}
                        onChange={onChange}
                    />
                    <small className='form-text'>
                        Tell us a little about yourself
                    </small>
                </div>

                <div className='my-2'>
                    <button
                        onClick={() => toggleSocialInputs(!displaySocialInputs)}
                        type='button'
                        className='btn btn-light'
                    >
                        Add Social Network Links
                    </button>
                    <span>Optional</span>
                </div>

                {displaySocialInputs && (
                    <Fragment>
                        <div className='form-group social-input'>
                            <i className='fab fa-twitter fa-2x' />
                            <input
                                type='text'
                                placeholder='Twitter URL'
                                name='twitter'
                                value={twitter}
                                onChange={onChange}
                            />
                        </div>

                        <div className='form-group social-input'>
                            <i className='fab fa-facebook fa-2x' />
                            <input
                                type='text'
                                placeholder='Facebook URL'
                                name='facebook'
                                value={facebook}
                                onChange={onChange}
                            />
                        </div>

                        <div className='form-group social-input'>
                            <i className='fab fa-youtube fa-2x' />
                            <input
                                type='text'
                                placeholder='YouTube URL'
                                name='youtube'
                                value={youtube}
                                onChange={onChange}
                            />
                        </div>

                        {/* <div className='form-group social-input'>
                            <i className='fab fa-linkedin fa-2x' />
                            <input
                                type='text'
                                placeholder='Linkedin URL'
                                name='linkedin'
                                value={linkedin}
                                onChange={onChange}
                            />
                        </div> */}

                        <div className='form-group social-input'>
                            <i className='fab fa-instagram fa-2x' />
                            <input
                                type='text'
                                placeholder='Instagram URL'
                                name='instagram'
                                value={instagram}
                                onChange={onChange}
                            />
                        </div>
                    </Fragment>
                )}

                <input type='submit' className='btn btn-primary my-1' />
                <Link className='btn btn-light my-1' to='/dashboard'>
                    Go Back
                </Link>
            </form>
        </Fragment>
    );
};

EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
    withRouter(EditProfile)
);
