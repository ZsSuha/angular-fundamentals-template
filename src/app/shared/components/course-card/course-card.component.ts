import { Component, Input, Output, EventEmitter } from '@angular/core';
import { mockedAuthorsList } from '@app/shared/mocks/mock';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent {
  @Input() title!: string;
  @Input() description!: string;
  @Input() creationDate!: Date;
  @Input() duration!: number;
  @Input() authors!: string[];
  @Input() editable: boolean = true;

  @Output() clickOnShow = new EventEmitter<void>();

  getAuthorNames(authorIds: string[]): string {
    return authorIds
      .map(authorId => {
        const author = mockedAuthorsList.find(a => a.id === authorId);
        return author ? author.name : 'Unknown Author';
      })
      .join(', ');
  }

  showCourse() {
    this.clickOnShow.emit();
  }
}
