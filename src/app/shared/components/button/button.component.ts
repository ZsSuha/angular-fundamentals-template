import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { IconDefinition, IconProp } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

	constructor(library: FaIconLibrary) {
		library.addIconPacks(fas);
	}

  	@Input() buttonText?: string;
	@Input() iconName?: IconProp;
	@Input() type: string = 'button';
  	@Input() disabled: boolean = false;
  	@Output() newButtonEvent = new EventEmitter<any>();

}
