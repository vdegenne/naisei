import {html, LitElement} from 'lit';
import {customElement} from 'lit/decorators.js';
import {Day} from '../../objects/Day.js';

@customElement('days-manager')
export class DaysManager extends LitElement {
	#days: Day[] = [];

	render() {
		return html`
			${this.#days.length
				? this.#days.map((day) => {
						return html` sport: ${day.sport}`;
					})
				: html`No data yet`}
			<md-text-button
				@click=${() => {
					this.addDay(new Day());
				}}
				>test</md-text-button
			>
		`;
	}

	async addDay(day: Day) {
		const {addDay} = await import('./addDay.js');
		await addDay(day);
	}
	async removeDay(day: Day) {
		const {removeDay} = await import('./removeDay.js');
		await removeDay(day);
	}
}
