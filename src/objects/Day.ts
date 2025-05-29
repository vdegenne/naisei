import {ReactiveController, state} from '@snar/lit';
import {PropertyValues} from 'snar';
import {daysManager} from '../managers/daysManager/daysManager.js';
import {propertyValuesToJson} from '../utils.js';

type Mood = 1 | 2 | 3 | 4 | 5;

export class Day extends ReactiveController {
	id: string | undefined;
	@state() timestamp: number = Date.now();
	@state() mood: Mood | undefined;
	@state() sport = false;

	#firstUpdated = false;

	protected updated(_changedProperties: PropertyValues): void {
		if (!this.#firstUpdated) {
			this.#firstUpdated = true;
			return;
		}
		const changed = propertyValuesToJson(_changedProperties, this);
		console.log(changed);
		if (this.id !== undefined) {
			daysManager.updateDay(this.id, changed);
		}
	}
}
