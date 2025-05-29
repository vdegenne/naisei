import {ago} from '@vdegenne/ago';
import {html, LitElement} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import toast from 'toastit';
import {type Day} from '../../objects/Day.js';
import {getDateFromTimestamp} from '../../utils.js';
import {app} from '../../app-shell/app-shell.js';

@customElement('days-manager')
export class DaysManager extends LitElement {
	@state() days: Day[] = [];

	render() {
		return html`
			${this.days.length
				? html`
						<md-list>
							${this.days.map((day) => {
								return html`
									<md-list-item
										type="button"
										@click=${() => app.updateDay(day.id)}
									>
										<div slot="headline">${ago(day.timestamp)}</div>
										<div slot="supporting-text">${day.timestamp}</div>
										${day.sport
											? html`
													<div id="badges" slot="end" class="">
														<md-icon-button inert>
															<md-icon>directions_run</md-icon>
														</md-icon-button>
													</div>
												`
											: null}
									</md-list-item>
									<md-divider></md-divider>
								`;
							})}
						</md-list>
					`
				: html`No data yet`}
		`;
	}

	getDayFromId(id: string) {
		return this.days.find((day) => day.id === id);
	}

	async loadDays() {
		try {
			const {getDays} = await import('./getDays.js');
			this.days = await getDays();
		} catch (err) {
			toast('Something went wrong, check console.');
			console.log(err.message);
		}
	}

	async addDay(day: Day) {
		try {
			const {addDay} = await import('./addDay.js');
			day = await addDay(day);
			this.days = [...this.days, day];
		} catch (err) {
			toast('Something went wrong, check console.');
			console.log(err.message);
		}
	}

	async removeDay(day: Day) {
		try {
			const id = day.id;
			const {removeDay} = await import('./removeDay.js');
			await removeDay(day);
			this.days.splice(this.days.findIndex((d) => d.id === id) >>> 0, 1);
			this.days = [...this.days];
		} catch (err) {
			toast('Something went wrong, check console.');
			console.log(err.message);
		}
	}

	async updateDay(dayId: string, properties: any) {
		try {
			const {updateDay} = await import('./updateDay.js');
			await updateDay(dayId, properties);
			// this.days.splice(this.days.findIndex((d) => d.id === id) >>> 0, 1);
			this.days = [...this.days];
		} catch (err) {
			toast('Something went wrong, check console.');
			console.log(err.message);
		}
	}

	todayWasEdited(): boolean {
		const todayStr = getDateFromTimestamp(Date.now());
		return this.days.some((day) => {
			return getDateFromTimestamp(day.timestamp) === todayStr;
		});
	}
}

export const daysManager = new DaysManager();
