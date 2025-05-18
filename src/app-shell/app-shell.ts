import {withController} from '@snar/lit';
import {LitElement, html} from 'lit';
import {withStyles} from 'lit-with-styles';
import {customElement} from 'lit/decorators.js';
import {store} from '../store.js';
import styles from './app-shell.css?inline';
import {authManager} from '../loader.js';
import {confirm} from '../confirm.js';

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

			<!-- -->`;
	}

	@confirm()
	private _logout() {
		authManager.logout();
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
