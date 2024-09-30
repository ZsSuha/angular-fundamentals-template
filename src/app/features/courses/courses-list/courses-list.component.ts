import { Component, Input, Output, EventEmitter } from '@angular/core';
import { mockedCoursesList } from "@app/shared/mocks/mock";
import { Router } from "@angular/router";
import { CoursesStoreService } from "@app/services/courses-store.service";
import { CourseDTO } from "@app/services/course-info";

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent {
  @Input() courses: any[] = mockedCoursesList;
  @Input() editable: boolean | null = false;

  @Output() showCourse = new EventEmitter<void>();
  @Output() editCourse = new EventEmitter<void>();
  @Output() deleteCourse = new EventEmitter<void>();

  constructor(
    private router: Router,
    private coursesStoreService: CoursesStoreService
  ) {}
  handleShowCourse(courseId: string) {
    this.router.navigate(["/courses/" + courseId]);
  }
  handleEditCourse(courseId: string) {
    this.router.navigate(["/courses/edit/" + courseId]);
  }
  handleDeleteCourse(courseId: string) {
    this.coursesStoreService.deleteCourse(courseId);
  }
}
