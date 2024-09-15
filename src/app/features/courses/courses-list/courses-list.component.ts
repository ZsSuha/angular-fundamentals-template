import { Component, Input, Output, EventEmitter } from '@angular/core';
import { mockedCoursesList } from "@app/shared/mocks/mock";

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent {
  @Input() courses: any[] = mockedCoursesList;
  @Input() editable!: boolean;

  @Output() showCourse = new EventEmitter<void>();
  @Output() editCourse = new EventEmitter<void>();
  @Output() deleteCourse = new EventEmitter<void>();

  handleShowCourse() {
    console.log("Work in progress...");
  }

  handleEditCourse(course: any) {
    console.log("Work in progress...", course);
  }

  handleDeleteCourse(course: any) {
    console.log("Work in progress...", course);
  }
}
