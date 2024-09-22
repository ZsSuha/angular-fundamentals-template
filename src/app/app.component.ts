import { Component } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {}
  title = 'courses-app';
  headerButtonText = "LOGIN";
	buttonIconName: IconProp | undefined;
	appInfoText = "Please use 'Add new Course' button to add your first course";
	appInfoTitle = "Your List Is Empty";
	appInfoButtonText = "ADD NEW COURSE";
}
