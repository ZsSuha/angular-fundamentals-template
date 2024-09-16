import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {}
  title = 'courses-app';
  headerButtonText = "LOGIN";
	buttonIconName: "trash" | "pencil" | "" = "";
	appInfoText = "Please use 'Add new Course' button to add your first course";
	appInfoTitle = "Your List Is Empty";
	appInfoButtonText = "ADD NEW COURSE";
}
