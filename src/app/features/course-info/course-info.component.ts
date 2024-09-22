import { Component, Input } from '@angular/core';

interface Course {
  id: string;
  title: string;
  description: string;
  duration: number;
  creationDate: Date;
  authors: string[];
}

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent {
  @Input() course!: Course;
}
