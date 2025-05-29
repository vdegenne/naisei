import type {MdDialog} from '@material/web/all.js';
import {customElement} from 'custom-element-decorator';
import {html, LitElement} from 'lit';
import {withStyles} from 'lit-with-styles';
import {query, state} from 'lit/decorators.js';
import {bindInput} from '../forms/bindInput.js';
import styles from './day-dialog.css?inline';
import '../material/dialog-patch.js';
import {Day} from '../objects/Day.js';
import {FormBuilder} from '../forms/FormBuilder.js';
import {removeObjectKeys} from '../utils.js';

declare global {
	interface Window {
		dayDialog: DayDialog;
	}
	interface HTMLElementTagNameMap {
		'day-dialog': DayDialog;
	}
}

type ResolveValue = Day;

@customElement({name: 'day-dialog', inject: true})
@withStyles(styles)
export class DayDialog extends LitElement {
	@state() open = false;
	@state() type: 'Create' | 'Edit' = 'Create';

	#object: Day;
	#F: FormBuilder<Day>;

	constructor(day?: Day) {
		super();
		if (day) {
			this.type = 'Edit';
			day = new Day(null, removeObjectKeys(day.toJSON(), ['id']));
		} else {
			this.type = 'Create';
			day = new Day();
		}
		this.#object = day;
		this.#object.bind(this);
		this.#F = new FormBuilder(this.#object);
	}

	@query('md-dialog') dialog!: MdDialog;

	canSubmit() {
		return true;
	}

	render() {
		// const nameAlreadyExists = store.collections.some(
		// 	(col) => col.name === this.name,
		// );

		return html`<!-- -->
			<md-dialog
				?open="${this.open}"
				@opened="${() => {
					this.renderRoot.querySelector<HTMLElement>('[autofocus]')?.focus();
				}}"
				@close="${() => {
					const returnValue = this.dialog.returnValue;
					if (!returnValue || returnValue === 'cancel') {
						this.#submitPromiseWithResolvers.reject();
					}
				}}"
				@closed="${() => {
					this.remove();
					this.open = false;
				}}"
			>
				<header slot="headline">${this.type} day</header>

				<form slot="content" method="dialog" id="form">
					<div class="flex items-center gap-3 mb-12">
						${this.#F.TEXTFIELD('Date', 'timestamp', {
							type: 'date',
							resetButton: false,
						})}
						<md-filled-tonal-button
							form=""
							@click="${() => (this.#object.timestamp = Date.now())}"
							>today</md-filled-tonal-button
						>
					</div>
					<div class="flex flex-col gap-4">
						${this.#F.SWITCH('Sport', 'sport')}
					</div>
				</form>

				<div slot="actions">
					${this.type === 'Edit'
						? html`
								<md-filled-tonal-button error>
									<md-icon slot="icon">delete</md-icon>
									Delete
								</md-filled-tonal-button>
							`
						: null}
					<div class="flex-1"></div>
					<md-text-button form="form">Cancel</md-text-button>
					<md-filled-button
						?disabled=${!this.canSubmit()}
						@click=${this.#submit}
					>
						${this.type}
					</md-filled-button>
				</div>
			</md-dialog>
			<!-- --> `;
	}

	#submitPromiseWithResolvers = Promise.withResolvers<ResolveValue>();
	get submitComplete() {
		return this.#submitPromiseWithResolvers.promise;
	}
	#submit = () => {
		this.#submitPromiseWithResolvers.resolve(this.#object);
	};

	show() {
		this.open = true;
		// this.#submitPromiseWithResolvers = Promise.withResolvers<ResolveValue>();
		// return this.#submitPromiseWithResolvers.promise;
	}

	close(returnValue?: string) {
		return this.dialog.close(returnValue);
	}
}

// export const dayDialog = new DayDialog();
