import {ReactiveController, state} from '@snar/lit';
// import { saveToLocalStorage } from "snar-save-to-local-storage";
import {FormBuilder} from './forms/FormBuilder.js';

// @saveToLocalStorage('something')
export class AppStore extends ReactiveController {
	@state() var = '';
}

const store = new AppStore();
const F = new FormBuilder(store);
export {store, F};
