import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layout/Alert';
import Dashboard from '../dashboard/Dashboard';
import CreateProfile from '../profile-forms/CreateProfile';
import EditProfile from '../profile-forms/EditProfile';
import AddExperience from '../profile-forms/AddExperience';
import AddEducation from '../profile-forms/AddEducation';
import Profiles from '../profiles/Profiles';
import Profile from '../profile/Profile';
import UserProfile from '../profile/UserProfile';
import Posts from '../posts/Posts';
import Post from '../post/Post';
import People from '../people/People';
// import Admin from '../admin/Admin';
import Security from '../admin/DisplaySecurity';
// import Gathering from '../gatherings/Gathering';
import Gatherings from '../gatherings/Gatherings';
import EditGathering from '../gatherings/EditGathering';
import EditGroup from '../gatherings/EditGroup';
import EditPerson from '../people/EditPerson';
//import GatheringForm from '../gatherings/GatheringForm';
import NotFound from '../layout/NotFound';
import PrivateRoute from '../routing/PrivateRoute';
// import PersonForm from '../people/PersonForm';

const Routes = () => {
    return (
        <section className='container'>
            <Alert />
            <Switch>
                <Route exact path='/register' component={Register} />
                <Route exact path='/login' component={Login} />
                <PrivateRoute exact path='/profiles' component={Profiles} />
                <PrivateRoute exact path='/profile/:id' component={Profile} />
                <PrivateRoute exact path='/dashboard' component={Dashboard} />
                <PrivateRoute
                    exact
                    path='/create-profile'
                    component={CreateProfile}
                />
                <PrivateRoute
                    exact
                    path='/edit-profile'
                    component={EditProfile}
                />
                <PrivateRoute
                    exact
                    path='/add-experience'
                    component={AddExperience}
                />
                <PrivateRoute
                    exact
                    path='/add-education'
                    component={AddEducation}
                />
                <PrivateRoute exact path='/posts' component={Posts} />
                <PrivateRoute exact path='/posts/:id' component={Post} />
                <PrivateRoute exact path='/people' component={People} />

                <PrivateRoute exact path='/gatherings' component={Gatherings} />
                <PrivateRoute
                    exact
                    path='/gatherings/:options'
                    component={Gatherings}
                />
                {/* <PrivateRoute
                    exact
                    path='/gatheringForm'
                    component={GatheringForm}
                /> */}
                {/* <PrivateRoute
                    exact
                    path='/gatheringForm/:id'
                    component={GatheringForm}
                /> */}

                <PrivateRoute
                    exact
                    path='/EditGathering/:id'
                    component={EditGathering}
                />
                <PrivateRoute
                    exact
                    path='/EditGroup/:mid/:gid'
                    component={EditGroup}
                />
                <PrivateRoute
                    exact
                    path='/EditPerson/:id'
                    component={EditPerson}
                />
                <PrivateRoute
                    exact
                    path='/UserProfile'
                    component={UserProfile}
                />
                <PrivateRoute
                    exact
                    path='/DisplaySecurity'
                    component={Security}
                />
                {/* <PrivateRoute exact path='/admin' component={Admin} /> */}
                <Route component={NotFound} />
            </Switch>
        </section>
    );
};

export default Routes;
