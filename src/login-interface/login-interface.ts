import {html} from 'lit';
import {withStyles} from 'lit-with-styles';
import {customElement} from 'lit/decorators.js';
import toast from 'toastit';
import {SVG_GOOGLE_G, SVG_LOGO} from '../assets/assets.js';
import {MaterialShellChild} from '../MaterialShellChild.js';
import styles from './login-interface.css?inline';
import {authManager} from '../authManager.js';

declare global {
	interface HTMLElementTagNameMap {
		'login-interface': LoginInterface;
	}
	interface Window {
		loginInterface: LoginInterface;
	}
}

@customElement('login-interface')
@withStyles(styles)
export class LoginInterface extends MaterialShellChild {
	render() {
		return html`
			<div
				id="container"
				class="absolute inset-0 flex items-center justify-center"
			>
				<md-elevated-card class="p-5">
					<header class="text-center m-5">
						<md-icon style="--md-icon-size:64px"
							><img src="${SVG_LOGO}"
						/></md-icon>
					</header>
					<div id="content" class="">
						<md-filled-tonal-button @click=${this.#login}>
							<md-icon slot="icon">${SVG_GOOGLE_G}</md-icon>
							Sign in to continue
						</md-filled-tonal-button>
					</div>
				</md-elevated-card>
			</div>
		`;
	}

	updated() {
		// Preloading the main app for fast loading when user connects
		// TODO: Should probably load on real intention to connect
		// import('../app-shell/app-shell.js');
	}
	async connectedCallback() {
		super.connectedCallback();
		if (!this.hasUpdated) {
			await this.updateComplete;
		}
		shell.loading = false;
	}

	async #login() {
		try {
			await authManager.login();
			this.remove();
			shell.loading = true;
			toast('Welcome');
		} catch {
			toast('Canceled');
		}
	}
}

export const loginInterface = (window.loginInterface = new LoginInterface());
