import {ReactiveController, state} from '@snar/lit';

type Mood = 1 | 2 | 3 | 4 | 5;

export class Day extends ReactiveController {
	@state() mood: Mood | undefined;
}
