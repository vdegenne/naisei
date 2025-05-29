import {withController} from '@snar/lit';
import {LitElement, html} from 'lit';
import {withStyles} from 'lit-with-styles';
import {customElement} from 'lit/decorators.js';
import toast from 'toastit';
import {authManager} from '../authManager.js';
import {confirm} from '../confirm.js';
import {openDayDialog} from '../imports.js';
import '../managers/daysManager/daysManager.js';
import {daysManager} from '../managers/daysManager/daysManager.js';
import {store} from '../store.js';
import styles from './app-shell.css?inline';

declare global {
	interface Window {
		app: AppShell;
	}
	interface HTMLElementTagNameMap {
		'app-shell': AppShell;
	}
}

@customElement('app-shell')
@withStyles(styles)
@withController(store)
export class AppShell extends LitElement {
	render() {
		return html`<!-- -->
			<md-icon-button @click=${() => this._logout()}>
				<md-icon>power</md-icon>
			</md-icon-button>

			${daysManager}

			<md-fab
				size="large"
				class="fixed bottom-10 right-10"
				@click=${this.addDay}
			>
				<md-icon slot="icon">add</md-icon>
			</md-fab>
			<!-- -->`;
	}

	@confirm()
	private _logout() {
		authManager.logout();
	}

	addDay = async () => {
		// We should check if today was already given
		// if (daysManager.todayWasEdited()) {
		// 	toast('Err... you already created an entry for today.');
		// 	return;
		// }
		try {
			const dialog = await openDayDialog();
			const day = await dialog.submitComplete;
			try {
				await daysManager.addDay(day);
				toast('Item added');
				dialog.close();
			} catch (err) {
				toast('Something went wrong, check console.');
				console.log(err.message);
			}
		} catch {}
	};

	async updateDay(dayId: string) {
		const day = daysManager.getDayFromId(dayId);
		if (day) {
			try {
				const dialog = await openDayDialog(day);
				const updatedDay = await dialog.submitComplete;
				try {
					// We weave new values in the old object to force update remote
					day.fromObject(updatedDay.toJSON());
					toast('Item updated');
					dialog.close();
				} catch (err) {
					toast('Something went wrong, check console.');
					console.log(err.message);
				}
			} catch {}
		}
	}

	async connectedCallback() {
		super.connectedCallback();
		if (!this.hasUpdated) {
			await this.updateComplete;
		}
		shell.loading = false;
	}
}

export const app = (window.app = new AppShell());
