import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import human from './human';
import group from './group';
import gathering from './gathering';
import post from './post';
import meeter from './meeter';

export default combineReducers({
    alert,
    auth,
    profile,
    group,
    human,
    gathering,
    post,
    meeter,
});
