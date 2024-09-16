import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faTrashCan, fas, faPencil } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() buttonText?: string;
	@Input() iconName?: string;
  @Output() newButtonEvent = new EventEmitter<any>();

	loginLogout(value: string) {
		console.log(value);
	}
	faTrashCan = faTrashCan;
	faPencil = faPencil;

	constructor(library: FaIconLibrary) {
		library.addIconPacks(fas);
	}
}
