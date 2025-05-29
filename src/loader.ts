// This needs to be before anything else
// because it sets a shared stylesheet used by
// elements' construtor.
import './styles/themeStore.js';
import './styles/shared.js';

import '@material/web/all.js';

// import './authManager.js';
import './firebase.js';

import './global-listeners.js';
import {type UserController} from './firebase/UserController.js';
import toast from 'toastit';
// import './gamepad.js';
